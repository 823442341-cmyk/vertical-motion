import React, { useRef, useState, useEffect } from 'react';
import Button from '../Button';
import { PenTool, Save, Trash2, Users, Box, Grid } from 'lucide-react';
import { TeamMember } from '../../types';

const DesignModule: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [team, setTeam] = useState<TeamMember[]>([
    { role: 'Engineer', name: '', task: 'Structure' },
    { role: 'Physicist', name: '', task: 'Calculations' },
    { role: 'Director', name: '', task: 'Oversight' },
  ]);

  // Canvas Drawing Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Blueprint Blue Dark
        ctx.fillStyle = '#001020';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Grid
        ctx.strokeStyle = '#003050';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for(let i=0; i<canvas.width; i+=40) { ctx.moveTo(i,0); ctx.lineTo(i,canvas.height); }
        for(let i=0; i<canvas.height; i+=40) { ctx.moveTo(0,i); ctx.lineTo(canvas.width,i); }
        ctx.stroke();
        
        // Pen style (Glowing Cyan)
        ctx.strokeStyle = '#00F0FF';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#00F0FF';
        ctx.lineCap = 'round';
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent) => {
    setIsDrawing(true);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
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

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) ctx.closePath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.fillStyle = '#001020';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
       // Grid
       ctx.strokeStyle = '#003050';
       ctx.lineWidth = 1;
       ctx.shadowBlur = 0;
       ctx.beginPath();
       for(let i=0; i<canvas.width; i+=40) { ctx.moveTo(i,0); ctx.lineTo(i,canvas.height); }
       for(let i=0; i<canvas.height; i+=40) { ctx.moveTo(0,i); ctx.lineTo(canvas.width,i); }
       ctx.stroke();
       
      ctx.strokeStyle = '#00F0FF';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 5;
    }
  };

  return (
    <div className="space-y-8">
      {/* Squad & Materials */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-[#151515] border-t-2 border-marvel-red p-6">
          <h2 className="font-hero text-2xl mb-6 flex items-center gap-2 text-white uppercase tracking-wider">
            <Users className="w-5 h-5 text-marvel-red" /> Squad Assignment
          </h2>
          <div className="space-y-4">
            {team.map((member, idx) => (
              <div key={idx} className="flex gap-0 group">
                <div className="bg-[#222] border border-[#444] px-3 py-2 font-mono text-xs text-gray-400 w-24 flex items-center justify-center uppercase">
                    {member.role}
                </div>
                <input 
                  type="text" 
                  placeholder="AGENT NAME..." 
                  className="flex-1 bg-black border border-[#333] border-l-0 px-4 py-2 font-sans text-white focus:outline-none focus:border-marvel-red transition-colors"
                  value={member.name}
                  onChange={(e) => {
                    const newTeam = [...team];
                    newTeam[idx].name = e.target.value;
                    setTeam(newTeam);
                  }}
                />
              </div>
            ))}
          </div>
          <Button size="sm" className="mt-6 w-full" variant="ghost">Confirm Agents</Button>
        </div>

        <div className="bg-[#151515] border border-gray-800 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2">
              <Grid className="text-gray-800 w-24 h-24" />
          </div>
          <h2 className="font-hero text-2xl mb-6 text-white uppercase tracking-wider relative z-10">Resource Manifest</h2>
          <ul className="space-y-2 relative z-10">
            {['Insulation Pipe (Foam)', 'Adhesive Tape (Industrial)', 'Sphere (Steel/Marble)', 'Precision Ruler'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 bg-black/50 p-3 border-l-2 border-marvel-gold">
                    <Box className="w-4 h-4 text-marvel-gold" />
                    <span className="font-mono text-sm text-gray-300 uppercase">{item}</span>
                </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Blueprint Area */}
      <div className="border border-hud-cyan/30 bg-black shadow-neon-blue relative clip-tech">
        <div className="bg-[#050505] p-3 flex justify-between items-center border-b border-hud-cyan/30">
          <div className="flex items-center gap-2">
             <PenTool className="w-5 h-5 text-hud-cyan" />
             <span className="font-mono text-hud-cyan text-sm tracking-widest">SCHEMATIC V.1.0</span>
          </div>
          <div className="flex gap-4">
             <button onClick={clearCanvas} className="text-gray-500 hover:text-marvel-red font-mono text-xs uppercase transition-colors">Clear Grid</button>
             <button className="text-gray-500 hover:text-hud-cyan font-mono text-xs uppercase transition-colors">Save To Disk</button>
          </div>
        </div>
        <div className="relative">
          <canvas 
            ref={canvasRef}
            width={800}
            height={400}
            className="w-full cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-hud-cyan/50 font-mono text-xs pointer-events-none">
              DRAW TRAJECTORY PATH
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignModule;