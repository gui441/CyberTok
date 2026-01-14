
import React, { useState } from 'react';
import { IMAGES } from '../constants';
import { generateBio } from '../services/geminiService';

const ProfilePage: React.FC = () => {
  const [bio, setBio] = useState("Creating digital vibes in a neon world ⚡️ | Visualizing the future of Tokyo nights.");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');

  const handleGenerateBio = async () => {
    setIsGenerating(true);
    const newBio = await generateBio("tokyo neon lights, digital art, synthwave");
    setBio(newBio);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-background-dark pb-32 fade-in overflow-y-auto no-scrollbar">
      <header className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-white/5">
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
          <span className="material-symbols-outlined text-2xl">settings</span>
        </button>
        <div className="flex flex-col items-center">
          <span className="text-xs font-medium tracking-widest uppercase opacity-50">Creator</span>
          <h1 className="text-sm font-bold tracking-tight">@cyber_tokyo</h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
          <span className="material-symbols-outlined text-2xl">ios_share</span>
        </button>
      </header>

      <main className="max-w-md mx-auto">
        <section className="px-6 pt-6 flex flex-col items-center text-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-primary rounded-full blur opacity-25"></div>
            <div className="relative w-28 h-28 rounded-full border-2 border-primary p-1">
              <div 
                className="w-full h-full rounded-full bg-center bg-cover" 
                style={{ backgroundImage: `url("${IMAGES.PROFILE_AVATAR}")` }}
              ></div>
            </div>
            <div className="absolute bottom-1 right-1 bg-primary text-background-dark w-6 h-6 rounded-full flex items-center justify-center border-2 border-background-dark">
              <span className="material-symbols-outlined text-[14px] font-bold">check</span>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold tracking-tight">Hiroshi K.</h2>
            <p className="mt-1 text-sm text-primary/70 font-medium uppercase tracking-widest">Digital Architect</p>
            <div className="relative group mt-4 px-8">
              <div className={`text-sm leading-relaxed opacity-80 transition-opacity ${isGenerating ? 'opacity-30' : 'opacity-100'}`}>
                {bio}
              </div>
              <button 
                onClick={handleGenerateBio}
                disabled={isGenerating}
                className={`mt-2 flex items-center gap-2 mx-auto px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary transition-all active:scale-95 ${isGenerating ? 'animate-pulse' : ''}`}
              >
                <span className={`material-symbols-outlined text-sm ${isGenerating ? 'animate-spin' : ''}`}>
                  {isGenerating ? 'refresh' : 'auto_awesome'}
                </span>
                {isGenerating ? 'Rewriting Reality...' : 'AI Bio Boost'}
              </button>
            </div>
          </div>
          <div className="w-full mt-6 grid grid-cols-2 gap-3 px-4">
            <button className="flex items-center justify-center gap-2 bg-primary text-background-dark font-bold py-2.5 rounded-lg teal-glow active:scale-95 transition-all">Edit Profile</button>
            <button className="flex items-center justify-center gap-2 bg-surface border border-white/10 text-white font-bold py-2.5 rounded-lg active:scale-95 transition-all">Insights</button>
          </div>
        </section>

        <section className="px-6 mt-8">
          <div className="grid grid-cols-3 gap-1 bg-surface/50 p-1 rounded-xl border border-white/5">
            <div className="flex flex-col items-center justify-center py-4 bg-background-dark/40 rounded-lg group cursor-pointer hover:bg-primary/5 transition-colors">
              <span className="text-xl font-bold group-hover:text-primary transition-colors">120</span>
              <span className="text-[10px] uppercase tracking-widest opacity-50 font-bold">Following</span>
            </div>
            <div className="flex flex-col items-center justify-center py-4 bg-background-dark/40 rounded-lg group cursor-pointer hover:bg-primary/5 transition-colors">
              <span className="text-xl font-bold group-hover:text-primary transition-colors">45.2k</span>
              <span className="text-[10px] uppercase tracking-widest opacity-50 font-bold">Followers</span>
            </div>
            <div className="flex flex-col items-center justify-center py-4 bg-background-dark/40 rounded-lg group cursor-pointer hover:bg-primary/5 transition-colors">
              <span className="text-xl font-bold group-hover:text-primary transition-colors">1.2M</span>
              <span className="text-[10px] uppercase tracking-widest opacity-50 font-bold">Likes</span>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex border-b border-white/5 px-6">
            <button 
              onClick={() => setActiveTab('posts')}
              className={`flex-1 pb-4 flex flex-col items-center gap-1 relative transition-all ${activeTab === 'posts' ? 'text-primary' : 'text-white/40'}`}
            >
              <span className="material-symbols-outlined" style={activeTab === 'posts' ? { fontVariationSettings: "'FILL' 1" } : {}}>grid_view</span>
              <span className="text-[10px] font-bold uppercase tracking-tighter">Posts</span>
              {activeTab === 'posts' && <div className="absolute bottom-0 left-0 right-0 active-tab-indicator"></div>}
            </button>
            <button 
              onClick={() => setActiveTab('liked')}
              className={`flex-1 pb-4 flex flex-col items-center gap-1 relative transition-all ${activeTab === 'liked' ? 'text-primary' : 'text-white/40'}`}
            >
              <span className="material-symbols-outlined" style={activeTab === 'liked' ? { fontVariationSettings: "'FILL' 1" } : {}}>favorite</span>
              <span className="text-[10px] font-bold uppercase tracking-tighter">Liked</span>
              {activeTab === 'liked' && <div className="absolute bottom-0 left-0 right-0 active-tab-indicator"></div>}
            </button>
            <button 
              onClick={() => setActiveTab('locked')}
              className={`flex-1 pb-4 flex flex-col items-center gap-1 relative transition-all ${activeTab === 'locked' ? 'text-primary' : 'text-white/40'}`}
            >
              <span className="material-symbols-outlined" style={activeTab === 'locked' ? { fontVariationSettings: "'FILL' 1" } : {}}>lock</span>
              <span className="text-[10px] font-bold uppercase tracking-tighter">Vault</span>
              {activeTab === 'locked' && <div className="absolute bottom-0 left-0 right-0 active-tab-indicator"></div>}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-0.5 mt-0.5">
            {[IMAGES.VIDEO_POST_1, IMAGES.VIDEO_POST_2, IMAGES.VIDEO_POST_1, IMAGES.VIDEO_POST_2, IMAGES.VIDEO_POST_1, IMAGES.VIDEO_POST_2].map((img, idx) => (
              <div key={idx} className="aspect-[3/4] relative bg-surface group overflow-hidden cursor-pointer">
                <div 
                  className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-110" 
                  style={{ backgroundImage: `url("${img}")` }}
                ></div>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-[11px] font-bold bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded border border-white/5">
                  <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                  {idx === 0 ? '12.4k' : idx === 1 ? '856' : idx === 2 ? '5.2k' : idx === 3 ? '1.1M' : '45k'}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
