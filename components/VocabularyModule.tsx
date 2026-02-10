
import React, { useState } from 'react';
import { VocabItem } from '../types';
import AsyaAvatar from './AsyaAvatar';

const MOCK_VOCAB: VocabItem[] = [
  { word: 'Pragmatic', translation: 'Praktis', definition: 'Dealing with things sensibly and realistically.', example: 'He made a pragmatic decision to save time.', scenario: 'Professional' },
  { word: 'Coherent', translation: 'Koheren/Masuk Akal', definition: 'Logical and consistent.', example: 'She gave a coherent account of the events.', scenario: 'Professional' },
  { word: 'Appetizer', translation: 'Makanan Pembuka', definition: 'A small dish of food or a drink taken before a meal or the main course.', example: 'Would you like an appetizer before your steak?', scenario: 'Restaurant' },
  { word: 'Gourmet', translation: 'Hidangan Mewah', definition: 'Of very high quality food.', example: 'They serve gourmet coffee here.', scenario: 'Restaurant' },
];

const VocabularyModule: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [view, setView] = useState<'SCENARIOS' | 'FLASHCARDS' | 'QUIZ'>('SCENARIOS');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);

  const filteredVocab = selectedScenario 
    ? MOCK_VOCAB.filter(v => v.scenario === selectedScenario)
    : MOCK_VOCAB;

  const renderScenarios = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {['Restaurant', 'Professional', 'Travel', 'Daily Life', 'Socializing'].map(s => (
        <button 
          key={s}
          onClick={() => { setSelectedScenario(s); setView('FLASHCARDS'); }}
          className="bg-white p-8 rounded-[32px] shadow-sm border border-pink-50 hover:border-pink-300 hover:scale-[1.03] transition-all group"
        >
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
            {s === 'Restaurant' ? '🍴' : s === 'Professional' ? '💼' : s === 'Travel' ? '✈️' : s === 'Daily Life' ? '🏠' : '👋'}
          </div>
          <h3 className="text-xl font-bold text-slate-800">{s}</h3>
          <p className="text-sm text-slate-400 mt-2 font-medium">15 new words today</p>
        </button>
      ))}
    </div>
  );

  const renderFlashcards = () => {
    const item = filteredVocab[currentIdx] || filteredVocab[0];
    return (
      <div className="max-w-xl mx-auto space-y-8">
        <div className="bg-white p-12 rounded-[48px] shadow-xl border border-pink-100 text-center asya-glow min-h-[400px] flex flex-col justify-center animate-float">
          <div className="text-pink-400 font-bold uppercase tracking-widest text-xs mb-4">Vocabulary Word</div>
          <h2 className="text-5xl font-black text-slate-800 mb-2">{item.word}</h2>
          <p className="text-2xl text-pink-500 font-bold italic mb-8">"{item.translation}"</p>
          <div className="p-6 bg-pink-50 rounded-3xl border border-pink-100 mb-6">
            <p className="text-slate-600 leading-relaxed font-medium">{item.definition}</p>
          </div>
          <p className="text-slate-400 italic">Example: "{item.example}"</p>
        </div>
        
        <div className="flex justify-between items-center px-4">
          <button 
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(prev => prev - 1)}
            className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-xl disabled:opacity-30 active:scale-90 transition-all border border-pink-50"
          >
            ⬅️
          </button>
          <button 
            onClick={() => setView('QUIZ')}
            className="px-8 py-4 asya-pink-gradient text-white font-bold rounded-2xl shadow-lg hover:scale-105 transition-all"
          >
            Start Quiz!
          </button>
          <button 
            disabled={currentIdx === filteredVocab.length - 1}
            onClick={() => setCurrentIdx(prev => prev + 1)}
            className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-xl disabled:opacity-30 active:scale-90 transition-all border border-pink-50"
          >
            ➡️
          </button>
        </div>
      </div>
    );
  };

  const renderQuiz = () => {
     // Simple quiz logic for demo
     const item = filteredVocab[0];
     return (
       <div className="max-w-2xl mx-auto bg-white p-10 rounded-[40px] shadow-xl border border-pink-50">
          <div className="flex items-center gap-4 mb-8">
             <AsyaAvatar size="sm" />
             <p className="font-bold text-slate-700">"Can you match the correct meaning for this word?"</p>
          </div>
          <h3 className="text-4xl font-black text-center mb-10 text-pink-500">{item.word}</h3>
          <div className="space-y-4">
            {[item.translation, 'Wrong Meaning 1', 'Something Else', 'I dont know'].map((opt, i) => (
              <button 
                key={i}
                onClick={() => { setScore(s => s + (opt === item.translation ? 1 : 0)); alert(opt === item.translation ? 'Correct! 🌟' : 'Not quite! Try again.'); setView('SCENARIOS'); }}
                className="w-full py-5 rounded-2xl border-2 border-pink-50 hover:border-pink-300 hover:bg-pink-50 text-left px-8 font-bold transition-all text-slate-700"
              >
                {opt}
              </button>
            ))}
          </div>
       </div>
     );
  };

  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-800 mb-2">Build Your <span className="text-pink-500">Vocabulary</span></h1>
          <p className="text-slate-500 font-medium">Master context-specific words with Asya's specialized drills.</p>
        </div>
        {view !== 'SCENARIOS' && (
          <button onClick={() => setView('SCENARIOS')} className="text-pink-500 font-bold flex items-center gap-2 hover:underline">
            Back to Topics
          </button>
        )}
      </div>

      {view === 'SCENARIOS' && renderScenarios()}
      {view === 'FLASHCARDS' && renderFlashcards()}
      {view === 'QUIZ' && renderQuiz()}
    </div>
  );
};

export default VocabularyModule;
