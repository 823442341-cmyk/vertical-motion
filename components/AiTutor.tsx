import React, { useState } from 'react';
import { Cpu, X, Zap } from 'lucide-react';
import { askAiTutor } from '../services/geminiService';

const AiTutor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setResponse(null);
    const answer = await askAiTutor(query, "The student is using a Memphis/Pop Art style Physics app. Adopt a fun, energetic, slightly quirky persona. Use Emojis. Be concise and helpful.");
    setResponse(answer);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none font-sans">
      {isOpen && (
        <div className="mb-4 w-96 bg-white border-4 border-black p-0 shadow-[8px_8px_0px_0px_#000] pointer-events-auto flex flex-col relative animate-slide-in origin-bottom-right">
          
          {/* Header */}
          <div className="bg-pop-blue border-b-4 border-black p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-black text-white p-1 rounded-full">
                 <Zap className="w-4 h-4" />
              </div>
              <span className="font-comic text-xl uppercase text-white">BRAIN BOT</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:scale-125 transition-transform">
              <X className="w-6 h-6 stroke-[3px]" />
            </button>
          </div>
          
          {/* Content Area */}
          <div className="min-h-[200px] max-h-[400px] overflow-y-auto p-4 bg-white relative">
             <div className="absolute inset-0 bg-halftone opacity-10 pointer-events-none"></div>

             {!response && !isLoading && (
               <div className="text-center mt-12 space-y-4">
                 <div className="w-20 h-20 bg-pop-yellow rounded-full border-4 border-black mx-auto flex items-center justify-center animate-bounce-slow">
                    <span className="text-4xl">🤔</span>
                 </div>
                 <p className="font-comic text-xl bg-black text-white inline-block px-2 transform -rotate-2">
                   ASK ME ANYTHING!
                 </p>
               </div>
             )}
             
             {isLoading && (
               <div className="flex justify-center items-center h-full gap-2">
                 <span className="font-comic text-xl animate-pulse">THINKING HARD...</span>
               </div>
             )}

             {response && (
               <div className="space-y-4">
                  <div className="text-right">
                    <span className="bg-gray-100 border-2 border-black px-3 py-2 inline-block rounded-tl-xl rounded-bl-xl rounded-br-xl shadow-[2px_2px_0px_#000] font-bold">
                        {query}
                    </span>
                  </div>
                  
                  <div className="flex gap-3 items-end">
                    <div className="w-8 h-8 bg-black rounded-full flex-shrink-0"></div>
                    <div className="bg-pop-sky border-2 border-black p-3 rounded-tr-xl rounded-tl-xl rounded-br-xl shadow-[4px_4px_0px_#000] relative">
                        <div className="text-black font-bold leading-relaxed text-sm">
                            {response}
                        </div>
                    </div>
                  </div>
               </div>
             )}
          </div>

          <div className="flex gap-0 border-t-4 border-black bg-pop-yellow p-2">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              placeholder="TYPE HERE..."
              className="flex-1 bg-white border-2 border-black px-3 font-comic text-lg focus:outline-none focus:shadow-comic transition-shadow uppercase placeholder:normal-case"
            />
            <button 
              onClick={handleAsk} 
              disabled={isLoading || !query.trim()}
              className="ml-2 bg-black text-white px-4 font-comic text-xl hover:bg-gray-800 disabled:opacity-50"
            >
              GO
            </button>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto mb-2 mr-2 w-20 h-20 bg-pop-blue border-4 border-black shadow-[6px_6px_0px_0px_#000] rounded-full flex items-center justify-center hover:scale-110 transition-transform group"
      >
        <Zap className="w-10 h-10 text-white fill-white group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
};

export default AiTutor;