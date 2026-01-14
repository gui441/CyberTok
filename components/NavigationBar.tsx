
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NavigationBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const navItems = [
    { path: '/', icon: 'home', label: 'Home' },
    { path: '/discover', icon: 'explore', label: 'Discover' },
    { path: '/create', icon: 'add', label: 'Create', special: true },
    { path: '/inbox', icon: 'mail', label: 'Inbox' },
    { path: '/profile', icon: 'person', label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto z-50 glass-nav px-4 pb-8 pt-3 flex justify-between items-center">
      {navItems.map((item) => {
        if (item.special) {
          return (
            <div key={item.path} className="relative -top-4">
              <div className="absolute inset-0 bg-primary blur-lg opacity-30"></div>
              <button 
                onClick={() => navigate(item.path)}
                className="relative bg-primary text-black w-14 h-10 rounded-xl flex items-center justify-center overflow-hidden transition-transform active:scale-95"
              >
                <div className="absolute inset-0 flex justify-between">
                  <div className="w-1.5 h-full bg-accent-pink/80"></div>
                  <div className="w-1.5 h-full bg-[#00ffff]/80"></div>
                </div>
                <span className="material-symbols-outlined font-bold relative z-10">add</span>
              </button>
            </div>
          );
        }
        const isActive = currentPath === item.path;
        return (
          <Link 
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-white' : 'text-white/50 hover:text-white'}`}
          >
            <span className="material-symbols-outlined text-[28px]" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
              {item.icon}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default NavigationBar;
