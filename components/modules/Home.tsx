import React from 'react';
import { ModuleType } from '../../types';
import Button from '../Button';
import { ArrowRight, Activity, Users, Zap, Shield, Hammer } from 'lucide-react';

interface HomeProps {
  setModule: (m: ModuleType) => void;
}

const HomeModule: React.FC<HomeProps> = ({ setModule }) => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative border-l-4 border-marvel-red bg-marvel-panel p-8 md:p-12 overflow-hidden shadow-tech-panel">
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-marvel-red/20 to-transparent pointer-events-none"></div>
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
                <div className="flex items-center gap-2 mb-4 text-marvel-red font-mono text-sm tracking-widest">
                   <span className="w-2 h-2 bg-marvel-red rounded-full animate-pulse"></span>
                   PRIORITY LEVEL: ALPHA
                </div>
                <h1 className="text-6xl md:text-8xl font-hero text-white uppercase leading-none mb-2 drop-shadow-lg">
                  Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-marvel-red to-orange-600">Loop</span>
                </h1>
                <h2 className="text-3xl font-sans font-light text-hud-text uppercase tracking-widest mb-8">
                  Initiating Physics Protocol
                </h2>
                <div className="flex flex-wrap gap-4">
                  <Button onClick={() => setModule(ModuleType.PROPOSAL)} size="lg" variant="primary">
                    Start Mission
                  </Button>
                  <Button onClick={() => setModule(ModuleType.SHOWCASE)} size="lg" variant="secondary">
                    View Archives
                  </Button>
                </div>
            </div>
            
            {/* Hologram Visual */}
            <div className="relative h-64 md:h-80 flex items-center justify-center border border-white/10 bg-black/50 clip-tech">
               <div className="absolute inset-0 bg-tech-grid opacity-20"></div>
               <div className="text-center relative z-10">
                  <div className="w-32 h-32 rounded-full border-4 border-hud-cyan shadow-neon-blue mx-auto flex items-center justify-center animate-pulse-slow relative">
                     <div className="absolute inset-0 border-2 border-white/50 rounded-full animate-spin-slow opacity-50"></div>
                     <Zap className="w-16 h-16 text-hud-cyan" />
                  </div>
                  <div className="mt-4 font-mono text-hud-cyan text-sm">ARC REACTOR OUTPUT: 100%</div>
               </div>
               
               {/* Tech Corners */}
               <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-marvel-red"></div>
               <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-marvel-red"></div>
            </div>
        </div>
      </div>

      {/* Protocols (Value Props) */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: Hammer, title: "Fabrication", desc: "Construct prototype units.", color: "text-marvel-gold" },
          { icon: Activity, title: "Analysis", desc: "Calculate kinetic variables.", color: "text-hud-cyan" },
          { icon: Users, title: "Alliance", desc: "Collaborate with squad.", color: "text-marvel-red" },
        ].map((item, i) => (
          <div key={i} className="bg-[#1a1a1a] p-6 border-t-2 border-gray-700 hover:border-marvel-red transition-colors group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10 font-hero text-6xl text-white group-hover:opacity-20 transition-opacity">
                0{i+1}
            </div>
            <item.icon className={`w-10 h-10 ${item.color} mb-4 group-hover:scale-110 transition-transform`} />
            <h3 className="font-hero text-2xl text-white uppercase tracking-wider mb-2">{item.title}</h3>
            <p className="font-sans text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Timeline / Roadmap */}
      <div className="border border-white/10 bg-black/50 p-8 clip-tech">
        <h2 className="font-hero text-3xl text-white uppercase mb-8 border-l-4 border-marvel-red pl-4">
            Mission Timeline
        </h2>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 -z-0 hidden md:block"></div>
          
          {[
            { step: 1, label: "BRIEFING", id: ModuleType.PROPOSAL },
            { step: 2, label: "BLUEPRINT", id: ModuleType.CONSTRUCTION },
            { step: 3, label: "ASSEMBLY", id: ModuleType.CONSTRUCTION },
            { step: 4, label: "TESTING", id: ModuleType.SIMULATION },
            { step: 5, label: "DEBRIEF", id: ModuleType.SHOWCASE },
          ].map((s, idx) => (
            <button 
              key={s.step}
              onClick={() => setModule(s.id)}
              className="relative z-10 flex flex-col items-center group w-full md:w-auto"
            >
              <div className="w-12 h-12 bg-[#1a1a1a] border-2 border-gray-600 rounded-full flex items-center justify-center font-mono text-white group-hover:border-marvel-red group-hover:shadow-neon-red transition-all">
                {s.step}
              </div>
              <span className="font-hero text-sm mt-3 text-gray-400 group-hover:text-white uppercase tracking-widest bg-[#0B0B0B] px-2">
                  {s.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeModule;