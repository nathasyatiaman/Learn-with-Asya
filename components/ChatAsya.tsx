
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Message } from '../types';
import AsyaAvatar from './AsyaAvatar';

const ChatAsya: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'asya',
      text: "Halo! Aku Asya. Siap buat latihan Bahasa Inggris hari ini? ❤️ Jangan malu-malu ya, aku bakal bantu kamu jadi lebih lancar! ✨",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = { role: 'user', text: inputValue, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: 'user', parts: [{ text: `You are Asya, a sweet and encouraging English tutor. Reply to: "${inputValue}". Be helpful, correct any grammar mistakes kindly, and use emojis like 🎀, ❤️, ✨.` }] }],
        config: { systemInstruction: "You are Asya, a friendly AI English tutor. Always be encouraging and sweet." }
      });
      setMessages(prev => [...prev, { role: 'asya', text: response.text || "Oops, something went wrong. Try again! ❤️", timestamp: new Date() }]);
    } catch (error) {
      console.error(error);
    } finally { setIsTyping(false); }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto bg-white lg:border-x border-pink-50 shadow-sm relative overflow-hidden">
      <div className="p-4 border-b border-pink-50 bg-white/80 backdrop-blur-md flex items-center gap-3 sticky top-0 z-20 w-full">
        <AsyaAvatar size="sm" />
        <div>
          <h2 className="font-bold text-slate-800 text-sm sm:text-lg">Chatting with Asya</h2>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse"></span>
            <span className="text-[10px] font-bold text-pink-500 uppercase tracking-widest">Online</span>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-white w-full">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
              msg.role === 'user' 
                ? 'asya-pink-gradient text-white rounded-tr-none' 
                : 'bg-pink-50 text-slate-800 rounded-tl-none border border-pink-100'
            }`}>
              <p className="text-sm sm:text-base whitespace-pre-wrap font-medium break-words">{msg.text}</p>
              <p className={`text-[8px] mt-2 font-bold opacity-50`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-pink-50 p-3 rounded-2xl rounded-tl-none border border-pink-100 flex gap-1 shadow-sm">
              <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce delay-75"></div>
              <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-pink-50 z-20 w-full">
        <form onSubmit={handleSendMessage} className="flex gap-2 items-center w-full">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ketik pesan... ❤️"
            className="flex-1 px-4 py-3 rounded-xl border-2 border-pink-50 focus:outline-none focus:border-pink-300 transition-all font-medium text-sm shadow-inner min-w-0"
          />
          <button 
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="w-10 h-10 flex-shrink-0 rounded-xl asya-pink-gradient text-white flex items-center justify-center disabled:opacity-50 shadow-lg active:scale-90 transition-all"
          >
            ✈️
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatAsya;
