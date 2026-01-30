import React, { useState } from 'react';
import { Clipboard, Mic, Users, Star, Box, CheckSquare, Clock, Zap } from 'lucide-react';
import Button from '../Button';

const ShowcaseModule: React.FC = () => {
  const [checklist, setChecklist] = useState({
    model: false,
    docs: false,
    props: false,
    roles: false,  
  });
  const [statusNote, setStatusNote] = useState('');

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8 pb-12">
       {/* Header */}
       <div className="bg-pop-yellow border-4 border-black p-8 text-center shadow-comic relative overflow-hidden transform rotate-1">
          <div className="absolute inset-0 bg-halftone opacity-10"></div>
          <h2 className="text-4xl md:text-6xl font-comic text-black uppercase relative z-10">
            SHOWCASE PREP
          </h2>
          <p className="font-sans font-bold text-lg mt-2 relative z-10 bg-white inline-block px-4 border-2 border-black -rotate-1">
            LIVE PRESENTATION GUIDELINES
          </p>
       </div>

       <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT COLUMN */}
          <div className="space-y-8">
             {/* 1. REQUIREMENTS */}
             <div className="pop-card bg-white p-0">
                <div className="bg-black text-white p-3 border-b-4 border-black flex items-center gap-2">
                   <Mic className="w-5 h-5 text-pop-green" />
                   <span className="font-comic tracking-widest text-lg">THE MISSION BRIEF</span>
                </div>
                <div className="p-6 space-y-6">
                   {/* Visual Scenario */}
                   <div className="bg-gray-100 border-2 border-dashed border-gray-400 h-40 flex items-center justify-center relative overflow-hidden">
                       <svg viewBox="0 0 200 100" className="w-full h-full opacity-50">
                           {/* Podium */}
                           <rect x="80" y="60" width="40" height="40" fill="#333" />
                           <rect x="75" y="55" width="50" height="5" fill="#555" />
                           {/* Mic */}
                           <line x1="100" y1="55" x2="100" y2="35" stroke="black" strokeWidth="2" />
                           <circle cx="100" cy="30" r="5" fill="#333" />
                           {/* Screen */}
                           <rect x="20" y="20" width="40" height="30" fill="white" stroke="black" strokeWidth="2" />
                           {/* People */}
                           <circle cx="160" cy="70" r="10" fill="#FFD600" stroke="black" strokeWidth="2" />
                       </svg>
                       <div className="absolute inset-0 flex items-center justify-center">
                          <span className="bg-white border-2 border-black px-2 font-comic text-sm shadow-[2px_2px_0px_#000]">THE STAGE</span>
                       </div>
                   </div>

                   <div className="space-y-4">
                       <div className="flex gap-4 items-start">
                          <div className="bg-pop-blue text-white p-2 border-2 border-black font-bold font-mono text-xs">FORMAT</div>
                          <div>
                             <h4 className="font-bold font-comic text-lg">PHYSICAL DEMO + STORY</h4>
                             <p className="text-sm font-sans text-gray-600">Show us the real coaster & explain how you built it.</p>
                          </div>
                       </div>
                       <div className="flex gap-4 items-start">
                          <div className="bg-pop-pink text-white p-2 border-2 border-black font-bold font-mono text-xs">TIME</div>
                          <div>
                             <h4 className="font-bold font-comic text-lg">3 - 5 MINUTES</h4>
                             <p className="text-sm font-sans text-gray-600">Short & punchy. Don't bore the audience!</p>
                          </div>
                       </div>
                       <div className="bg-pop-yellow/20 border-l-4 border-pop-yellow p-3 text-sm font-sans">
                          <strong>KEY TOPICS:</strong> Design Logic → The Hardest Part → LIVE RUN → Squad Roles
                       </div>
                   </div>
                </div>
             </div>

             {/* 2. RUBRIC */}
             <div className="pop-card bg-white p-0">
                <div className="bg-pop-blue border-b-4 border-black p-3 flex items-center gap-2 text-white">
                   <Star className="w-5 h-5 fill-pop-yellow text-black" />
                   <span className="font-comic tracking-widest text-lg">SCORING CARD</span>
                </div>
                <div className="p-6 grid grid-cols-2 gap-4">
                    <ScoreBlock title="CREATIVITY" pct="30%" color="bg-pop-pink" desc="Unique track shape & theme" />
                    <ScoreBlock title="STABILITY" pct="25%" color="bg-pop-blue" desc="Structure holds up" />
                    <ScoreBlock title="SMOOTHNESS" pct="25%" color="bg-pop-yellow" desc="Marble stays on track" />
                    <ScoreBlock title="SPEECH" pct="20%" color="bg-pop-green" desc="Clear & loud" />
                </div>
             </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">
              {/* 3. CHECKLIST */}
              <div className="pop-card bg-[#1a1a1a] border-black text-white">
                  <div className="p-6 border-b-2 border-gray-800">
                      <h3 className="font-comic text-3xl text-pop-green flex items-center gap-2">
                         <Clipboard className="w-8 h-8" /> READY TO LAUNCH?
                      </h3>
                      <p className="text-gray-400 text-sm font-mono mt-2">Complete these checks before approaching the stage.</p>
                  </div>
                  <div className="p-6 space-y-4">
                      <CheckItem 
                        checked={checklist.model} 
                        onClick={() => toggleCheck('model')} 
                        label="COASTER DEBUGGED" 
                        sub="Test run completed 3x without failure." 
                      />
                      <CheckItem 
                        checked={checklist.docs} 
                        onClick={() => toggleCheck('docs')} 
                        label="DESIGN ARTIFACTS" 
                        sub="Sketches, photos, or videos ready to show." 
                      />
                      <CheckItem 
                        checked={checklist.props} 
                        onClick={() => toggleCheck('props')} 
                        label="DEMO PROPS" 
                        sub="Marbles, mats, and stopwatch in hand." 
                      />
                      <CheckItem 
                        checked={checklist.roles} 
                        onClick={() => toggleCheck('roles')} 
                        label="SQUAD ROLES" 
                        sub="Who is talking? Who is dropping the marble?" 
                      />
                  </div>
              </div>

              {/* 4. FOOTER */}
              <div className="bg-white border-4 border-black p-4 shadow-comic flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-gray-500 font-mono text-xs uppercase">
                      <Clock className="w-4 h-4" />
                      <span>Log Entry</span>
                  </div>
                  <input 
                     type="text" 
                     placeholder="Record your team's current prep status..." 
                     className="w-full border-2 border-black p-3 font-comic text-lg focus:bg-pop-yellow focus:outline-none transition-colors"
                     value={statusNote}
                     onChange={(e) => setStatusNote(e.target.value)}
                  />
                  <div className="text-center text-xs font-bold bg-gray-100 p-2 border border-gray-300">
                     NOTE: Presentation order will be randomized by the instructor.
                  </div>
              </div>
          </div>
       </div>
    </div>
  );
};

const ScoreBlock = ({ title, pct, color, desc }: any) => (
    <div className="border-4 border-black p-3 shadow-sm relative group hover:-translate-y-1 transition-transform bg-white">
        <div className={`absolute top-0 left-0 w-full h-2 ${color} border-b-2 border-black`}></div>
        <div className="mt-2 font-comic text-3xl">{pct}</div>
        <div className="font-bold font-sans text-xs uppercase">{title}</div>
        <p className="text-[10px] text-gray-500 leading-tight mt-1">{desc}</p>
    </div>
);

const CheckItem = ({ checked, onClick, label, sub }: any) => (
    <div 
      onClick={onClick}
      className={`cursor-pointer border-2 border-gray-700 p-4 flex items-center gap-4 transition-all hover:bg-gray-800 ${checked ? 'bg-gray-800 border-pop-green' : 'bg-transparent'}`}
    >
        <div className={`w-8 h-8 flex-shrink-0 border-2 ${checked ? 'bg-pop-green border-pop-green text-black' : 'border-gray-500 text-transparent'} flex items-center justify-center transition-colors`}>
            <CheckSquare className="w-6 h-6" />
        </div>
        <div>
            <div className={`font-comic text-xl ${checked ? 'text-pop-green decoration-pop-green' : 'text-gray-300'}`}>
                {label}
            </div>
            <div className="text-xs text-gray-500 font-mono">{sub}</div>
        </div>
    </div>
);

export default ShowcaseModule;