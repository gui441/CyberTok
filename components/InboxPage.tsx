
import React from 'react';
import { IMAGES } from '../constants';

const InboxPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-dark pb-32 fade-in overflow-y-auto no-scrollbar">
      <nav className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between px-6 pt-12 pb-4">
          <h1 className="text-3xl font-bold tracking-tight uppercase">Inbox</h1>
          <div className="relative">
            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-card-dark active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-2xl">send</span>
            </button>
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-background-dark ring-4 ring-background-dark">12</span>
          </div>
        </div>
        <div className="flex gap-3 px-6 pb-4 overflow-x-auto no-scrollbar">
          <button className="flex h-10 shrink-0 items-center justify-center px-6 rounded-full bg-primary text-background-dark text-sm font-bold tracking-wide uppercase">All Activity</button>
          <button className="flex h-10 shrink-0 items-center justify-center px-6 rounded-full bg-card-dark text-slate-400 text-sm font-medium">Likes</button>
          <button className="flex h-10 shrink-0 items-center justify-center px-6 rounded-full bg-card-dark text-slate-400 text-sm font-medium">Comments</button>
        </div>
      </nav>

      <main className="flex flex-col px-4 pt-4 space-y-1">
        <div className="px-2 pb-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">New Today</h3>
        </div>
        
        {/* Mention Item */}
        <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/[0.03] transition-colors cursor-pointer group">
          <div className="relative flex-shrink-0">
            <div className="size-14 rounded-full border-2 border-primary p-0.5">
              <div 
                className="w-full h-full rounded-full bg-center bg-cover" 
                style={{ backgroundImage: `url("${IMAGES.INBOX_AVATAR}")` }}
              ></div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-primary text-background-dark rounded-full p-1 border-2 border-background-dark">
              <span className="material-symbols-outlined text-[14px] font-bold">alternate_email</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="font-bold text-sm">cyber_vibe</span>
              <span className="text-slate-400 text-sm">mentioned you</span>
            </div>
            <p className="text-sm font-medium text-slate-200 line-clamp-1 italic opacity-80">"This drop is actually insane! ⚡️"</p>
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-tighter mt-1">2m ago</span>
          </div>
          <div 
            className="shrink-0 w-14 h-14 rounded-lg overflow-hidden border border-white/10 bg-slate-800 bg-cover bg-center" 
            style={{ backgroundImage: `url("${IMAGES.VIDEO_POST_1}")` }}
          ></div>
        </div>

        {/* Like Item */}
        <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/[0.03] transition-colors cursor-pointer group">
          <div className="relative flex-shrink-0">
            <div className="size-14 rounded-full p-0.5">
              <div 
                className="w-full h-full rounded-full bg-center bg-cover" 
                style={{ backgroundImage: `url("${IMAGES.AVATAR_FEED}")` }}
              ></div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-accent-pink text-white rounded-full p-1 border-2 border-background-dark">
              <span className="material-symbols-outlined text-[14px] font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="font-bold text-sm">neon_rider</span>
              <span className="text-slate-400 text-sm">liked your video</span>
            </div>
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-tighter">15m ago</span>
          </div>
          <div 
            className="shrink-0 w-14 h-14 rounded-lg overflow-hidden border border-white/10 bg-slate-800 bg-cover bg-center" 
            style={{ backgroundImage: `url("${IMAGES.VIDEO_POST_2}")` }}
          ></div>
        </div>
      </main>
    </div>
  );
};

export default InboxPage;
