
import React from 'react';
import { AppMode } from '../types';

interface HeaderProps {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
}

const Header: React.FC<HeaderProps> = ({ currentMode, setMode }) => {
  return (
    <header className="h-20 bg-white border-b border-pink-100 flex items-center justify-between px-6 md:px-10 sticky top-0 z-50">
      <div 
        className="flex items-center gap-3 cursor-pointer group" 
        onClick={() => setMode(AppMode.HOME)}
      >
        <div className="w-12 h-12 rounded-2xl asya-pink-gradient flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-105 transition-transform">
          A
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-slate-800">
            Learn with <span className="text-pink-500">Asya</span>
          </span>
          <span className="text-[10px] font-bold text-pink-400 tracking-widest uppercase">Your AI English Tutor</span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <div className="flex items-center gap-3 bg-pink-50 px-4 py-2 rounded-full border border-pink-100">
           <span className="text-sm font-bold text-pink-600">🔥 14 DAY STREAK</span>
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-pink-200 overflow-hidden shadow-sm">
           <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=User&skinColor=edb98a&topType=shortHair" alt="User" />
        </div>
      </div>
    </header>
  );
};

export default Header;
