import React, { useState } from 'react';
import Button from '../Button';
import { ExperimentRecord } from '../../types';
import { Wrench, Calculator, Plus, Trash2, CheckCircle, XCircle, AlertTriangle, Scissors, Ruler, StickyNote, ArrowRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts';

const ConstructionModule: React.FC = () => {
  // --- STATE: CALCULATOR ---
  const [calcRadius, setCalcRadius] = useState<number>(0.20);
  const theoreticalMinHeight = (calcRadius * 2.5).toFixed(2);

  // --- STATE: EXPERIMENT LOGGING ---
  const [records, setRecords] = useState<ExperimentRecord[]>([]);
  const [inputH, setInputH] = useState<string>('');
  const [inputR, setInputR] = useState<string>('0.20');
  const [outcome, setOutcome] = useState<boolean | null>(null);

  const addRecord = () => {
    if (!inputH || !inputR || outcome === null) return;
    const r = parseFloat(inputR);
    const h = parseFloat(inputH);
    
    const newRecord: ExperimentRecord = {
      id: Date.now().toString(),
      radius: r,
      actualHeight: h,
      theoryHeight: r * 2.5,
      success: outcome,
      notes: ''
    };
    
    setRecords([newRecord, ...records]);
    setOutcome(null); 
  };

  const removeRecord = (id: string) => {
    setRecords(records.filter(r => r.id !== id));
  };

  const chartData = records.map((r, i) => ({
    name: `#${records.length - i}`,
    Actual: r.actualHeight,
    Theory: r.theoryHeight,
  })).reverse();

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      {/* ---------------- LEFT COLUMN: CONSTRUCTION MANUAL ---------------- */}
      <div className="lg:col-span-7 space-y-8">
        
        {/* Header */}
        <div className="bg-pop-blue border-4 border-black p-4 shadow-comic transform -rotate-1 relative overflow-hidden">
          <div className="absolute inset-0 bg-halftone-blue opacity-20"></div>
          <h2 className="font-comic text-4xl text-white uppercase flex items-center gap-3 relative z-10">
             <Wrench className="w-8 h-8" /> BUILD GUIDE
          </h2>
          <p className="font-sans text-white font-bold text-sm mt-1 relative z-10">
            REALITY FABRICATION PROTOCOL
          </p>
        </div>

        {/* 1. MATERIALS LIST */}
        <div className="bg-white border-4 border-black p-6 relative shadow-comic">
           <div className="absolute -top-4 -left-2 bg-pop-yellow border-2 border-black px-3 py-1 font-comic text-lg shadow-sm transform -rotate-2">
              STEP 0: THE GEAR
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {/* Item 1 */}
              <div className="text-center group">
                 <div className="w-16 h-16 mx-auto bg-gray-100 border-2 border-black rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    {/* Pipe SVG */}
                    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-gray-300 stroke-black stroke-2">
                       <path d="M4 4h16v16H4z" fill="none" stroke="none"/>
                       <path d="M17 10c0-2.21-3-4-3-4S11 7.79 11 10s3 4 3 4 3-1.79 3-4z" fill="#ddd"/>
                       <path d="M11 10v10h6V10" />
                       <ellipse cx="14" cy="10" rx="3" ry="1.5" stroke="black" fill="white" /> 
                    </svg>
                 </div>
                 <div className="font-bold font-comic text-sm">FOAM PIPE</div>
                 <div className="text-[10px] font-mono text-gray-500">Insulation Tube</div>
              </div>

              {/* Item 2 */}
              <div className="text-center group">
                 <div className="w-16 h-16 mx-auto bg-gray-100 border-2 border-black rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Scissors className="w-8 h-8 text-black" />
                 </div>
                 <div className="font-bold font-comic text-sm">CUTTER</div>
                 <div className="text-[10px] font-mono text-gray-500">Adult Supervision!</div>
              </div>

              {/* Item 3 */}
              <div className="text-center group">
                 <div className="w-16 h-16 mx-auto bg-gray-100 border-2 border-black rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <StickyNote className="w-8 h-8 text-pop-blue fill-pop-blue" />
                 </div>
                 <div className="font-bold font-comic text-sm">TAPE</div>
                 <div className="text-[10px] font-mono text-gray-500">Masking Tape</div>
              </div>

              {/* Item 4 */}
              <div className="text-center group">
                 <div className="w-16 h-16 mx-auto bg-gray-100 border-2 border-black rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <div className="w-6 h-6 rounded-full bg-gray-400 border border-black shadow-inner"></div>
                 </div>
                 <div className="font-bold font-comic text-sm">MARBLE</div>
                 <div className="text-[10px] font-mono text-gray-500">Steel or Glass</div>
              </div>
           </div>
        </div>

        {/* 2. STEP BY STEP CONSTRUCTION */}
        <div className="space-y-6">
            
            {/* STEP 1: PREP */}
            <div className="pop-card bg-white p-0 flex flex-col md:flex-row overflow-hidden">
               <div className="bg-pop-pink p-4 flex flex-col justify-center items-center md:w-24 border-b-4 md:border-b-0 md:border-r-4 border-black">
                  <span className="font-comic text-4xl text-white text-shadow-pop">1</span>
                  <span className="font-bold text-xs uppercase text-white mt-1">Prep</span>
               </div>
               <div className="p-4 flex-1">
                  <h3 className="font-comic text-xl mb-2">SPLIT THE PIPE</h3>
                  <div className="flex gap-4">
                     <div className="flex-1 text-sm font-sans font-bold text-gray-600">
                        <p className="mb-2">If using a foam tube, carefully cut it down the center line to create TWO half-pipe tracks.</p>
                        <div className="bg-yellow-100 border border-yellow-400 p-2 text-xs flex gap-2 items-center">
                           <AlertTriangle className="w-4 h-4 text-yellow-600" />
                           <span>Ask a teacher or parent for help with cutting!</span>
                        </div>
                     </div>
                     <div className="w-32 h-24 bg-gray-50 border-2 border-black p-2">
                        <svg viewBox="0 0 100 80" className="w-full h-full">
                           {/* Tube Cross Section */}
                           <circle cx="30" cy="40" r="20" fill="none" stroke="black" strokeWidth="2" />
                           <circle cx="30" cy="40" r="15" fill="none" stroke="black" strokeWidth="1" strokeDasharray="2 2" />
                           {/* Cut Line */}
                           <line x1="30" y1="15" x2="30" y2="65" stroke="#F87171" strokeWidth="2" strokeDasharray="4 2" />
                           <path d="M 60 40 L 90 40" stroke="black" strokeWidth="2" markerEnd="url(#arrow)" />
                           {/* Result */}
                           <path d="M 70 20 A 15 15 0 0 0 70 50" fill="none" stroke="black" strokeWidth="2" />
                           <path d="M 85 20 A 15 15 0 0 1 85 50" fill="none" stroke="black" strokeWidth="2" />
                        </svg>
                     </div>
                  </div>
               </div>
            </div>

            {/* STEP 2: ANCHOR */}
            <div className="pop-card bg-white p-0 flex flex-col md:flex-row overflow-hidden">
               <div className="bg-pop-yellow p-4 flex flex-col justify-center items-center md:w-24 border-b-4 md:border-b-0 md:border-r-4 border-black">
                  <span className="font-comic text-4xl text-black">2</span>
                  <span className="font-bold text-xs uppercase text-black mt-1">Anchor</span>
               </div>
               <div className="p-4 flex-1">
                  <h3 className="font-comic text-xl mb-2">CREATE THE DROP</h3>
                  <div className="flex gap-4">
                     <div className="flex-1 text-sm font-sans font-bold text-gray-600">
                        <p>Tape one end of your track to a high point (bookshelf, desk edge, or wall).</p>
                        <p className="mt-2 text-black">Make sure the transition from vertical to slope is SMOOTH.</p>
                     </div>
                     <div className="w-32 h-24 bg-gray-50 border-2 border-black p-2">
                        <svg viewBox="0 0 100 80" className="w-full h-full">
                           <rect x="10" y="10" width="30" height="70" fill="#333" />
                           <path d="M 40 20 Q 70 60 90 80" fill="none" stroke="#FFD600" strokeWidth="6" />
                           <path d="M 40 20 Q 70 60 90 80" fill="none" stroke="black" strokeWidth="1" strokeDasharray="2 2" />
                           {/* Tape */}
                           <rect x="35" y="15" width="10" height="5" fill="#306EFF" />
                        </svg>
                     </div>
                  </div>
               </div>
            </div>

            {/* STEP 3: LOOP */}
            <div className="pop-card bg-white p-0 flex flex-col md:flex-row overflow-hidden">
               <div className="bg-pop-sky p-4 flex flex-col justify-center items-center md:w-24 border-b-4 md:border-b-0 md:border-r-4 border-black">
                  <span className="font-comic text-4xl text-black">3</span>
                  <span className="font-bold text-xs uppercase text-black mt-1">Loop</span>
               </div>
               <div className="p-4 flex-1">
                  <h3 className="font-comic text-xl mb-2">FORM THE CIRCLE</h3>
                  <div className="flex gap-4">
                     <div className="flex-1 text-sm font-sans font-bold text-gray-600">
                        <p>Curl the track. Tape the bottom firmly to the floor.</p>
                        <p className="mt-2">Ensure the loop stands vertically.</p>
                     </div>
                     <div className="w-32 h-24 bg-gray-50 border-2 border-black p-2">
                         <svg viewBox="0 0 100 80" className="w-full h-full">
                           <line x1="0" y1="75" x2="100" y2="75" stroke="black" strokeWidth="2" />
                           {/* Loop Track - Omega Shape */}
                           <path d="M 0 75 L 35 75 A 18 22 0 1 1 65 75 L 100 75" 
                                 fill="none" stroke="#FFD600" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                           <path d="M 0 75 L 35 75 A 18 22 0 1 1 65 75 L 100 75" 
                                 fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                           {/* Tape */}
                           <rect x="25" y="72" width="10" height="5" fill="#306EFF" transform="rotate(-15 30 74)" />
                           <rect x="65" y="72" width="10" height="5" fill="#306EFF" transform="rotate(15 70 74)" />
                         </svg>
                     </div>
                  </div>
               </div>
            </div>

             {/* STEP 4: MEASURE */}
             <div className="pop-card bg-white p-0 flex flex-col md:flex-row overflow-hidden">
               <div className="bg-black p-4 flex flex-col justify-center items-center md:w-24 border-b-4 md:border-b-0 md:border-r-4 border-black">
                  <span className="font-comic text-4xl text-white">4</span>
                  <span className="font-bold text-xs uppercase text-white mt-1">Test</span>
               </div>
               <div className="p-4 flex-1">
                  <h3 className="font-comic text-xl mb-2">PROTOCOL</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs font-sans font-bold">
                     <div className="bg-gray-100 p-2 border border-black">
                        <div className="flex items-center gap-1 text-pop-pink mb-1"><Ruler className="w-3 h-3"/> MEASURE</div>
                        Measure "r" (radius) from floor to loop center. Measure "h" (height) from floor to start.
                     </div>
                     <div className="bg-gray-100 p-2 border border-black">
                        <div className="flex items-center gap-1 text-pop-blue mb-1"><ArrowRight className="w-3 h-3"/> RELEASE</div>
                        Just let go! <br/><span className="bg-red-100 text-red-600 px-1">NO PUSHING!</span>
                     </div>
                  </div>
               </div>
            </div>

        </div>
      </div>


      {/* ---------------- RIGHT COLUMN: THE LAB (Data & Calc) ---------------- */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* 1. The Calculator (Bridging Theory) */}
        <div className="pop-card p-6 bg-[#1a1a1a] border-black text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <Calculator className="w-32 h-32 text-white" />
           </div>
           
           <div className="relative z-10 flex flex-col gap-6">
              <div className="border-b-2 border-gray-700 pb-4">
                 <h3 className="font-comic text-2xl text-pop-yellow">TARGET CALCULATOR</h3>
                 <p className="text-sm text-gray-400 font-sans mt-1">
                    Enter your physical loop's radius to find the <span className="text-white font-bold">Physics Minimum</span> drop height.
                 </p>
              </div>
              
              <div className="flex gap-4 items-end">
                 <div className="flex-1">
                    <label className="font-comic text-lg block mb-1">RADIUS (r)</label>
                    <div className="flex items-center">
                        <input 
                          type="number" 
                          step="0.01"
                          value={calcRadius}
                          onChange={(e) => setCalcRadius(parseFloat(e.target.value))}
                          className="w-full bg-black border-2 border-pop-yellow text-white p-2 font-comic text-xl focus:outline-none text-right"
                        />
                        <span className="ml-2 font-mono text-gray-500">m</span>
                    </div>
                 </div>

                 <div className="flex-1">
                     <div className="text-xs font-mono text-pop-blue mb-1">MIN HEIGHT (h)</div>
                     <div className="bg-pop-blue border-2 border-white p-2 text-center shadow-lg">
                        <div className="text-3xl font-comic text-white">{theoreticalMinHeight}m</div>
                     </div>
                 </div>
              </div>
              
              <div className="text-xs font-mono text-gray-500 text-center bg-black/50 p-2 rounded">
                  Formula: h = 2.5 × r (No Friction)
              </div>
           </div>
        </div>

        {/* 2. Experiment Logger */}
        <div className="pop-card p-0 bg-white">
           <div className="bg-pop-sky border-b-4 border-black p-4 flex justify-between items-center">
              <h3 className="font-comic text-2xl text-black">TEST LOG</h3>
              <div className="bg-white border-2 border-black px-2 py-0.5 text-xs font-bold font-mono">
                 LIVE DATA
              </div>
           </div>
           
           <div className="p-6 space-y-6">
              {/* Input Row */}
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <label className="font-bold text-xs uppercase">Your Radius (m)</label>
                    <input 
                      type="number" step="0.01" 
                      value={inputR} onChange={e => setInputR(e.target.value)}
                      className="w-full border-4 border-black p-2 font-comic text-lg" 
                    />
                 </div>
                 <div className="space-y-1">
                    <label className="font-bold text-xs uppercase">Your Height (m)</label>
                    <input 
                      type="number" step="0.01" 
                      value={inputH} onChange={e => setInputH(e.target.value)}
                      className="w-full border-4 border-black p-2 font-comic text-lg focus:bg-pop-yellow transition-colors"
                      placeholder="?" 
                    />
                 </div>
              </div>
              
              <div className="space-y-1">
                <label className="font-bold text-xs block mb-1 uppercase">Success?</label>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setOutcome(true)}
                        className={`flex-1 border-4 border-black py-3 hover:-translate-y-1 transition-transform flex items-center justify-center gap-2 ${outcome === true ? 'bg-pop-lime' : 'bg-gray-100'}`}
                    >
                        <CheckCircle className="w-5 h-5" /> YES
                    </button>
                    <button 
                        onClick={() => setOutcome(false)}
                        className={`flex-1 border-4 border-black py-3 hover:-translate-y-1 transition-transform flex items-center justify-center gap-2 ${outcome === false ? 'bg-pop-pink text-white' : 'bg-gray-100'}`}
                    >
                        <XCircle className="w-5 h-5" /> NO
                    </button>
                </div>
              </div>

              <Button onClick={addRecord} className="w-full" disabled={!inputH || outcome === null}>
                 <Plus className="w-5 h-5 mr-2" /> LOG RUN
              </Button>

              {/* Data Table */}
              <div className="border-4 border-black mt-4">
                 <div className="grid grid-cols-5 bg-black text-white font-comic text-sm p-2 text-center">
                    <div>#</div>
                    <div>RAD</div>
                    <div>HGT</div>
                    <div>STAT</div>
                    <div></div>
                 </div>
                 <div className="max-h-48 overflow-y-auto bg-gray-50 custom-scrollbar">
                    {records.length === 0 ? (
                       <div className="p-8 text-center text-gray-400 font-comic">NO DATA RECORDED</div>
                    ) : (
                       records.map((r, i) => (
                          <div key={r.id} className="grid grid-cols-5 p-2 border-b-2 border-gray-200 font-sans font-bold text-sm items-center text-center hover:bg-white">
                             <div className="text-gray-500">#{records.length - i}</div>
                             <div>{r.radius}m</div>
                             <div className={`${r.actualHeight < r.theoryHeight ? 'text-pop-pink' : 'text-black'}`}>
                                {r.actualHeight}m
                             </div>
                             <div>
                                {r.success 
                                  ? <span className="bg-pop-lime px-1 border border-black text-[10px]">PASS</span> 
                                  : <span className="bg-pop-pink text-white px-1 border border-black text-[10px]">FAIL</span>
                                }
                             </div>
                             <div className="text-right pr-2">
                                <button onClick={() => removeRecord(r.id)} className="text-gray-400 hover:text-red-600">
                                   <Trash2 className="w-4 h-4" />
                                </button>
                             </div>
                          </div>
                       ))
                    )}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ConstructionModule;