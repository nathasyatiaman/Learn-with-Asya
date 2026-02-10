
import React, { useState } from 'react';
import { AppMode } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import ChatAsya from './components/ChatAsya';
import LiveAsya from './components/LiveAsya';
import VocabularyModule from './components/VocabularyModule';
import ProgressTracker from './components/ProgressTracker';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.HOME);

  const renderContent = () => {
    switch (mode) {
      case AppMode.CHAT:
        return <ChatAsya />;
      case AppMode.LIVE:
        return <LiveAsya />;
      case AppMode.VOCABULARY:
        return <VocabularyModule />;
      case AppMode.PROGRESS:
        return <ProgressTracker />;
      case AppMode.HOME:
      default:
        return <Hero onStart={(newMode) => setMode(newMode)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fffafb] text-slate-800 safe-bottom overflow-x-hidden">
      <Header currentMode={mode} setMode={setMode} />
      <div className="flex-1 flex overflow-hidden relative">
        <Sidebar currentMode={mode} setMode={setMode} />
        <main className="flex-1 relative overflow-y-auto overflow-x-hidden pb-24 lg:pb-0">
          <div className="w-full max-w-full">
            {renderContent()}
          </div>
        </main>
      </div>
      <BottomNav currentMode={mode} setMode={setMode} />
    </div>
  );
};

export default App;
