
import React from 'react';
import { AppMode } from '../types';

interface SidebarProps {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentMode, setMode }) => {
  const menuItems = [
    { mode: AppMode.HOME, icon: '🏠', label: 'Dashboard' },
    { mode: AppMode.VOCABULARY, icon: '📖', label: 'Vocabulary' },
    { mode: AppMode.CHAT, icon: '💬', label: 'Text Practice' },
    { mode: AppMode.LIVE, icon: '🎙️', label: 'Voice Practice' },
    { mode: AppMode.PROGRESS, icon: '📈', label: 'My Progress' },
  ];

  return (
    <aside className="hidden lg:flex w-72 bg-white border-r border-pink-50 flex-col p-8 shadow-sm">
      <div className="space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setMode(item.mode)}
            className={`w-full flex items-center gap-4 px-6 py-5 rounded-[22px] text-sm font-bold transition-all duration-300 ${
              currentMode === item.mode
                ? 'asya-pink-gradient text-white shadow-xl shadow-pink-200 scale-[1.03]'
                : 'text-slate-400 hover:bg-pink-50/50 hover:text-pink-500'
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-auto">
        <div className="bg-gradient-to-br from-pink-500 to-rose-400 rounded-[30px] p-6 text-white shadow-xl shadow-pink-100 relative overflow-hidden group">
          {/* Elemen dekoratif abstrak */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          
          <h4 className="font-black text-sm mb-1 flex items-center gap-2 relative z-10">
             Weekly Goal 🎀
          </h4>
          <p className="text-[10px] opacity-80 mb-4 font-bold tracking-wide relative z-10">85% COMPLETE</p>
          
          <div className="w-full h-3 bg-black/10 rounded-full overflow-hidden relative z-10 p-[2px]">
            <div className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" style={{ width: '85%' }}></div>
          </div>
          
          <button className="mt-5 w-full bg-white text-pink-500 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-pink-50 transition-colors relative z-10">
            Keep Going!
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
