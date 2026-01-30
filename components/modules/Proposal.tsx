import React, { useState, useRef, useEffect } from 'react';
import Button from '../Button';
import { Shield, Zap, Target, ArrowRight, Star, AlertTriangle, FileText, CheckSquare, PenTool, RotateCcw, BookOpen } from 'lucide-react';
import { ModuleType } from '../../types';

interface ProposalProps {
  setModule: (m: ModuleType) => void;
}

const ProposalModule: React.FC<ProposalProps> = ({ setModule }) => {
  // --- STATE ---
  const [checklist, setChecklist] = useState({
    height: false,
    radius: false,
    stability: false,
    materials: false
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // --- CANVAS LOGIC ---
  useEffect(() => {
    initCanvas();
  }, []);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Draw Blueprint Grid
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for(let i=0; i<canvas.width; i+=20) { ctx.moveTo(i,0); ctx.lineTo(i,canvas.height); }
        for(let i=0; i<canvas.height; i+=20) { ctx.moveTo(0,i); ctx.lineTo(canvas.width,i); }
        ctx.stroke();
      }
    }
  };

  const startDrawing = (e: React.MouseEvent) => {
    setIsDrawing(true);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.strokeStyle = '#000000'; // Black marker style
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
    }
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.stroke();
    }
  };

  const stopDrawing = () => setIsDrawing(false);

  return (
    <div className="space-y-16 pb-12 animate-slide-in">
      
      {/* --- 1. HERO SECTION: COMIC BOOK COVER --- */}
      <div className="relative pt-4 px-4">
        <div className="absolute inset-0 bg-black transform translate-x-3 translate-y-3 rotate-1 z-0 rounded-sm opacity-80"></div>
        <div className="relative border-8 border-black bg-pop-blue overflow-hidden min-h-[500px] flex flex-col z-10">
            {/* Header Strip */}
            <div className="bg-pop-yellow border-b-4 border-black p-2 flex justify-between items-center px-6">
                <div className="font-comic text-xl flex items-center gap-2">
                    <Star className="w-6 h-6 fill-black" />
                    <span>ISSUE #001</span>
                </div>
                <div className="font-mono font-bold text-sm tracking-widest hidden md:block">
                    THE PHYSICS CHRONICLES
                </div>
                <div className="font-comic text-xl">
                    PRICE: YOUR BRAIN
                </div>
            </div>

            <div className="flex-1 grid md:grid-cols-2 relative p-8 md:p-12 items-center">
                <div className="relative z-20">
                    <div className="inline-block bg-white border-4 border-black px-4 py-1 font-comic text-2xl transform -rotate-2 mb-6 shadow-comic">
                        THE CHALLENGE
                    </div>
                    <h1 className="text-8xl md:text-9xl font-comic text-white leading-[0.85] text-shadow-pop mb-6">
                        GRAVITY<br/>
                        <span className="text-pop-yellow">RIDER</span>
                    </h1>
                    <div className="bg-white border-4 border-black p-6 rounded-2xl shadow-[8px_8px_0px_#000] max-w-lg">
                        <p className="font-sans font-bold text-xl leading-tight">
                            "The park wants a pure physics machine! No motors, no electricity. We need a <span className="text-pop-yellow underline decoration-4 decoration-black">GRAVITY-DRIVEN</span> coaster. Can you harness the potential energy?"
                        </p>
                    </div>
                </div>

                <div className="relative flex items-center justify-center min-h-[300px]">
                     {/* Loop Illustration */}
                     <svg viewBox="0 0 400 350" className="w-full h-full drop-shadow-[10px_10px_0px_rgba(0,0,0,0.5)] transform scale-110">
                        <path d="M 0 300 L 100 300 Q 200 300 200 150 A 75 75 0 1 0 350 150 Q 350 300 450 300" 
                              fill="none" stroke="black" strokeWidth="20" strokeLinecap="round" />
                        <path d="M 0 300 L 100 300 Q 200 300 200 150 A 75 75 0 1 0 350 150 Q 350 300 450 300" 
                              fill="none" stroke="#FFD600" strokeWidth="12" strokeLinecap="round" />
                        {/* Cart - UPDATED COLOR TO HARMONIOUS LIGHT RED */}
                        <g transform="translate(275, 75) rotate(180)">
                            <rect x="-20" y="-15" width="40" height="30" fill="#F87171" stroke="black" strokeWidth="3" />
                            <circle cx="-15" cy="15" r="5" fill="black" />
                            <circle cx="15" cy="15" r="5" fill="black" />
                        </g>
                     </svg>
                     <div className="absolute top-0 right-0 rotate-12 bg-white border-4 border-black p-4 font-comic text-2xl shadow-comic text-center">
                        100%<br/>GRAVITY!
                     </div>
                </div>
            </div>
        </div>
      </div>

      {/* --- 2. CONTEXT & BACKGROUND --- */}
      <div className="grid md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-5">
            <div className="pop-card bg-white p-0 rotate-1 hover:rotate-0 transition-transform">
                <div className="bg-black text-white p-3 border-b-4 border-black flex justify-between items-center">
                    <h2 className="font-comic text-2xl tracking-widest text-pop-yellow">THE DAILY NEWS</h2>
                    <span className="font-mono text-xs">TODAY'S EDITION</span>
                </div>
                <div className="p-6 bg-[#f0f0f0]">
                    <h3 className="font-serif font-black text-4xl leading-none mb-4 border-b-2 border-black pb-2">
                        NO ENGINES ALLOWED!
                    </h3>
                    <div className="flex gap-4 mb-4">
                        <div className="flex-1 font-serif text-sm text-justify leading-tight">
                            <span className="font-bold text-3xl float-left mr-2 mt-[-5px]">"</span>
                            The Mayor has banned motors in the new park zone to save energy! Engineers are scrambling to build a coaster that runs entirely on <strong>Gravitational Potential Energy</strong>. "If the hill isn't high enough, it won't loop!" says the Chief Engineer.
                        </div>
                        <div className="w-24 h-24 bg-pop-yellow border-2 border-black flex items-center justify-center shrink-0">
                            <Zap className="text-black w-10 h-10" />
                        </div>
                    </div>
                    <div className="bg-pop-pink text-white font-comic text-xl p-2 text-center border-2 border-black shadow-comic transform -rotate-1">
                        DRIVING QUESTION:<br/>
                        "How does Height become Speed?"
                    </div>
                </div>
            </div>
        </div>

        <div className="md:col-span-7">
            <div className="pop-card bg-pop-yellow p-6 relative">
                 <div className="absolute -top-4 -right-4 bg-white border-4 border-black px-4 py-1 font-comic text-xl shadow-comic transform rotate-3">
                    OBJECTIVES
                 </div>
                 <h2 className="font-comic text-4xl mb-6 text-black">MISSION BRIEFING</h2>
                 <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="bg-white border-2 border-black p-2 rounded-full">
                            <Zap className="w-6 h-6 text-pop-blue" />
                        </div>
                        <div>
                            <h4 className="font-bold font-comic text-xl">1. HARNESS GRAVITY</h4>
                            <p className="font-sans text-sm font-bold">Concept: PE → KE</p>
                            <p className="font-sans text-xs text-gray-700">Calculate how much Potential Energy (Height) you need to complete the loop.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-white border-2 border-black p-2 rounded-full">
                            <Target className="w-6 h-6 text-pop-pink" />
                        </div>
                        <div>
                            <h4 className="font-bold font-comic text-xl">2. MAINTAIN CONTACT</h4>
                            <p className="font-sans text-sm font-bold">Concept: Circular Motion</p>
                            <p className="font-sans text-xs text-gray-700">Use gravity to keep the rider safe in the seat at the top.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-white border-2 border-black p-2 rounded-full">
                            <Shield className="w-6 h-6 text-black" />
                        </div>
                        <div>
                            <h4 className="font-bold font-comic text-xl">3. BUILD EFFICIENTLY</h4>
                            <p className="font-sans text-sm font-bold">Concept: Energy Loss</p>
                            <p className="font-sans text-xs text-gray-700">Design a track that minimizes friction loss.</p>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
      </div>

      {/* --- 3. PHYSICS KNOWLEDGE & DIAGRAMS --- */}
      <div className="space-y-6">
        {/* KNOWLEDGE POINTS */}
        <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1: Energy Conservation */}
            <div className="bg-white border-4 border-black p-4 shadow-comic hover:-translate-y-1 transition-transform">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-comic text-xl bg-pop-yellow inline-block px-2 border-2 border-black transform -rotate-1">
                    LAW #1: ENERGY
                    </h3>
                    <BookOpen className="w-5 h-5 text-gray-500"/>
                </div>
                <p className="font-sans text-sm font-bold mb-2">Energy comes from Height (Gravity).</p>
                <div className="bg-gray-100 p-2 font-mono text-xs border border-gray-300">
                E_total = PE (Start) = Constant
                </div>
            </div>

            {/* Card 2: Conversion */}
            <div className="bg-white border-4 border-black p-4 shadow-comic hover:-translate-y-1 transition-transform">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-comic text-xl bg-pop-pink text-white inline-block px-2 border-2 border-black transform rotate-1">
                    GRAVITY POWER
                    </h3>
                    <Zap className="w-5 h-5 text-pop-pink"/>
                </div>
                <p className="font-sans text-sm font-bold mb-2">Falling turns into Moving.</p>
                <ul className="text-xs font-sans list-disc list-inside space-y-1 text-gray-700">
                    <li>Top: High Potential Energy</li>
                    <li>Bottom: High Kinetic Energy</li>
                </ul>
                <div className="mt-2 font-mono text-xs font-bold text-pop-blue border-t border-gray-200 pt-1">
                mgh = ½mv²
                </div>
            </div>

            {/* Card 3: Circular Motion */}
            <div className="bg-white border-4 border-black p-4 shadow-comic hover:-translate-y-1 transition-transform">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-comic text-xl bg-pop-blue text-white inline-block px-2 border-2 border-black transform -rotate-1">
                    THE LOOP FORCE
                    </h3>
                    <Target className="w-5 h-5 text-pop-blue"/>
                </div>
                <p className="font-sans text-sm font-bold mb-2">Gravity helps turn you.</p>
                <div className="text-xs font-sans text-gray-700 mb-2">
                At the top, Gravity pulls down to help keep you in the circle.
                </div>
                <div className="bg-black text-white p-1 font-mono text-xs text-center">
                F_net = mg + N = mv²/r
                </div>
            </div>
        </div>

        {/* VISUAL DIAGRAMS */}
        <div className="pop-card bg-white p-0">
            <div className="bg-pop-blue p-4 border-b-4 border-black text-white flex justify-between items-center">
                <h3 className="font-comic text-2xl">THE PHYSICS ENGINE</h3>
                <FileText className="w-6 h-6" />
            </div>
            <div className="p-8 grid md:grid-cols-2 gap-12 items-center">
                
                {/* Diagram 1: PE to KE */}
                <div className="text-center relative group">
                    <div className="font-comic text-xl mb-4 bg-black text-white inline-block px-2 transform -rotate-2">
                        ENERGY TRANSFER SCHEMATIC
                    </div>
                    <div className="relative h-48 border-b-4 border-black bg-gray-50/50">
                        <svg viewBox="0 0 200 150" className="w-full h-full overflow-visible">
                            {/* Hill */}
                            <path d="M0,0 Q50,150 200,150" fill="none" stroke="black" strokeWidth="4" />
                            {/* Ball Top */}
                            <circle cx="10" cy="10" r="10" fill="#FFD600" stroke="black" strokeWidth="2" />
                            <text x="30" y="15" className="font-bold font-sans text-xs">High PE (Gravity)</text>
                            {/* Ball Bottom */}
                            <circle cx="180" cy="140" r="10" fill="#306EFF" stroke="black" strokeWidth="2" />
                            <text x="100" y="130" className="font-bold font-sans text-xs">High KE (Speed)</text>
                            {/* Arrow */}
                            <path d="M 25 25 Q 70 90 150 130" fill="none" stroke="#FF00CC" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow)" />
                            <defs>
                                <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto">
                                <path d="M0,0 L0,6 L9,3 z" fill="#FF00CC" />
                                </marker>
                            </defs>
                        </svg>
                    </div>
                </div>

                {/* Diagram 2: The Loop Forces */}
                <div className="text-center border-l-0 md:border-l-4 border-dashed border-gray-300 pl-0 md:pl-12">
                    <div className="font-comic text-xl mb-4 bg-black text-white inline-block px-2 transform rotate-2">
                        VERTICAL LOOP FORCES
                    </div>
                    <div className="relative h-48 flex items-center justify-center bg-gray-50/50 border-4 border-gray-100 rounded-full w-48 mx-auto">
                        <svg viewBox="0 0 100 100" className="w-32 h-32 overflow-visible">
                            {/* Track */}
                            <circle cx="50" cy="50" r="40" fill="none" stroke="black" strokeWidth="4" />
                            
                            {/* Ball Top */}
                            <circle cx="50" cy="10" r="8" fill="#F87171" stroke="black" strokeWidth="2" />
                            
                            {/* Forces */}
                            <line x1="50" y1="10" x2="50" y2="35" stroke="black" strokeWidth="3" markerEnd="url(#arrow-black)" />
                            <text x="55" y="25" className="font-bold font-sans text-[10px]">mg + N</text>
                            
                            {/* Velocity Vector */}
                            <line x1="50" y1="10" x2="90" y2="10" stroke="#306EFF" strokeWidth="3" markerEnd="url(#arrow-blue)" />
                            <text x="60" y="0" className="font-bold font-sans text-[10px] fill-[#306EFF]">v_min</text>

                            <defs>
                                <marker id="arrow-black" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto">
                                <path d="M0,0 L0,6 L9,3 z" fill="black" />
                                </marker>
                                <marker id="arrow-blue" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto">
                                <path d="M0,0 L0,6 L9,3 z" fill="#306EFF" />
                                </marker>
                            </defs>
                        </svg>
                    </div>
                    <div className="mt-2 text-xs font-mono text-gray-500">
                        Top of Loop (Free Body Diagram)
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* --- 4. BRAINSTORMING & SKETCHPAD --- */}
      <div className="grid md:grid-cols-12 gap-8">
         {/* Left: Constraints */}
         <div className="md:col-span-4 space-y-4">
            <div className="bg-white border-4 border-black p-6 shadow-comic">
                <h3 className="font-comic text-2xl mb-4 border-b-4 border-black pb-2">DESIGN CONSTRAINTS</h3>
                <ul className="space-y-4">
                    <li className="flex gap-3 items-center">
                        <div className="bg-red-100 p-2 border border-red-400 rounded-full">
                           <Zap className="w-4 h-4 text-red-600" />
                        </div>
                        <div>
                            <span className="font-bold block text-sm">NO MOTORS</span>
                            <span className="text-xs text-gray-500">Gravity only.</span>
                        </div>
                    </li>
                    <li className="flex gap-3 items-center">
                        <div className="bg-blue-100 p-2 border border-blue-400 rounded-full">
                           <Shield className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                            <span className="font-bold block text-sm">SAFETY</span>
                            <span className="text-xs text-gray-500">Marble must stay on track.</span>
                        </div>
                    </li>
                    <li className="flex gap-3 items-center">
                        <div className="bg-yellow-100 p-2 border border-yellow-400 rounded-full">
                           <Star className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div>
                            <span className="font-bold block text-sm">MATERIALS</span>
                            <span className="text-xs text-gray-500">Foam pipe, tape, marble.</span>
                        </div>
                    </li>
                </ul>
            </div>
         </div>

         {/* Right: Sketchpad */}
         <div className="md:col-span-8">
            <div className="pop-card bg-white p-0 relative">
                <div className="bg-black text-white p-2 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <PenTool className="w-4 h-4" />
                        <span className="font-comic tracking-widest">BLUEPRINT SKETCHPAD</span>
                    </div>
                    <div className="flex gap-2">
                         <button onClick={initCanvas} className="text-xs font-bold hover:text-pop-pink flex items-center gap-1">
                            <RotateCcw className="w-3 h-3" /> CLEAR
                         </button>
                    </div>
                </div>
                <div className="relative bg-gray-50 cursor-crosshair">
                     <canvas 
                        ref={canvasRef}
                        width={600}
                        height={300}
                        className="w-full h-[300px] touch-none"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                     />
                     <div className="absolute bottom-2 left-2 pointer-events-none opacity-40">
                        <span className="font-comic text-4xl text-gray-300">SKETCH IDEAS HERE</span>
                     </div>
                </div>
            </div>
         </div>
      </div>

      {/* --- 5. PRE-FLIGHT CHECKLIST --- */}
      <div className="pop-card bg-pop-sky p-8 border-dashed border-black relative mt-8">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-pop-yellow border-4 border-black px-8 py-2 font-comic text-2xl shadow-comic rotate-1">
             FINAL PRE-FLIGHT CHECK
          </div>
          
          <p className="text-center font-bold font-sans mb-8 mt-4">
             Before you start building, confirm you understand the mission:
          </p>
          
          <div className="grid md:grid-cols-4 gap-4">
             {[
               { id: 'height', label: 'Start Higher than Loop' },
               { id: 'radius', label: 'Tight Loop Radius' },
               { id: 'stability', label: 'Smooth Track Joints' },
               { id: 'materials', label: 'Team Roles Assigned' }
             ].map((item) => (
               <div 
                 key={item.id}
                 onClick={() => setChecklist(prev => ({ ...prev, [item.id]: !prev[item.id as keyof typeof checklist] }))}
                 className={`cursor-pointer border-4 border-black p-4 text-center transition-all ${checklist[item.id as keyof typeof checklist] ? 'bg-pop-lime shadow-comic -translate-y-1' : 'bg-white hover:bg-gray-100'}`}
               >
                  <div className="flex justify-center mb-2">
                     {checklist[item.id as keyof typeof checklist] ? <CheckSquare className="w-8 h-8 text-black" /> : <div className="w-8 h-8 border-2 border-gray-300 rounded"></div>}
                  </div>
                  <div className="font-comic text-lg leading-none uppercase">{item.label}</div>
               </div>
             ))}
          </div>

          <div className="mt-8 flex justify-center">
             <Button 
                onClick={() => setModule(ModuleType.CONSTRUCTION)} 
                size="lg" 
                className="text-2xl px-12"
                disabled={!Object.values(checklist).every(Boolean)}
             >
                START BUILDING <ArrowRight className="ml-2" />
             </Button>
          </div>
      </div>

    </div>
  );
};

export default ProposalModule;