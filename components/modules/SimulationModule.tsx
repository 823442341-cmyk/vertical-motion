import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Settings, Zap, ArrowDown, Eye, Activity, MonitorPlay } from 'lucide-react';
import { DEFAULT_SIM_PARAMS, GRAVITY, CANVAS_WIDTH, CANVAS_HEIGHT, METER_TO_PIXEL } from '../../constants';
import { SimParams } from '../../types';
import Button from '../Button';

// --- CONFIG ---
const GROUND_Y = CANVAS_HEIGHT - 80;
const START_X = 50;
const LOOP_CX = 450; // Center X of the loop
const VECTOR_SCALE = 2; // Scale for vector drawing

// --- TYPES ---
type SimStatus = 'idle' | 'running' | 'stalled' | 'crashed' | 'success';

interface PhysicsPoint {
  x: number;
  y: number;
  h: number;     // Height in meters
  angle: number; // Tangent angle (radians)
  curvature: number; // 1/r
  dist: number;  // Distance from start
  zone: 'ramp' | 'flat' | 'loop' | 'exit';
  loopAngle?: number; // Internal angle for loop (0 at bottom)
}

// --- HELPER: Generate Track Path ---
const generateTrack = (params: SimParams): PhysicsPoint[] => {
  const points: PhysicsPoint[] = [];
  const rPix = params.radius * METER_TO_PIXEL;
  const hStartPix = params.dropHeight * METER_TO_PIXEL;
  
  let d = 0;

  // 1. RAMP (Bezier)
  // From (START_X, GROUND_Y - hStartPix) to (LOOP_CX - 100, GROUND_Y)
  const p0 = { x: START_X, y: GROUND_Y - hStartPix };
  const p3 = { x: LOOP_CX - 50, y: GROUND_Y };
  // Control points - Modified p1.y to create immediate slope
  const p1 = { x: START_X + 80, y: GROUND_Y - hStartPix + 40 }; // Push out and down to create initial slope
  const p2 = { x: LOOP_CX - 200, y: GROUND_Y };

  const rampSteps = 200;
  for (let i = 0; i <= rampSteps; i++) {
    const t = i / rampSteps;
    const x = (1-t)**3 * p0.x + 3*(1-t)**2*t * p1.x + 3*(1-t)*t**2 * p2.x + t**3 * p3.x;
    const y = (1-t)**3 * p0.y + 3*(1-t)**2*t * p1.y + 3*(1-t)*t**2 * p2.y + t**3 * p3.y;
    
    if (i > 0) {
      const prev = points[points.length - 1];
      const stepDist = Math.hypot(x - prev.x, y - prev.y);
      d += stepDist;
      points.push({
        x, y, dist: d,
        h: (GROUND_Y - y) / METER_TO_PIXEL,
        angle: Math.atan2(y - prev.y, x - prev.x),
        curvature: 0,
        zone: 'ramp'
      });
    } else {
      points.push({ x, y, dist: 0, h: params.dropHeight, angle: 0, curvature: 0, zone: 'ramp' });
    }
  }

  // 2. CONNECT TO LOOP
  const loopEntryX = LOOP_CX;
  const connectSteps = 20;
  let lastPt = points[points.length-1];
  for(let i=1; i<=connectSteps; i++) {
     const t = i / connectSteps;
     const x = lastPt.x + (loopEntryX - lastPt.x) * t;
     const y = GROUND_Y;
     d += Math.hypot(x - points[points.length-1].x, y - points[points.length-1].y);
     points.push({
       x, y, dist: d,
       h: 0,
       angle: 0,
       curvature: 0,
       zone: 'flat'
     });
  }

  // 3. LOOP (Standard Circle)
  // Center (LOOP_CX, GROUND_Y - R)
  // Start at Bottom (Angle 0), go CCW to 2PI
  const loopCenterY = GROUND_Y - rPix;
  const loopSteps = 360;
  lastPt = points[points.length-1];
  
  for(let i=1; i<=loopSteps; i++) {
    const theta = (i / loopSteps) * 2 * Math.PI; // 0 to 2PI
    
    // Physics Angle (theta_p): 0 at bottom.
    // Visual Circle: x = cx + r*sin(theta), y = cy + r*cos(theta) 
    const x = LOOP_CX + rPix * Math.sin(theta); 
    const y = loopCenterY + rPix * Math.cos(theta);
    
    const dx = x - points[points.length-1].x;
    const dy = y - points[points.length-1].y;
    d += Math.hypot(dx, dy);
    
    points.push({
      x, y, dist: d,
      h: (GROUND_Y - y) / METER_TO_PIXEL,
      angle: Math.atan2(dy, dx),
      curvature: 1 / params.radius,
      zone: 'loop',
      loopAngle: theta
    });
  }

  // 4. EXIT
  const exitLen = 200;
  const exitSteps = 50;
  lastPt = points[points.length-1];
  for(let i=1; i<=exitSteps; i++) {
    const x = lastPt.x + (i/exitSteps)*exitLen;
    const y = GROUND_Y;
    d += Math.hypot(x - points[points.length-1].x, y - points[points.length-1].y);
    points.push({
       x, y, dist: d,
       h: 0, angle: 0, curvature: 0, zone: 'exit'
    });
  }

  return points;
};


const SimulationModule: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // -- STATE --
  const [params, setParams] = useState<SimParams>(DEFAULT_SIM_PARAMS);
  const [isPlaying, setIsPlaying] = useState(false);
  const [slowMo, setSlowMo] = useState(false);
  const [showVectors, setShowVectors] = useState(true);
  const [status, setStatus] = useState<SimStatus>('idle');
  const [failReason, setFailReason] = useState('');
  
  // Realtime Physics Data
  const [telemetry, setTelemetry] = useState({ 
    v: 0, h: 0, N: 0, KE: 0, PE: 0, angle: 0 
  });

  // -- REFS --
  const physicsRef = useRef({
    path: [] as PhysicsPoint[],
    dist: 0,
    velocity: 0,
    isRunning: false // Track internal running state to avoid async state issues in loop
  });
  const reqRef = useRef<number>();
  const prevTimeRef = useRef<number>(0);

  // -- INIT --
  useEffect(() => {
    physicsRef.current.path = generateTrack(params);
    resetSim();
  }, [params]);

  const resetSim = () => {
    setIsPlaying(false);
    setStatus('idle');
    setFailReason('');
    physicsRef.current.isRunning = false;
    // Start with a tiny distance to ensure we aren't stuck at index 0 with 0 energy delta
    physicsRef.current.dist = 1; 
    physicsRef.current.velocity = 0;
    
    // Initial State Telemetry
    const initPE = params.mass * GRAVITY * params.dropHeight;
    setTelemetry({ v: 0, h: params.dropHeight, N: 0, KE: 0, PE: initPE, angle: 0 });
    
    setTimeout(renderFrame, 0); // Draw initial frame
  };

  // -- PHYSICS ENGINE --
  const updatePhysics = (dt: number) => {
    // If we've already crashed or finished in a previous substep, stop.
    if (!physicsRef.current.isRunning && status !== 'idle' && status !== 'running') return;
    
    const { path, dist } = physicsRef.current;
    
    // 1. Locate Cart
    let idx = path.findIndex(p => p.dist >= dist);
    if (idx === -1) {
       // Reached End
       if (dist > path[path.length-1].dist) {
          setStatus('success');
          physicsRef.current.isRunning = false;
          setIsPlaying(false);
          return;
       }
       idx = path.length - 1; 
    }
    const pt = path[idx];

    // 2. Energy: E_total = mgh_start
    // E_curr = 0.5mv^2 + mgh_curr + Loss
    const totalEnergy = params.mass * GRAVITY * params.dropHeight;
    const currentPE = params.mass * GRAVITY * pt.h;
    
    // Friction loss estimate (simple linear drag approximation)
    const frictionLoss = params.friction * params.mass * GRAVITY * pt.dist;
    
    const availableKE = totalEnergy - currentPE - frictionLoss;

    // STALL CHECK
    // Only stall if we have moved significantly past the start (dist > 50px) to prevent launch lockup
    if (availableKE <= 0.05) {
        if (dist > 50) {
            setStatus('stalled');
            setFailReason("NOT ENOUGH ENERGY");
            physicsRef.current.isRunning = false;
            setIsPlaying(false);
            physicsRef.current.velocity = 0;
            return;
        }
    }

    // Velocity Calculation
    // Ensure sqrt input is non-negative.
    const v = Math.sqrt(Math.max(0.01, 2 * Math.max(0, availableKE) / params.mass));
    physicsRef.current.velocity = v;

    // 3. Forces (N)
    let N = 0;
    if (pt.zone === 'loop' && pt.loopAngle !== undefined) {
        const Fc = params.mass * v * v * pt.curvature;
        // loopAngle 0 is bottom. cos(0)=1 (Gravity adds to N required).
        // loopAngle PI is top. cos(PI)=-1 (Gravity subtracts).
        const mgRadial = params.mass * GRAVITY * Math.cos(pt.loopAngle);
        N = Fc + mgRadial;

        // CRASH CHECK
        if (N < -0.1) {
            setStatus('crashed');
            setFailReason("N < 0 (FELL OFF)");
            physicsRef.current.isRunning = false;
            setIsPlaying(false);
            return;
        }
    } else {
        // Flat/Ramp: N approx mg * cos(slope)
        N = params.mass * GRAVITY * Math.cos(pt.angle);
    }

    // Update Telemetry
    setTelemetry({
        v,
        h: pt.h,
        N: Math.max(0, N),
        KE: Math.max(0, availableKE),
        PE: currentPE,
        angle: pt.loopAngle ? (pt.loopAngle * 180 / Math.PI) : 0
    });

    // Advance
    physicsRef.current.dist += v * dt;
  };

  // -- RENDERER --
  const renderFrame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { path, dist } = physicsRef.current;

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Draw Ground
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y + 4);
    ctx.lineTo(canvas.width, GROUND_Y + 4);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#000';
    ctx.stroke();

    // 2. Draw Track
    if (path.length > 1) {
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for(let i=1; i<path.length; i++) {
            ctx.lineTo(path[i].x, path[i].y);
        }
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 14;
        ctx.strokeStyle = '#000';
        ctx.stroke();
        ctx.lineWidth = 6;
        ctx.strokeStyle = '#FFF';
        ctx.stroke();
    }

    // 3. Draw Loop Supports
    const rPix = params.radius * METER_TO_PIXEL;
    const cy = GROUND_Y - rPix;
    ctx.beginPath();
    ctx.moveTo(LOOP_CX, cy);
    ctx.lineTo(LOOP_CX - 20, GROUND_Y);
    ctx.moveTo(LOOP_CX, cy);
    ctx.lineTo(LOOP_CX + 20, GROUND_Y);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#444';
    ctx.stroke();
    // Center point
    ctx.beginPath(); ctx.arc(LOOP_CX, cy, 5, 0, Math.PI*2); ctx.fillStyle='#000'; ctx.fill();

    // 4. Draw Cart
    let idx = path.findIndex(p => p.dist >= dist);
    if (idx === -1) idx = dist > 0 ? path.length - 1 : 0;
    const pt = path[idx];

    ctx.save();
    ctx.translate(pt.x, pt.y);
    ctx.rotate(pt.angle);

    // Cart Body
    const crashed = status === 'crashed';
    ctx.fillStyle = crashed ? '#FF4444' : '#F87171'; // HARMONIOUS LIGHT RED
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    // Drawn relative to track (y=0)
    // Cart sits "on top" of track. In local coords, Up is -y.
    ctx.fillRect(-15, -24, 30, 20);
    
    // Wheels
    ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.arc(-10, -4, 5, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(10, -4, 5, 0, Math.PI*2); ctx.fill();

    // VECTORS
    if (showVectors && !crashed && status !== 'idle') {
        const t = telemetry;
        
        // Velocity (Tangential, X-axis local)
        const vLen = Math.max(10, t.v * VECTOR_SCALE * 2);
        drawVector(ctx, 0, -14, vLen, 0, '#00FFFF', 'v');

        // Normal Force (Perpendicular, Y-axis local, Up is negative)
        // N points UP from track. So negative Y.
        const nLen = Math.max(10, (t.N / params.mass) * VECTOR_SCALE); 
        drawVector(ctx, 0, -14, 0, -nLen, '#F87171', 'N'); // HARMONIOUS LIGHT RED
    }

    ctx.restore();

    // 5. Crash Overlay
    if (crashed || status === 'stalled') {
        ctx.save();
        ctx.translate(pt.x, pt.y - 40);
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.font = "bold 40px 'Bangers'";
        const msg = crashed ? "WIPEOUT!" : "STALLED!";
        ctx.strokeText(msg, -60, 0);
        ctx.fillText(msg, -60, 0);
        ctx.font = "bold 16px sans-serif";
        ctx.fillStyle = 'black';
        ctx.fillText(failReason, -40, 20);
        ctx.restore();
    }
  };

  const drawVector = (ctx: CanvasRenderingContext2D, x: number, y: number, dx: number, dy: number, color: string, label: string) => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + dx, y + dy);
      ctx.lineWidth = 3;
      ctx.strokeStyle = color;
      ctx.stroke();

      // Arrowhead
      const angle = Math.atan2(dy, dx);
      ctx.beginPath();
      ctx.moveTo(x + dx, y + dy);
      ctx.lineTo(x + dx - 10 * Math.cos(angle - Math.PI/6), y + dy - 10 * Math.sin(angle - Math.PI/6));
      ctx.lineTo(x + dx - 10 * Math.cos(angle + Math.PI/6), y + dy - 10 * Math.sin(angle + Math.PI/6));
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      
      // Label
      ctx.fillStyle = 'black';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(label, x + dx + 5, y + dy);
  };

  // -- ANIM LOOP --
  const tick = (time: number) => {
      if (prevTimeRef.current === 0) prevTimeRef.current = time;
      const rawDt = (time - prevTimeRef.current) / 1000;
      prevTimeRef.current = time;
      
      // TIME SCALE CONTROL
      // Increase speed 6x by default for zippier feel
      // SlowMo is 0.2x
      const timeScale = slowMo ? 0.2 : 6.0; 
      let remainingDt = rawDt * timeScale;
      
      // Sub-stepping for stability
      const stepSize = 0.02; // 20ms physics steps
      
      let loops = 0;
      while (remainingDt > 0 && loops < 20) { // Safety cap
          const dt = Math.min(remainingDt, stepSize);
          updatePhysics(dt);
          if (!physicsRef.current.isRunning) break; // Stop if crashed/finished
          remainingDt -= dt;
          loops++;
      }
      
      renderFrame();

      if (isPlaying && physicsRef.current.isRunning) {
          reqRef.current = requestAnimationFrame(tick);
      }
  };

  useEffect(() => {
      if (isPlaying) {
          prevTimeRef.current = 0;
          physicsRef.current.isRunning = true;
          reqRef.current = requestAnimationFrame(tick);
      } else {
          physicsRef.current.isRunning = false;
          if (reqRef.current) cancelAnimationFrame(reqRef.current);
      }
      return () => {
          physicsRef.current.isRunning = false;
          if (reqRef.current) cancelAnimationFrame(reqRef.current);
      }
  }, [isPlaying]);

  const togglePlay = () => {
      if (status === 'crashed' || status === 'stalled' || status === 'success') {
          resetSim();
          setTimeout(() => setIsPlaying(true), 50);
      } else {
          setIsPlaying(!isPlaying);
      }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-6 h-[600px]">
        {/* LEFT: CONTROLS */}
        <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="pop-card p-4 bg-white flex-1 flex flex-col">
                <div className="bg-pop-blue text-white p-2 font-comic text-xl border-2 border-black shadow-comic mb-6 flex items-center gap-2">
                    <Settings className="w-5 h-5"/> SETUP
                </div>

                <div className="space-y-6 flex-1">
                    {/* H Slider */}
                    <div>
                        <div className="flex justify-between font-comic mb-1">
                            <span>RELEASE H</span>
                            <span className="bg-pop-yellow px-2 border border-black">{params.dropHeight}m</span>
                        </div>
                        <input 
                            type="range" min={4} max={15} step={0.1}
                            value={params.dropHeight}
                            onChange={e => setParams(p => ({...p, dropHeight: Number(e.target.value)}))}
                            disabled={isPlaying}
                            className="w-full accent-pop-blue h-2 bg-gray-200 border border-black rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    {/* R Slider */}
                    <div>
                        <div className="flex justify-between font-comic mb-1">
                            <span>LOOP RADIUS</span>
                            <span className="bg-pop-sky px-2 border border-black">{params.radius}m</span>
                        </div>
                        <input 
                            type="range" min={1.5} max={4} step={0.1}
                            value={params.radius}
                            onChange={e => setParams(p => ({...p, radius: Number(e.target.value)}))}
                            disabled={isPlaying}
                            className="w-full accent-black h-2 bg-gray-200 border border-black rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    {/* Mass Slider */}
                    <div>
                        <div className="flex justify-between font-comic mb-1">
                            <span>CART MASS</span>
                            <span className="bg-white px-2 border border-black">{params.mass}kg</span>
                        </div>
                        <input 
                            type="range" min={100} max={2000} step={50}
                            value={params.mass}
                            onChange={e => setParams(p => ({...p, mass: Number(e.target.value)}))}
                            disabled={isPlaying}
                            className="w-full accent-black h-2 bg-gray-200 border border-black rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    <div className="p-4 bg-gray-100 border-2 border-dashed border-gray-400 rounded text-xs font-mono text-gray-500">
                        THEORETICAL MIN H ≈ {(2.5 * params.radius).toFixed(2)}m
                    </div>
                </div>

                <div className="space-y-2 mt-4">
                     <Button onClick={togglePlay} className="w-full" variant={isPlaying ? 'primary' : 'secondary'}>
                        {isPlaying ? <Pause className="mr-2 w-5 h-5"/> : <Play className="mr-2 w-5 h-5"/>}
                        {isPlaying ? "PAUSE" : "LAUNCH"}
                     </Button>
                     <Button onClick={resetSim} className="w-full" variant="danger">
                        <RotateCcw className="mr-2 w-5 h-5"/> RESET
                     </Button>
                </div>
            </div>
        </div>

        {/* CENTER: CANVAS */}
        <div className="lg:col-span-6 relative">
            <div className="pop-card p-0 h-full bg-white relative overflow-hidden">
                <canvas 
                    ref={canvasRef}
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    className="w-full h-full object-contain"
                />
                
                {/* Overlay Controls */}
                <div className="absolute top-4 right-4 flex gap-2">
                    <button 
                        onClick={() => setSlowMo(!slowMo)}
                        className={`p-2 border-2 border-black font-bold text-xs shadow-comic transition-all ${slowMo ? 'bg-pop-yellow' : 'bg-white'}`}
                    >
                        <MonitorPlay className="w-4 h-4 inline mr-1"/> SLOW-MO
                    </button>
                </div>

                <div className="absolute top-4 left-4 bg-white/90 border-2 border-black p-2 font-mono text-xs shadow-comic">
                    <div>MODE: VERTICAL CIRCLE</div>
                    <div className={`font-bold ${status === 'crashed' || status === 'stalled' ? 'text-red-600' : 'text-green-600'}`}>
                        STATUS: {status.toUpperCase()}
                    </div>
                </div>
            </div>
        </div>

        {/* RIGHT: DATA */}
        <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="pop-card p-4 bg-pop-sky h-full flex flex-col">
                <div className="bg-black text-white p-2 font-comic text-xl border-2 border-white shadow-comic mb-6 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-pop-yellow fill-pop-yellow"/> TELEMETRY
                </div>
                
                <div className="space-y-4 flex-1">
                    <div className="bg-white border-2 border-black p-3 shadow-sm">
                        <div className="text-[10px] font-bold text-gray-400 uppercase">Velocity</div>
                        <div className="text-3xl font-comic text-pop-blue">{telemetry.v.toFixed(1)} <span className="text-sm text-black">m/s</span></div>
                    </div>

                    <div className="bg-white border-2 border-black p-3 shadow-sm">
                         <div className="text-[10px] font-bold text-gray-400 uppercase">Normal Force</div>
                         <div className={`text-3xl font-comic ${telemetry.N < 100 ? 'text-red-500' : 'text-pop-pink'}`}>
                             {telemetry.N.toFixed(0)} <span className="text-sm text-black">N</span>
                         </div>
                    </div>

                    <div className="bg-white border-2 border-black p-3 shadow-sm flex-1">
                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-2">Energy Balance</div>
                        <div className="flex gap-2 h-32 items-end border-b-2 border-black pb-1">
                            <div className="flex-1 flex flex-col justify-end h-full">
                                <div className="bg-pop-yellow w-full border border-black transition-all duration-75" style={{height: `${(telemetry.PE / (telemetry.PE + telemetry.KE + 1)) * 100}%`}}></div>
                                <div className="text-center text-[10px] font-bold mt-1">PE</div>
                            </div>
                            <div className="flex-1 flex flex-col justify-end h-full">
                                <div className="bg-pop-blue w-full border border-black transition-all duration-75" style={{height: `${(telemetry.KE / (telemetry.PE + telemetry.KE + 1)) * 100}%`}}></div>
                                <div className="text-center text-[10px] font-bold mt-1">KE</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SimulationModule;