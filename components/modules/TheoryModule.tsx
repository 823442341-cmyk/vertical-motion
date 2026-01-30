import React, { useState } from 'react';
import { ArrowRight, Star, Info } from 'lucide-react';
import { GRAVITY } from '../../constants';
import Button from '../Button';

const TheoryModule: React.FC = () => {
  const [demoRadius, setDemoRadius] = useState(2);
  const [selectedPoint, setSelectedPoint] = useState<'top' | 'bottom' | null>(null);

  // v_critical = sqrt(g * r)
  const criticalVelocity = Math.sqrt(GRAVITY * demoRadius).toFixed(2);

  return (
    <div className="space-y-12">
      <div className="relative py-4 border-b-4 border-black bg-pop-yellow shadow-comic">
        <div className="absolute inset-0 bg-halftone opacity-20"></div>
        <div className="relative z-10 text-center">
             <span className="inline-block bg-black text-white px-2 py-1 font-comic text-sm transform -rotate-2 absolute top-0 left-4">EPISODE 1</span>
            <h2 className="text-7xl md:text-9xl font-comic text-pop-pink text-shadow-pop transform -skew-x-6 leading-none mt-4">
            THE LOOP!
            </h2>
            <p className="text-2xl font-comic text-black bg-white inline-block px-4 py-1 border-2 border-black transform rotate-1 mt-2 shadow-comic">
            "Gravity vs. Centripetal Force!"
            </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Visualization Card */}
        <div className="pop-card p-0 overflow-hidden relative bg-white">
          <div className="bg-black text-white p-2 flex justify-between items-center border-b-4 border-black">
             <h3 className="font-comic text-2xl tracking-widest text-pop-cyan">PANEL 1: THE FORCES</h3>
             <Star className="fill-pop-yellow text-pop-yellow" />
          </div>
          
          <div className="relative h-[400px] bg-white flex items-center justify-center overflow-hidden">
             {/* Halftone BG */}
             <div className="absolute inset-0 bg-halftone-color opacity-50 bg-[size:10px_10px]"></div>

            {/* SVG Loop Diagram - Bold Outlines */}
            <svg viewBox="0 0 400 300" className="w-full h-full relative z-10">
              {/* Floor */}
              <rect x="0" y="290" width="400" height="10" fill="#000" />
              <pattern id="stripes" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                 <line stroke="#000" strokeWidth="2" y2="10"/>
              </pattern>
              <rect x="0" y="290" width="400" height="10" fill="url(#stripes)" opacity="0.5"/>

              {/* Track - Thick Outline */}
              <path d="M 50 250 L 100 250 Q 150 250 150 200 A 50 50 0 1 0 250 200 Q 250 250 350 250" 
                    fill="none" stroke="#000" strokeWidth="12" strokeLinecap="round" />
              <path d="M 50 250 L 100 250 Q 150 250 150 200 A 50 50 0 1 0 250 200 Q 250 250 350 250" 
                    fill="none" stroke="#00FFFF" strokeWidth="6" strokeLinecap="round" />
              
              {/* Hotspot Top - Star shape */}
              <g 
                className="cursor-pointer hover:scale-125 transition-transform origin-center" 
                onClick={() => setSelectedPoint('top')}
              >
                <path d="M200 135 L205 145 L215 145 L207 152 L210 162 L200 155 L190 162 L193 152 L185 145 L195 145 Z" fill="#F87171" stroke="black" strokeWidth="2" />
                <text x="200" y="130" textAnchor="middle" fill="black" fontSize="14" fontWeight="bold" fontFamily="Comic Neue" className="bg-white">CLICK!</text>
              </g>

              {/* Hotspot Bottom */}
              <g 
                className="cursor-pointer hover:scale-125 transition-transform origin-center" 
                onClick={() => setSelectedPoint('bottom')}
              >
                 <path d="M200 235 L205 245 L215 245 L207 252 L210 262 L200 255 L190 262 L193 252 L185 245 L195 245 Z" fill="#F87171" stroke="black" strokeWidth="2" />
                 <text x="200" y="285" textAnchor="middle" fill="black" fontSize="14" fontWeight="bold" fontFamily="Comic Neue">CLICK!</text>
              </g>

              {/* Force Vectors - Comic Arrows */}
              {selectedPoint === 'top' && (
                <g>
                  {/* Gravity */}
                  <line x1="200" y1="150" x2="200" y2="190" stroke="black" strokeWidth="6" markerEnd="url(#arrow-black)" />
                  <rect x="205" y="170" width="30" height="20" fill="white" stroke="black" strokeWidth="2" />
                  <text x="220" y="185" textAnchor="middle" fill="black" fontSize="14" fontWeight="bold" fontFamily="Comic Neue">mg</text>
                  
                  {/* Normal */}
                  <line x1="192" y1="150" x2="192" y2="175" stroke="#F87171" strokeWidth="6" markerEnd="url(#arrow-pink)" />
                  <text x="175" y="170" fill="black" fontSize="14" fontWeight="bold" fontFamily="Comic Neue" className="bg-white px-1">N</text>
                </g>
              )}
              
              {selectedPoint === 'bottom' && (
                <g>
                   {/* Gravity */}
                  <line x1="200" y1="250" x2="200" y2="290" stroke="black" strokeWidth="6" markerEnd="url(#arrow-black)" />
                  <rect x="205" y="270" width="30" height="20" fill="white" stroke="black" strokeWidth="2" />
                  <text x="220" y="285" textAnchor="middle" fill="black" fontSize="14" fontWeight="bold" fontFamily="Comic Neue">mg</text>
                  
                  {/* Normal */}
                  <line x1="192" y1="250" x2="192" y2="180" stroke="#F87171" strokeWidth="6" markerEnd="url(#arrow-pink)" />
                  <text x="175" y="200" fill="black" fontSize="14" fontWeight="bold" fontFamily="Comic Neue" className="bg-white px-1">N</text>
                </g>
              )}

              <defs>
                <marker id="arrow-black" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L9,3 z" fill="black" />
                </marker>
                <marker id="arrow-pink" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L9,3 z" fill="#F87171" stroke="black" strokeWidth="1" />
                </marker>
              </defs>
            </svg>
          </div>
          <div className="p-6 bg-pop-cyan border-t-4 border-black relative">
             <div className="absolute top-[-20px] left-6 bg-white border-4 border-black px-4 py-1 font-comic text-xl transform -rotate-3">
                 NARRATOR:
             </div>
            <p className="text-black text-lg font-bold font-sans leading-tight bg-white p-4 border-4 border-black shadow-comic">
              {selectedPoint === 'top' 
                ? "AT THE APEX! Gravity and the Track team up to push DOWN! It's a double whammy!" 
                : selectedPoint === 'bottom' 
                ? "AT THE BOTTOM! The track fights back! It pushes UP hard to beat Gravity!"
                : "CLICK THE STARS TO REVEAL THE SECRET FORCES!"}
            </p>
          </div>
        </div>

        {/* Controls & Math */}
        <div className="space-y-8">
          <div className="pop-card p-6 bg-pop-yellow relative">
             {/* Halftone overlay */}
             <div className="absolute inset-0 bg-halftone opacity-10 pointer-events-none"></div>
             
             <div className="absolute -top-6 -right-6 w-24 h-24 bg-pop-pink rounded-full border-4 border-black flex items-center justify-center animate-shake z-10">
                 <span className="font-comic text-white text-xl text-center leading-none">TWEAK<br/>IT!</span>
             </div>

            <h3 className="text-4xl font-comic text-black mb-6 text-shadow-white transform -rotate-1">
              THE SETUP
            </h3>
            
            <div className="space-y-8 relative z-0">
              <div className="space-y-2">
                <label className="block text-xl font-comic bg-black text-white inline-block px-2 transform rotate-1">
                  RADIUS (r)
                </label>
                <div className="flex items-center gap-0 border-4 border-black bg-white shadow-comic">
                  <input 
                    type="range" 
                    min="0.5" 
                    max="5" 
                    step="0.1" 
                    value={demoRadius}
                    onChange={(e) => setDemoRadius(parseFloat(e.target.value))}
                    className="flex-1 h-12 appearance-none bg-white cursor-pointer px-4 accent-pop-pink"
                  />
                  <div className="bg-pop-pink text-white h-12 flex items-center justify-center px-4 font-comic text-2xl border-l-4 border-black min-w-[100px]">
                    {demoRadius}m
                  </div>
                </div>
              </div>

              <div className="border-4 border-black bg-white p-4 shadow-comic relative">
                <div className="absolute -top-3 left-4 bg-pop-cyan border-2 border-black px-2 font-bold text-xs">
                    FORMULA CARD
                </div>
                <div className="flex justify-between items-end">
                    <div>
                        <div className="text-xs font-bold uppercase mb-1">Critical Velocity</div>
                        <div className="text-6xl font-comic text-pop-pink text-shadow-pop">
                        {criticalVelocity}
                        </div>
                    </div>
                    <div className="text-3xl font-comic text-gray-400">
                        m/s
                    </div>
                </div>
                <div className="mt-2 text-right font-comic text-xl bg-pop-yellow inline-block px-2 border-2 border-black transform rotate-2">
                   v = √(gr)
                </div>
              </div>
            </div>
          </div>

          <div className="pop-card p-6 bg-white border-dashed">
             <h4 className="font-comic text-3xl mb-4 bg-black text-white inline-block px-2">YOUR MISSION</h4>
             <p className="font-sans font-bold text-lg mb-6 leading-relaxed">
               "A 500kg cart is barrelling towards the loop! Energy is vanishing due to friction! WE NEED THE NUMBERS!"
             </p>
             <Button 
                variant="primary"
                onClick={() => document.getElementById('ai-tutor-trigger')?.click()}
                className="w-full text-2xl"
             >
               HELP ME, POP-BOT!
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheoryModule;