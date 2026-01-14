
import React, { useState, useEffect, useRef } from 'react';
import { IMAGES } from '../constants';

interface VideoData {
  id: number;
  user: string;
  desc: string;
  img: string;
  likes: string;
  comments: string;
  shares: string;
  music: string;
}

const MOCK_VIDEOS: VideoData[] = [
  {
    id: 1,
    user: "@cyber_vibe",
    desc: "Chasing the neon lights in the heart of Neo-Tokyo. #cyberpunk #future",
    img: IMAGES.BACKGROUND_VIDEO,
    likes: "1.2M",
    comments: "45.3K",
    shares: "120K",
    music: "Original Sound - Synthwave Collective"
  },
  {
    id: 2,
    user: "@neon_dreams",
    desc: "Midnight rain in the digital sector. #tokyo #rain #aesthetic",
    img: IMAGES.VIDEO_POST_1,
    likes: "890K",
    comments: "12K",
    shares: "45K",
    music: "Night City - Lofi Beats"
  },
  {
    id: 3,
    user: "@techno_blade",
    desc: "Slicing through the mainframe. ⚡️ #coding #hacker #neon",
    img: IMAGES.VIDEO_POST_2,
    likes: "2.1M",
    comments: "102K",
    shares: "340K",
    music: "Glitch Hop - Virtual Self"
  }
];

const VideoFeed: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const index = Math.round(containerRef.current.scrollTop / window.innerHeight);
      setActiveIdx(index);
    }
  };

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      className="h-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black"
    >
      {MOCK_VIDEOS.map((video, idx) => (
        <VideoItem key={video.id} video={video} active={idx === activeIdx} />
      ))}
    </div>
  );
};

const VideoItem: React.FC<{ video: VideoData; active: boolean }> = ({ video, active }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="relative h-screen w-full snap-start overflow-hidden">
      {/* Background Content */}
      <div className="absolute inset-0 z-0">
        <div 
          className="relative h-full w-full bg-cover bg-center transition-transform duration-700" 
          style={{ 
            backgroundImage: `url("${video.img}")`,
            transform: active ? 'scale(1)' : 'scale(1.1)'
          }}
        >
          <div className="video-gradient-overlay absolute inset-0"></div>
        </div>
      </div>

      {/* Top Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-6 pt-12">
        <div className="flex items-center gap-1 text-sm font-bold tracking-widest uppercase text-white/60">
          <span>Live</span>
          <div className="w-1 h-1 rounded-full bg-accent-pink animate-pulse"></div>
        </div>
        <div className="flex gap-6 text-sm font-bold tracking-tighter">
          <button className="text-white/60 hover:text-white transition-colors">Following</button>
          <button className="text-white border-b-2 border-primary pb-1">For You</button>
        </div>
        <button className="material-symbols-outlined text-white/80">search</button>
      </div>

      {/* Right Interactions */}
      <div className="absolute right-3 bottom-32 z-20 flex flex-col items-center gap-6">
        <div className="relative mb-2">
          <div className="w-14 h-14 rounded-full border-2 border-primary/40 p-0.5 overflow-hidden">
            <div 
              className="w-full h-full rounded-full bg-cover bg-center" 
              style={{ backgroundImage: `url("${IMAGES.AVATAR_FEED}")` }}
            ></div>
          </div>
          <button className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-black rounded-full w-5 h-5 flex items-center justify-center">
            <span className="material-symbols-outlined text-[16px] font-bold">add</span>
          </button>
        </div>
        
        <div className="flex flex-col items-center gap-1">
          <button onClick={() => setLiked(!liked)}>
            <span 
              className={`material-symbols-outlined text-[32px] transition-all duration-300 ${liked ? 'text-accent-pink scale-125' : 'text-white'}`}
              style={liked ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              favorite
            </span>
          </button>
          <span className="text-[13px] font-bold tracking-wide">{liked ? 'Liked' : video.likes}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <button><span className="material-symbols-outlined text-[32px] text-white">chat_bubble</span></button>
          <span className="text-[13px] font-bold tracking-wide">{video.comments}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <button><span className="material-symbols-outlined text-[32px] text-white">share</span></button>
          <span className="text-[13px] font-bold tracking-wide">{video.shares}</span>
        </div>
        
        <div className="mt-4">
          <div className={`w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center border-4 border-zinc-800 shadow-[0_0_15px_rgba(0,230,199,0.2)] ${active ? 'animate-vinyl' : ''}`}>
            <div 
              className="w-6 h-6 rounded-full bg-cover bg-center border border-primary/20" 
              style={{ backgroundImage: `url("${IMAGES.VINYL_IMG}")` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-20 left-0 right-16 z-20 px-4 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-white font-bold text-lg tracking-tight">{video.user}</h3>
          <span className="material-symbols-outlined text-primary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
        </div>
        <p className="text-sm text-white/90 leading-relaxed mb-3">
          {video.desc}
        </p>
        <div className="flex items-center gap-2 max-w-[200px] overflow-hidden">
          <span className="material-symbols-outlined text-primary text-[18px]">music_note</span>
          <div className="whitespace-nowrap flex gap-4 text-xs font-medium tracking-wide">
            <span className={active ? 'animate-pulse' : ''}>{video.music}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-[84px] left-0 right-0 h-0.5 bg-white/10 z-30">
        {active && <div className="h-full bg-primary w-full origin-left animate-[progress_15s_linear_infinite] shadow-[0_0_8px_#00e6c7]"></div>}
      </div>
      <style>{`
        @keyframes progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};

export default VideoFeed;
