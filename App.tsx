import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import ProposalModule from './components/modules/Proposal';
import ConstructionModule from './components/modules/Construction';
import SimulationModule from './components/modules/SimulationModule';
import ShowcaseModule from './components/modules/Showcase';
import AiTutor from './components/AiTutor';
import { ModuleType } from './types';

const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<ModuleType>(ModuleType.PROPOSAL);

  const renderModule = () => {
    switch (currentModule) {
      case ModuleType.PROPOSAL:
        return <ProposalModule setModule={setCurrentModule} />;
      case ModuleType.CONSTRUCTION:
        return <ConstructionModule />;
      case ModuleType.SIMULATION:
        return <SimulationModule />;
      case ModuleType.SHOWCASE:
        return <ShowcaseModule />;
      default:
        return <ProposalModule setModule={setCurrentModule} />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F0F7FF]">
      {/* Background Decor - Blue/Yellow Geometry */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-halftone"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-pop-blue rounded-full border-4 border-black"></div>
        <div className="absolute bottom-40 right-10 w-48 h-48 bg-pop-yellow rotate-12 border-4 border-black"></div>
        <div className="absolute top-1/3 right-1/4 w-0 h-0 border-l-[50px] border-l-transparent border-t-[75px] border-t-pop-blue border-r-[50px] border-r-transparent rotate-45"></div>
        <div className="absolute bottom-10 left-10 w-full h-10 bg-zigzag bg-[length:40px_40px] opacity-50"></div>
      </div>
      
      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col h-screen">
        <Navbar currentModule={currentModule} setModule={setCurrentModule} />
        
        {/* Full screen scroller with hidden scrollbar */}
        <main className="flex-1 w-full overflow-y-auto no-scrollbar">
          <div className="max-w-7xl mx-auto py-8 px-4 pb-20 animate-slide-in">
            {renderModule()}
          </div>
        </main>
      </div>

      <AiTutor />
      
      {/* Hidden button for programmatic tutor access */}
      <button id="ai-tutor-trigger" className="hidden" onClick={() => {}} />
    </div>
  );
};

export default App;