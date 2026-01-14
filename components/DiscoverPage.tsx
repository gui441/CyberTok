
import React, { useState } from 'react';
import { IMAGES } from '../constants';
import { searchTrends } from '../services/geminiService';

const DiscoverPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<{ text: string, sources: any[] } | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    const results = await searchTrends(searchQuery);
    setSearchResults(results);
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-background-dark pb-32 fade-in overflow-y-auto no-scrollbar">
      <div className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl">bolt</span>
          <h1 className="text-xl font-bold tracking-tight uppercase">Discover</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors"><span className="material-symbols-outlined">qr_code_scanner</span></button>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors"><span className="material-symbols-outlined">notifications</span></button>
        </div>
      </div>

      <div className="px-4 py-4">
        <form onSubmit={handleSearch} className="relative flex items-center">
          <span className={`material-symbols-outlined absolute left-4 ${isSearching ? 'animate-spin text-primary' : 'text-primary'}`}>
            {isSearching ? 'refresh' : 'search'}
          </span>
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-gray-500 text-sm outline-none transition-all" 
            placeholder="Search trends, or AI insights..." 
            type="text"
          />
        </form>
      </div>

      {searchResults ? (
        <div className="px-6 py-4 fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-primary font-bold uppercase tracking-widest text-sm">AI Intel</h2>
            <button onClick={() => setSearchResults(null)} className="text-white/40 text-xs font-bold uppercase">Clear</button>
          </div>
          <div className="bg-white/5 border border-primary/20 p-4 rounded-xl leading-relaxed text-sm text-gray-300 mb-6">
            {searchResults.text}
          </div>
          {searchResults.sources.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Verified Sources</h3>
              <div className="flex flex-col gap-2">
                {searchResults.sources.map((chunk: any, i: number) => {
                  const web = chunk.web;
                  if (!web) return null;
                  return (
                    <a 
                      key={i} 
                      href={web.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-lg hover:border-primary/40 transition-colors"
                    >
                      <span className="material-symbols-outlined text-primary text-sm">link</span>
                      <span className="text-xs font-medium truncate flex-1">{web.title || web.uri}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Featured Carousel */}
          <div className="relative w-full overflow-hidden mb-8">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-4 no-scrollbar">
              <div className="min-w-[85%] snap-center relative aspect-[16/9] rounded-2xl overflow-hidden cyber-glow border border-primary/20">
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ backgroundImage: `url("${IMAGES.DISCOVER_BANNER}")` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="bg-primary text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest mb-2 inline-block">Campaign</span>
                  <h3 className="text-xl font-bold leading-tight">#CyberVibe Challenge</h3>
                  <p className="text-sm text-gray-300">Show your neon style & win gear</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hashtags */}
          <div className="mb-8">
            <div className="px-4 flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-primary/20 rounded"><span className="material-symbols-outlined text-primary text-sm">tag</span></div>
                <h2 className="font-bold tracking-wider uppercase text-sm">Trending</h2>
              </div>
            </div>
            <div className="flex gap-2 px-4 overflow-x-auto mb-4 no-scrollbar">
              <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary text-black px-4 font-bold text-xs">#RetroFuture</div>
              <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white/5 border border-white/10 px-4 text-xs">#GlowUp</div>
              <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white/5 border border-white/10 px-4 text-xs">#DanceBeat</div>
            </div>
            <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar">
              {[IMAGES.VIDEO_POST_1, IMAGES.VIDEO_POST_2, IMAGES.VIDEO_POST_1].map((img, i) => (
                <div key={i} className="min-w-[120px] aspect-[9/16] rounded-xl bg-white/5 overflow-hidden relative border border-white/5 group cursor-pointer">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" 
                    style={{ backgroundImage: `url("${img}")` }}
                  ></div>
                  <div className="absolute bottom-2 left-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] text-white">play_arrow</span>
                    <span className="text-[10px] font-bold text-white">1.2M</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sounds */}
          <div className="mb-8">
            <div className="px-4 flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-primary/20 rounded"><span className="material-symbols-outlined text-primary text-sm">music_note</span></div>
                <h2 className="font-bold tracking-wider uppercase text-sm">Trending Sounds</h2>
              </div>
            </div>
            <div className="flex flex-col gap-4 px-4">
              <div className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/[0.08] transition-colors cursor-pointer">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                  <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ backgroundImage: `url("${IMAGES.VINYL_IMG}")` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20"><span className="material-symbols-outlined text-white">play_circle</span></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm truncate uppercase tracking-tight">Cyber-Noir Resonance</h4>
                  <p className="text-xs text-gray-500 truncate">Synthwave Dreams • 1.2M videos</p>
                </div>
                <button className="bg-primary/20 text-primary px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest active:bg-primary active:text-black transition-colors">Use</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DiscoverPage;
