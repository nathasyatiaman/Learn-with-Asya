
import React from 'react';
import { AppMode } from '../types';
import AsyaAvatar from './AsyaAvatar';

interface HeroProps {
  onStart: (mode: AppMode) => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 md:py-20 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-20">
        
        {/* Konten Visual Asya (Atas di Mobile) */}
        <div className="relative order-1 lg:order-2 flex-1 flex justify-center items-center py-4">
          <div className="relative transform scale-110 md:scale-125">
            <AsyaAvatar size="xl" fullBody isAnimated />
            
            {/* Bubble Pesan mungil */}
            <div className="absolute -right-4 top-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl rounded-bl-none shadow-lg border border-pink-100 max-w-[120px] animate-float hidden sm:block">
              <p className="text-[10px] font-bold text-pink-600 italic leading-tight">
                "Let's practice English together! ❤️"
              </p>
            </div>
            
            {/* Tag Nama */}
            <div className="absolute -left-6 bottom-12 asya-pink-gradient px-3 py-1.5 rounded-full text-white font-black text-[9px] shadow-lg flex items-center gap-1.5">
               <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
               HI, I'M ASYA! 🎀
            </div>
          </div>
        </div>

        {/* Konten Teks */}
        <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 text-pink-600 text-[10px] font-black mb-6 shadow-sm border border-pink-100 uppercase tracking-widest">
            ✨ Your Sweet Language Companion
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
            Belajar Inggris <br />
            Makin <span className="text-transparent bg-clip-text asya-pink-gradient">Manis</span> bareng Asya!
          </h1>
          
          <p className="text-base sm:text-lg text-slate-500 mb-10 leading-relaxed font-medium max-w-lg mx-auto lg:mx-0">
            Halo! Aku Asya. Siap bantuin kamu lancar ngobrol bahasa Inggris dengan cara yang asyik dan penuh semangat! Yuk mulai sekarang! 🫰
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button 
              onClick={() => onStart(AppMode.LIVE)}
              className="px-8 py-4 rounded-2xl asya-pink-gradient text-white font-black text-lg shadow-[0_10px_20px_-5px_rgba(244,114,182,0.4)] hover:scale-105 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              🎙️ Ngobrol Yuk!
            </button>
            <button 
              onClick={() => onStart(AppMode.VOCABULARY)}
              className="px-8 py-4 rounded-2xl bg-white text-pink-500 border-2 border-pink-50 font-black text-lg hover:border-pink-200 transition-all shadow-sm"
            >
              📖 Cek Materi
            </button>
          </div>
          
          <div className="mt-12 pt-6 border-t border-pink-50 flex flex-col items-center lg:items-start gap-4">
             <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Teman Belajar Terfavorit</div>
             <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white shadow-sm overflow-hidden bg-pink-50">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Learner${i+10}`} className="w-full h-full" alt="User" />
                  </div>
                ))}
                <div className="w-9 h-9 rounded-full border-2 border-white shadow-sm bg-pink-500 flex items-center justify-center text-white font-black text-[8px] z-10">+50k</div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
