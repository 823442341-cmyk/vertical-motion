import React, { useState } from 'react';
import Button from '../Button';
import { ExperimentRecord } from '../../types';
import { Calculator, Activity, FileCode, AlertTriangle, Trash2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts';

const ConstructModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'guide' | 'lab'>('guide');
  
  const [calcRadius, setCalcRadius] = useState<string>('0.3');
  const minHeight = (parseFloat(calcRadius) * 2.5).toFixed(2);

  const [records, setRecords] = useState<ExperimentRecord[]>([]);
  const [inputH, setInputH] = useState('');
  const [inputR, setInputR] = useState('0.3');
  const [success, setSuccess] = useState(true);

  const addRecord = () => {
    if (!inputH || !inputR) return;
    const r = parseFloat(inputR);
    const h = parseFloat(inputH);
    const th = r * 2.5;

    const newRecord: ExperimentRecord = {
      id: Date.now().toString(),
      radius: r,
      actualHeight: h,
      theoryHeight: th,
      success,
      notes: ''
    };
    setRecords([newRecord, ...records]);
    setInputH('');
  };

  const chartData = records.map((r, i) => ({
    name: `#${records.length - i}`,
    Actual: r.actualHeight,
    Theory: r.theoryHeight,
  })).reverse();

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex bg-[#111] p-1 border border-gray-800 rounded-sm">
        <button 
          onClick={() => setActiveTab('guide')}
          className={`flex-1 py-2 font-hero uppercase tracking-widest text-sm transition-all ${activeTab === 'guide' ? 'bg-marvel-red text-white shadow-neon-red' : 'text-gray-500 hover:text-white'}`}
        >
          <FileCode className="w-4 h-4 inline mr-2" /> Protocol Manual
        </button>
        <button 
           onClick={() => setActiveTab('lab')}
           className={`flex-1 py-2 font-hero uppercase tracking-widest text-sm transition-all ${activeTab === 'lab' ? 'bg-hud-cyan text-black shadow-neon-blue' : 'text-gray-500 hover:text-white'}`}
        >
          <Activity className="w-4 h-4 inline mr-2" /> Lab Analytics
        </button>
      </div>

      {activeTab === 'guide' ? (
        <div className="grid md:grid-cols-2 gap-8 animate-slide-in">
          <div className="bg-[#151515] border border-gray-800 p-6 relative">
             <div className="absolute top-0 left-0 w-2 h-full bg-marvel-red"></div>
             <h3 className="font-hero text-2xl text-white mb-6 uppercase">Assembly Instructions</h3>
             <div className="space-y-6">
              {[
                "Secure start point at elevated position.",
                "Form circular loop with minimizing torsion.",
                "Anchor base to flat surface.",
                "Verify exit vector linearity.",
                "Initiate kinetic test."
              ].map((step, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="font-mono text-marvel-red font-bold">0{i+1}</div>
                  <p className="font-sans text-gray-300 group-hover:text-white transition-colors">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-marvel-gold/10 border border-marvel-gold p-6 text-marvel-gold">
             <div className="flex items-center gap-2 mb-4 font-hero text-xl uppercase">
                <AlertTriangle className="w-6 h-6" /> Diagnostics
             </div>
             <ul className="list-disc list-inside space-y-2 font-mono text-sm">
               <li>Check Apex Height parameters.</li>
               <li>Verify Structural Integrity (Taping).</li>
               <li>Analyze loop curvature (Circle vs Tear-drop).</li>
             </ul>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-12 gap-8 animate-slide-in">
          {/* Left: Data Input */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#151515] border border-hud-cyan/50 p-6 shadow-neon-blue relative overflow-hidden">
               <div className="absolute inset-0 bg-tech-grid opacity-10"></div>
              <h3 className="font-hero text-xl mb-4 flex items-center gap-2 text-hud-cyan relative z-10">
                <Calculator className="w-5 h-5" /> Variable Calc
              </h3>
              <div className="space-y-2 relative z-10">
                <label className="font-mono text-xs text-hud-cyan uppercase">Radius (m)</label>
                <input 
                  type="number" 
                  value={calcRadius} 
                  onChange={e => setCalcRadius(e.target.value)}
                  className="w-full bg-black border border-hud-cyan text-hud-cyan p-2 font-mono focus:outline-none focus:shadow-neon-blue transition-shadow"
                />
              </div>
              <div className="mt-6 border-t border-hud-cyan/30 pt-4 relative z-10">
                 <div className="text-xs font-mono text-gray-500 uppercase">Req. Min Height</div>
                 <div className="text-4xl font-hero text-white">{minHeight} <span className="text-sm text-gray-500">M</span></div>
              </div>
            </div>

            <div className="bg-[#151515] border border-gray-700 p-6">
               <h3 className="font-hero text-xl mb-4 text-white uppercase border-l-2 border-marvel-red pl-2">Data Logging</h3>
               <div className="grid grid-cols-2 gap-4 mb-4">
                 <div>
                   <label className="text-xs font-mono text-gray-500 block mb-1">RADIUS</label>
                   <input type="number" value={inputR} onChange={e => setInputR(e.target.value)} className="w-full bg-black border border-gray-600 text-white p-2 font-mono focus:border-white outline-none" />
                 </div>
                 <div>
                   <label className="text-xs font-mono text-gray-500 block mb-1">HEIGHT</label>
                   <input type="number" value={inputH} onChange={e => setInputH(e.target.value)} className="w-full bg-black border border-gray-600 text-white p-2 font-mono focus:border-white outline-none" />
                 </div>
               </div>
               <div className="flex gap-2 mb-4">
                  <button onClick={() => setSuccess(true)} className={`flex-1 py-2 font-hero tracking-widest text-sm border ${success ? 'bg-green-900/50 border-green-500 text-green-500' : 'bg-transparent border-gray-700 text-gray-700'}`}>SUCCESS</button>
                  <button onClick={() => setSuccess(false)} className={`flex-1 py-2 font-hero tracking-widest text-sm border ${!success ? 'bg-red-900/50 border-red-500 text-red-500' : 'bg-transparent border-gray-700 text-gray-700'}`}>FAIL</button>
               </div>
               <Button onClick={addRecord} className="w-full" variant="secondary">STORE DATA</Button>
            </div>
          </div>

          {/* Right: Charts */}
          <div className="lg:col-span-8 space-y-6">
             <div className="border border-gray-800 bg-black/50 p-4 h-64 relative">
                <div className="absolute top-2 right-2 text-xs font-mono text-gray-600">COMPARISON_MATRIX</div>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#666" tick={{fontFamily: 'Rajdhani'}} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#000', border: '1px solid #333', color: '#fff', fontFamily: 'Rajdhani' }} 
                        cursor={{fill: '#111'}}
                    />
                    <Bar dataKey="Actual" fill="#00F0FF" />
                    <Bar dataKey="Theory" fill="#FF00CC" />
                  </BarChart>
                </ResponsiveContainer>
             </div>

             <div className="bg-[#151515] border border-gray-800">
               <table className="w-full text-left">
                 <thead className="bg-[#222] text-gray-400 font-mono text-xs uppercase">
                   <tr>
                     <th className="p-3">ID</th>
                     <th className="p-3">Rad</th>
                     <th className="p-3">Hgt</th>
                     <th className="p-3">Stat</th>
                     <th className="p-3"></th>
                   </tr>
                 </thead>
                 <tbody className="font-sans text-sm text-gray-300">
                   {records.map((r, i) => (
                     <tr key={r.id} className="border-b border-gray-800 hover:bg-white/5">
                       <td className="p-3 font-mono text-xs text-gray-500">#{records.length - i}</td>
                       <td className="p-3">{r.radius}</td>
                       <td className="p-3">{r.actualHeight}</td>
                       <td className="p-3">
                         {r.success ? <span className="text-green-500">PASS</span> : <span className="text-red-500">FAIL</span>}
                       </td>
                       <td className="p-3 text-right">
                         <Trash2 onClick={() => setRecords(records.filter(rec => rec.id !== r.id))} className="w-4 h-4 text-gray-600 hover:text-red-500 cursor-pointer" />
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
               {records.length === 0 && <div className="p-8 text-center text-gray-600 font-mono text-xs uppercase">NO DATA STREAMS DETECTED</div>}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConstructModule;