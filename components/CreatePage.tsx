
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMAGES } from '../constants';
import { generateVideoIdea } from '../services/geminiService';

const CreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [aiIdea, setAiIdea] = useState<{title: string, idea: string} | null>(null);
  const [loadingIdea, setLoadingIdea] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 15) {
            handleStopRecording();
            return 15;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isRecording]);

  const handleStartRecording = () => {
    setRecordingTime(0);
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const handleAiIdea = async () => {
    setLoadingIdea(true);
    const idea = await generateVideoIdea("energetic");
    setAiIdea(idea);
    setLoadingIdea(false);
  };

  const progressPercentage = (recordingTime / 15) * 100;

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden fade-in">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-tr from-[#1a1a1e] via-[#0d0d0f] to-[#121214] flex items-center justify-center">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#00e6c7 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
          <div className="text-white/10 flex flex-col items-center">
            <span className={`material-symbols-outlined text-8xl mb-4 ${isRecording ? 'text-accent-pink animate-pulse' : ''}`}>
              {isRecording ? 'videocam' : 'videocam_off'}
            </span>
            <p className="text-sm tracking-widest uppercase font-light">
              {isRecording ? `Recording... ${recordingTime}s` : 'Camera Feed Active'}
            </p>
          </div>
        </div>
      </div>

      {aiIdea && (
        <div className="absolute inset-0 z-40 flex items-center justify-center px-8 bg-black/80 backdrop-blur-sm">
           <div className="bg-surface border border-primary/30 p-6 rounded-2xl w-full max-w-sm cyber-glow fade-in">
              <h2 className="text-primary font-bold text-xl uppercase tracking-widest mb-2">{aiIdea.title}</h2>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">{aiIdea.idea}</p>
              <button 
                onClick={() => setAiIdea(null)}
                className="w-full bg-primary text-black font-bold py-3 rounded-xl uppercase tracking-wider transition-transform active:scale-95"
              >
                Let's Film
              </button>
           </div>
        </div>
      )}

      <div className="absolute top-0 inset-x-0 z-20 pt-12">
        <div className="px-4">
          <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary shadow-[0_0_10px_#00e6c7] transition-all duration-300" 
              style={{ width: `${isRecording ? progressPercentage : 0}%` }}
            ></div>
          </div>
        </div>
        <div className="flex items-center justify-between px-4 mt-4">
          <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full glass-nav border border-white/10">
            <span className="material-symbols-outlined text-white">close</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 glass-nav rounded-full border border-primary/30 transition-transform active:scale-95">
            <span className="material-symbols-outlined text-primary text-xl">music_note</span>
            <span className="text-sm font-bold tracking-tight">Add Sound</span>
          </button>
          <button className="size-10 flex items-center justify-center rounded-full glass-nav border border-white/10">
            <span className="material-symbols-outlined text-white">flash_on</span>
          </button>
        </div>
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-6">
        <button 
          onClick={handleAiIdea}
          className={`size-11 flex items-center justify-center rounded-xl bg-primary text-black cyber-glow transition-all active:scale-90 ${loadingIdea ? 'animate-spin' : ''}`}
        >
          <span className="material-symbols-outlined">{loadingIdea ? 'refresh' : 'auto_awesome'}</span>
        </button>
        {['flip_camera_ios', 'speed', 'filter_vintage', 'timer'].map(icon => (
          <button key={icon} className="size-11 flex items-center justify-center rounded-xl glass-nav border border-white/10 active:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-white">{icon}</span>
          </button>
        ))}
      </div>

      <div className="absolute bottom-0 inset-x-0 z-20 pb-12 pt-10 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex justify-center mb-8 px-10">
          <div className="flex items-center glass-nav p-1 rounded-xl border border-white/10 w-full max-w-xs">
            <button className="flex-1 text-xs font-bold uppercase text-primary">15s</button>
            <button className="flex-1 text-xs font-bold uppercase text-white/40">60s</button>
            <button className="flex-1 text-xs font-bold uppercase text-white/40">3m</button>
          </div>
        </div>
        <div className="flex items-center justify-between px-12">
          <button className="flex flex-col items-center gap-1 group">
            <div className="size-12 rounded-xl glass-nav border border-white/10 flex items-center justify-center group-active:bg-white/10"><span className="material-symbols-outlined text-primary text-3xl">auto_fix_high</span></div>
            <span className="text-[10px] font-bold uppercase">Effects</span>
          </button>
          
          <button 
            onMouseDown={handleStartRecording}
            onMouseUp={handleStopRecording}
            onTouchStart={handleStartRecording}
            onTouchEnd={handleStopRecording}
            className={`size-24 rounded-full border-[6px] transition-all duration-300 flex items-center justify-center ${isRecording ? 'border-accent-pink' : 'border-primary'}`}
          >
            <div className={`transition-all duration-300 ${isRecording ? 'size-10 rounded-lg bg-accent-pink' : 'size-20 rounded-full bg-white'}`}></div>
          </button>

          <button className="flex flex-col items-center gap-1 group">
            <div className="size-12 rounded-xl border-2 border-white overflow-hidden bg-white/20 group-active:opacity-50 transition-opacity">
              <img src={IMAGES.VIDEO_POST_1} className="w-full h-full object-cover" alt="Upload Preview"/>
            </div>
            <span className="text-[10px] font-bold uppercase">Upload</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
