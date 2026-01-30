import React from 'react';
import { Rocket, Hammer, Cpu, Users, FileText, Zap } from 'lucide-react';
import { ModuleType } from '../../types';

interface NavbarProps {
  currentModule: ModuleType;
  setModule: (m: ModuleType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentModule, setModule }) => {
  const navItems = [
    { id: ModuleType.PROPOSAL, label: 'THE PLAN', icon: FileText, color: 'bg-pop-blue text-white' },
    { id: ModuleType.CONSTRUCTION, label: 'BUILD IT', icon: Hammer, color: 'bg-pop-yellow text-black' },
    { id: ModuleType.SIMULATION, label: 'TEST IT', icon: Cpu, color: 'bg-pop-sky text-black' },
    { id: ModuleType.SHOWCASE, label: 'SHOW OFF', icon: Users, color: 'bg-white text-black' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white border-b-4 border-black px-4 py-3 shadow-comic relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center h-auto md:h-16 gap-4">
        
        {/* Logo Section */}
        <div 
          className="flex items-center gap-2 cursor-pointer group transform hover:-rotate-2 transition-transform" 
          onClick={() => setModule(ModuleType.PROPOSAL)}
        >
          <div className="bg-pop-blue text-white p-2 border-2 border-black shadow-[4px_4px_0px_#FFD600]">
             <Zap className="w-6 h-6 fill-pop-yellow text-pop-yellow" />
          </div>
          <h1 className="text-4xl font-comic tracking-wider text-black">
            MECHANICS <span className="text-pop-blue">PBL</span>
          </h1>
        </div>
        
        {/* Nav Items */}
        <div className="flex flex-wrap justify-center gap-4">
          {navItems.map((item) => {
            const isActive = currentModule === item.id;
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => setModule(item.id)}
                className={`
                  relative px-6 py-2 font-comic text-lg border-4 border-black transition-all duration-200
                  flex items-center gap-2 uppercase tracking-wide
                  ${isActive 
                    ? `${item.color} shadow-comic translate-x-[-2px] translate-y-[-2px]` 
                    : 'bg-white hover:bg-gray-100 hover:shadow-comic-hover'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'fill-current' : 'text-gray-800'}`} />
                <span>{item.label}</span>
                
                {/* Decorative dot for active state */}
                {isActive && (
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-black rounded-full border-2 border-white"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;