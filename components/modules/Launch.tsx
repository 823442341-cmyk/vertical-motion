import React, { useState } from 'react';
import Button from '../Button';
import { Play, ChevronDown, ChevronUp, Cpu, Lock } from 'lucide-react';

const LaunchModule: React.FC = () => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [hypothesis, setHypothesis] = useState('');

  const questions = [
    {
      id: 1,
      q: "PROPULSION SYSTEM STATUS?",
      hint: "Negative on thrusters. The system relies on Gravitational Potential Energy conversion."
    },
    {
      id: 2,
      q: "CALCULATE SAFE APEX HEIGHT",
      hint: "Physics Protocol dictates h ≥ 2.5R to maintain contact with the track."
    },
    {
      id: 3,
      q: "MASS VARIABILE IMPACT?",
      hint: "Mass is negligible in vacuum conditions. However, atmospheric friction is a known variable."
    }
  ];

  return (
    <div className="grid md:grid-cols-12 gap-8 text-gray-300">
      {/* Video Section - Holo Screen */}
      <div className="md:col-span-7 space-y-6">
        <div className="relative border border-hud-cyan/30 bg-black/80 aspect-video flex items-center justify-center group cursor-pointer overflow-hidden shadow-neon-blue">
          <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none"></div>
          {/* Corner markers */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-hud-cyan"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-hud-cyan"></div>
          
          <div className="text-center relative z-10">
            <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform bg-hud-cyan/10 backdrop-blur-sm">
                 <Play className="w-8 h-8 text-hud-cyan fill-current ml-1" />
            </div>
            <p className="font-mono text-hud-cyan mt-4 text-sm tracking-widest animate-pulse">PLAYING: SIMULATION_ALPHA.mp4</p>
          </div>
        </div>

        <div className="bg-[#1a1a1a] border-l-2 border-marvel-gold p-6 relative clip-r-bottom">
          <div className="absolute -top-3 left-0 bg-marvel-gold text-black px-2 font-bold text-xs font-hero">INTEL</div>
          <h3 className="font-hero text-2xl text-white mb-4 uppercase">Mission Objectives</h3>
          <ul className="space-y-3 font-mono text-sm text-gray-400">
            <li className="flex items-center gap-3">
                <span className="text-marvel-gold">>></span> Analyze Energy Conservation protocols.
            </li>
            <li className="flex items-center gap-3">
                <span className="text-marvel-gold">>></span> Determine minimal loop height parameters.
            </li>
            <li className="flex items-center gap-3">
                <span className="text-marvel-gold">>></span> Assess friction coefficient variables.
            </li>
          </ul>
        </div>
      </div>

      {/* Questions Section - Encrypted Files */}
      <div className="md:col-span-5 space-y-6">
        <div className="bg-[#151515] border border-gray-800 p-6">
          <h2 className="font-hero text-2xl mb-6 flex items-center gap-2 text-white border-b border-gray-700 pb-2">
            <Lock className="w-5 h-5 text-marvel-red" /> ENCRYPTED DATA
          </h2>
          
          <div className="space-y-2">
            {questions.map((q, idx) => (
              <div key={q.id} className="border border-gray-800 bg-[#0B0B0B]">
                <button 
                  onClick={() => setActiveQuestion(activeQuestion === idx ? null : idx)}
                  className={`w-full text-left p-4 font-bold font-mono text-sm flex justify-between items-center transition-colors ${activeQuestion === idx ? 'text-hud-cyan bg-hud-cyan/5' : 'text-gray-400 hover:text-white'}`}
                >
                  <span>{q.q}</span>
                  {activeQuestion === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeQuestion === idx && (
                  <div className="p-4 bg-hud-cyan/5 border-t border-hud-cyan/20 flex gap-3 animate-slide-in">
                    <Cpu className="w-5 h-5 text-hud-cyan flex-shrink-0" />
                    <p className="text-sm font-sans text-hud-cyan">{q.hint}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#151515] border border-gray-800 p-6 relative">
          <label className="font-hero text-xl block mb-4 text-white uppercase">
              <span className="text-marvel-red mr-2">////</span>
              Hypothesis Input
          </label>
          <textarea 
            className="w-full bg-black border border-gray-700 p-4 font-mono text-sm text-gray-300 h-32 focus:outline-none focus:border-marvel-red focus:shadow-neon-red transition-all resize-none"
            placeholder="ENTER THEORETICAL DATA..."
            value={hypothesis}
            onChange={(e) => setHypothesis(e.target.value)}
          />
          <Button className="w-full mt-4" variant="primary">UPLOAD TO SERVER</Button>
        </div>
      </div>
    </div>
  );
};

export default LaunchModule;