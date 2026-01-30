import React, { useState } from 'react';
import { Plus, Trash2, Check, X, Clipboard } from 'lucide-react';
import { ExperimentRecord } from '../../types';
import Button from '../Button';

const ExperimentModule: React.FC = () => {
  const [records, setRecords] = useState<ExperimentRecord[]>([]);
  const [newHeight, setNewHeight] = useState<string>('');
  const [newRadius, setNewRadius] = useState<string>('0.2'); 
  const [outcome, setOutcome] = useState<boolean>(true);

  const addRecord = () => {
    if (!newHeight || !newRadius) return;
    
    const rVal = parseFloat(newRadius);
    const hVal = parseFloat(newHeight);

    const record: ExperimentRecord = {
      id: Date.now().toString(),
      actualHeight: hVal,
      radius: rVal,
      theoryHeight: rVal * 2.5,
      success: outcome,
      notes: ''
    };
    setRecords([record, ...records]);
    setNewHeight('');
  };

  const removeRecord = (id: string) => {
    setRecords(records.filter(r => r.id !== id));
  };

  const successfulRuns = records.filter(r => r.success);
  const minSuccessfulHeight = successfulRuns.length > 0 
    ? Math.min(...successfulRuns.map(r => r.actualHeight)) 
    : 0;

  const theoreticalMinHeight = successfulRuns.length > 0
    ? (2.5 * successfulRuns[0].radius).toFixed(2)
    : '---';

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      {/* Left Col: Guide */}
      <div className="lg:col-span-4 space-y-8">
        <div className="pop-card p-0 bg-white">
          <div className="bg-pop-cyan p-4 border-b-4 border-black relative overflow-hidden">
             <div className="absolute inset-0 bg-halftone opacity-20"></div>
             <h2 className="text-3xl font-comic text-black relative z-10 text-shadow-white transform -rotate-1">
               INSTRUCTIONS
             </h2>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <h3 className="font-comic text-xl bg-black text-white inline-block px-3 py-1 transform -rotate-2 mb-2 shadow-comic">GEAR</h3>
              <ul className="text-lg font-bold font-sans space-y-1 list-none">
                <li className="flex items-center gap-2"><span className="w-3 h-3 bg-pop-pink border-2 border-black rounded-full"></span> Flexible Track</li>
                <li className="flex items-center gap-2"><span className="w-3 h-3 bg-pop-pink border-2 border-black rounded-full"></span> Metal Marble</li>
                <li className="flex items-center gap-2"><span className="w-3 h-3 bg-pop-pink border-2 border-black rounded-full"></span> Ruler</li>
              </ul>
            </div>

            <div className="border-4 border-black p-4 bg-pop-yellow relative shadow-comic">
               <div className="absolute -top-3 -right-3 w-8 h-8 bg-white border-4 border-black rounded-full flex items-center justify-center font-bold">!</div>
               <h3 className="font-comic text-xl mb-2">THE PLAN</h3>
               <div className="space-y-2 font-sans font-bold text-sm">
                <div className="bg-white border-2 border-black p-2">1. BEND the loop.</div>
                <div className="bg-white border-2 border-black p-2">2. MEASURE height (h).</div>
                <div className="bg-white border-2 border-black p-2">3. DROP the ball.</div>
                <div className="bg-white border-2 border-black p-2">4. RECORD the result!</div>
               </div>
            </div>
          </div>
        </div>

        <div className="bg-black text-white p-6 border-4 border-black shadow-comic transform rotate-1">
          <h4 className="font-comic text-pop-pink text-2xl mb-2">SECRET FORMULA</h4>
          <p className="text-3xl font-comic text-white">
            h ≥ 2.5 × r
          </p>
          <p className="text-sm font-sans mt-2 text-gray-300">
            *Only applies in a frictionless vacuum (cartoon physics!)
          </p>
        </div>
      </div>

      {/* Right Col: Data Interface */}
      <div className="lg:col-span-8 space-y-8">
        {/* Input Card */}
        <div className="pop-card p-6 bg-white relative">
          <div className="absolute -top-5 left-5 bg-pop-pink border-4 border-black px-4 py-1 font-comic text-white text-xl transform rotate-2">
              DATA ENTRY
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mt-4">
            <div className="space-y-1">
              <label className="block font-comic text-lg">HEIGHT (h)</label>
              <input 
                type="number" 
                step="0.01" 
                className="w-full border-4 border-black p-3 text-xl font-bold font-sans focus:bg-pop-yellow focus:outline-none shadow-comic"
                placeholder="0.00"
                value={newHeight}
                onChange={(e) => setNewHeight(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="block font-comic text-lg">RADIUS (r)</label>
              <input 
                type="number" 
                step="0.01" 
                className="w-full border-4 border-black p-3 text-xl font-bold font-sans focus:bg-pop-yellow focus:outline-none shadow-comic"
                placeholder="0.00"
                value={newRadius}
                onChange={(e) => setNewRadius(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="block font-comic text-lg">OUTCOME</label>
              <div className="flex gap-2">
                <button 
                  onClick={() => setOutcome(true)}
                  className={`flex-1 py-3 font-comic text-lg border-4 border-black transition-all ${outcome ? 'bg-pop-lime shadow-comic -translate-y-1' : 'bg-white text-gray-400'}`}
                >
                  YES!
                </button>
                <button 
                  onClick={() => setOutcome(false)}
                  className={`flex-1 py-3 font-comic text-lg border-4 border-black transition-all ${!outcome ? 'bg-pop-pink text-white shadow-comic -translate-y-1' : 'bg-white text-gray-400'}`}
                >
                  NO!
                </button>
              </div>
            </div>
            <Button onClick={addRecord} disabled={!newHeight} className="h-[60px]" variant="secondary">
              <Plus className="w-6 h-6" /> SAVE
            </Button>
          </div>
        </div>

        {/* Data Grid */}
        <div className="border-4 border-black bg-white shadow-comic-lg">
          <table className="w-full text-left border-collapse">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-4 py-3 font-comic text-xl border-r-2 border-white">#</th>
                <th className="px-4 py-3 font-comic text-xl border-r-2 border-white">HEIGHT</th>
                <th className="px-4 py-3 font-comic text-xl border-r-2 border-white">RADIUS</th>
                <th className="px-4 py-3 font-comic text-xl border-r-2 border-white">RESULT</th>
                <th className="px-4 py-3 font-comic text-xl border-r-2 border-white">RATIO</th>
                <th className="px-4 py-3 font-comic text-xl">DEL</th>
              </tr>
            </thead>
            <tbody className="divide-y-4 divide-black font-sans font-bold">
              {records.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center bg-pop-yellow/20">
                    <span className="font-comic text-2xl text-black bg-white px-4 py-2 border-4 border-black shadow-comic inline-block transform -rotate-1">
                        NO DATA YET! START TESTING!
                    </span>
                  </td>
                </tr>
              ) : (
                records.map((record, index) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border-r-4 border-black">{records.length - index}</td>
                    <td className="px-4 py-3 border-r-4 border-black">{record.actualHeight.toFixed(2)}</td>
                    <td className="px-4 py-3 border-r-4 border-black">{record.radius.toFixed(2)}</td>
                    <td className="px-4 py-3 border-r-4 border-black">
                      {record.success ? (
                        <span className="bg-pop-lime border-2 border-black px-2 py-1 text-sm shadow-sm">PASS</span>
                      ) : (
                        <span className="bg-pop-pink text-white border-2 border-black px-2 py-1 text-sm shadow-sm">FAIL</span>
                      )}
                    </td>
                    <td className="px-4 py-3 border-r-4 border-black">
                       {(record.actualHeight / record.radius).toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => removeRecord(record.id)} className="text-black hover:text-pop-pink transition-transform hover:scale-110">
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Stats Grid */}
        {records.length > 0 && (
          <div className="grid grid-cols-2 gap-8">
             <div className="bg-white border-4 border-black p-4 flex flex-col justify-between h-32 shadow-comic relative overflow-hidden">
               <div className="absolute inset-0 bg-halftone opacity-10"></div>
               <span className="font-comic text-xl bg-pop-cyan inline-block px-2 border-2 border-black absolute top-4 left-4">BEST HEIGHT</span>
               <div className="text-5xl font-comic self-end relative z-10">{minSuccessfulHeight}m</div>
             </div>
             <div className="bg-pop-pink text-white border-4 border-black p-4 flex flex-col justify-between h-32 shadow-comic relative">
               <span className="font-comic text-xl bg-black text-white inline-block px-2 border-2 border-white absolute top-4 left-4">PHYSICS LIMIT</span>
               <div className="text-5xl font-comic self-end text-shadow-pop">{theoreticalMinHeight}m</div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperimentModule;