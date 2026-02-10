
import React from 'react';
import { AppMode } from '../types';

interface BottomNavProps {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentMode, setMode }) => {
  const menuItems = [
    { mode: AppMode.HOME, icon: '🏠', label: 'Home' },
    { mode: AppMode.VOCABULARY, icon: '📖', label: 'Vocab' },
    { mode: AppMode.CHAT, icon: '💬', label: 'Chat' },
    { mode: AppMode.LIVE, icon: '🎙️', label: 'Voice' },
    { mode: AppMode.PROGRESS, icon: '📈', label: 'Stats' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-pink-100 px-4 py-2 flex justify-between items-center z-50 shadow-[0_-4px_20px_rgba(244,114,182,0.1)]">
      {menuItems.map((item) => (
        <button
          key={item.label}
          onClick={() => setMode(item.mode)}
          className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all duration-300 ${
            currentMode === item.mode
              ? 'text-pink-500 scale-110'
              : 'text-slate-400'
          }`}
        >
          <span className="text-2xl">{item.icon}</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
          {currentMode === item.mode && (
            <div className="w-1 h-1 bg-pink-500 rounded-full animate-pulse"></div>
          )}
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
