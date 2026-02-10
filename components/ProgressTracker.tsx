
import React from 'react';
import AsyaAvatar from './AsyaAvatar';

const ProgressTracker: React.FC = () => {
  const stats = [
    { label: 'Words Learned', value: '452', icon: '📚', color: 'bg-pink-100 text-pink-600' },
    { label: 'Conversations', value: '28', icon: '💬', color: 'bg-rose-100 text-rose-600' },
    { label: 'Grammar Accuracy', value: '92%', icon: '🎯', color: 'bg-pink-100 text-pink-600' },
    { label: 'Fluency Level', value: 'B2', icon: '⚡', color: 'bg-rose-100 text-rose-600' },
  ];

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-[40px] shadow-sm border border-pink-50">
        <AsyaAvatar size="lg" isAnimated />
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">You're doing amazing!</h2>
          <p className="text-slate-500 mb-4 max-w-lg">
            Asya has analyzed your recent sessions. Your speaking confidence has increased by <span className="text-pink-500 font-bold">15%</span> this week. Let's keep the momentum going!
          </p>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
             <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold border border-green-100">Strong Vocabulary</span>
             <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100">Fluent Pacing</span>
             <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-bold border border-amber-100">Needs Tense Practice</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl shadow-sm border border-pink-50 flex flex-col items-center text-center transition-transform hover:scale-105 cursor-default">
            <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center text-2xl mb-4 shadow-sm`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-black text-slate-800">{stat.value}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-pink-50">
          <h3 className="text-xl font-bold mb-6 text-slate-800">Weekly Activity</h3>
          <div className="flex items-end justify-between h-48 gap-2">
            {[40, 70, 45, 90, 65, 80, 50].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full asya-pink-gradient rounded-t-xl transition-all duration-1000 shadow-lg" 
                  style={{ height: `${val}%` }}
                ></div>
                <span className="text-[10px] font-bold text-slate-400 mt-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-pink-50">
          <h3 className="text-xl font-bold mb-6 text-slate-800">Recent Scenarios</h3>
          <div className="space-y-4">
            {[
              { title: 'Ordering Coffee', score: 95, color: 'bg-amber-400' },
              { title: 'Airport Check-in', score: 82, color: 'bg-blue-400' },
              { title: 'Job Interview', score: 78, color: 'bg-emerald-400' },
              { title: 'Introducing Myself', score: 100, color: 'bg-pink-500' },
            ].map((scene) => (
              <div key={scene.title} className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${scene.color}`}></div>
                <div className="flex-1 text-sm font-semibold text-slate-700">{scene.title}</div>
                <div className="text-sm font-bold text-pink-500">{scene.score}%</div>
                <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                   <div className={`h-full ${scene.color}`} style={{ width: `${scene.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-4 rounded-2xl border-2 border-pink-100 text-pink-500 font-bold text-sm hover:bg-pink-50 transition-colors">
            View Full Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
