
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { decode, decodeAudioData, float32ToInt16Blob } from '../utils/audioUtils';
import AsyaAvatar from './AsyaAvatar';

const LiveAsya: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'listening' | 'speaking'>('idle');
  const [transcriptions, setTranscriptions] = useState<string[]>([]);
  
  const audioContextInputRef = useRef<AudioContext | null>(null);
  const audioContextOutputRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef<number>(0);
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const streamRef = useRef<MediaStream | null>(null);

  const cleanup = useCallback(() => {
    if (sessionRef.current) sessionRef.current = null;
    if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
    if (audioContextInputRef.current) { audioContextInputRef.current.close(); audioContextInputRef.current = null; }
    if (audioContextOutputRef.current) { audioContextOutputRef.current.close(); audioContextOutputRef.current = null; }
    activeSourcesRef.current.forEach(s => s.stop());
    activeSourcesRef.current.clear();
    setIsActive(false);
    setStatus('idle');
  }, []);

  const toggleSession = async () => {
    if (isActive) { cleanup(); return; }

    try {
      setStatus('connecting');
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      audioContextInputRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      audioContextOutputRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsActive(true); setStatus('listening');
            const source = audioContextInputRef.current!.createMediaStreamSource(streamRef.current!);
            const scriptProcessor = audioContextInputRef.current!.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              if (sessionRef.current) {
                const inputData = e.inputBuffer.getChannelData(0);
                sessionRef.current.sendRealtimeInput({ media: float32ToInt16Blob(inputData) });
              }
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextInputRef.current!.destination);
          },
          onmessage: async (message) => {
            if (message.serverContent?.modelTurn?.parts[0]?.inlineData?.data) {
              setStatus('speaking');
              const buffer = await decodeAudioData(decode(message.serverContent.modelTurn.parts[0].inlineData.data), audioContextOutputRef.current!, 24000, 1);
              const source = audioContextOutputRef.current!.createBufferSource();
              source.buffer = buffer;
              source.connect(audioContextOutputRef.current!.destination);
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioContextOutputRef.current!.currentTime);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              activeSourcesRef.current.add(source);
              source.onended = () => {
                activeSourcesRef.current.delete(source);
                if (activeSourcesRef.current.size === 0) setStatus('listening');
              };
            }
            if (message.serverContent?.interrupted) {
              activeSourcesRef.current.forEach(s => s.stop());
              activeSourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setStatus('listening');
            }
            if (message.serverContent?.outputTranscription) {
               setTranscriptions(prev => [...prev.slice(-4), message.serverContent!.outputTranscription!.text]);
            }
          },
          onerror: cleanup, onclose: cleanup
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: "You are Asya. You are a sweet and professional English tutor. Visual: girl with pink bow, pink 'N' shirt, finger heart gesture. Help the user in a natural conversation. Correct mistakes kindly.",
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
          outputAudioTranscription: {}
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (err) { console.error(err); setStatus('idle'); }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 bg-[#fffafb] overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] h-full max-h-[500px] bg-pink-200 rounded-full blur-[100px] animate-pulse"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full">
        <div className="mb-10 scale-90 sm:scale-100">
          <AsyaAvatar size="xl" isAnimated={isActive} />
        </div>

        <div className="bg-white/80 backdrop-blur-xl border-2 border-pink-100 rounded-[32px] p-6 sm:p-10 shadow-2xl w-full asya-glow">
          <h2 className="text-2xl sm:text-4xl font-black mb-4 text-slate-800">
            {status === 'idle' && 'Mau ngobrol bareng? 🌸'}
            {status === 'connecting' && 'Lagi manggil Asya...'}
            {status === 'listening' && "Aku dengerin kok... ✨"}
            {status === 'speaking' && 'Asya lagi bicara...'}
          </h2>
          
          <div className="min-h-[80px] sm:min-h-[120px] flex items-center justify-center mb-6 bg-pink-50/50 rounded-2xl p-4 border border-pink-50">
            <p className="text-pink-700 font-bold italic text-sm sm:text-lg leading-relaxed">
              {transcriptions.length > 0 ? `"${transcriptions.join(' ')}"` : "Klik tombol di bawah untuk mulai ngobrol seru! 🎀"}
            </p>
          </div>

          <button
            onClick={toggleSession}
            className={`w-full py-4 sm:py-6 rounded-2xl sm:rounded-3xl text-xl sm:text-2xl font-black shadow-xl transition-all active:scale-95 flex items-center justify-center gap-4 ${
              isActive 
                ? 'bg-rose-500 text-white' 
                : 'asya-pink-gradient text-white'
            }`}
          >
            {isActive ? '🛑 Selesai' : '🎙️ Mulai Ngobrol'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveAsya;
