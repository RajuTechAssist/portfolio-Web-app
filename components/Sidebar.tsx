import React from 'react';

interface SidebarProps {
  onToggleTheme: () => void;
  isDark: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ onToggleTheme, isDark }) => {
  return (
    <div className="h-[40vh] w-full md:h-full md:w-5/12 lg:w-4/12 relative bg-zinc-900 border-b-4 md:border-b-0 md:border-r-4 border-black dark:border-white overflow-hidden z-10 flex-shrink-0">
      <img 
        alt="Raju - Digital Architect" 
        className="absolute inset-0 w-full h-full object-cover  object-top brightness-100 opacity-90 contrast-125 " 
        src="/raju1.jpg"
      />
      {/* Color Overlay */}
      <div className="absolute inset-0 bg-primary mix-blend-multiply opacity-30"></div>
      
      {/* Grain Overlay via CSS class */}
      <div className="grain-overlay"></div>
      
      <div className="absolute bottom-4 left-4 md:bottom-12 md:left-8 z-20">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-lg leading-none select-none">
          RA<br/>JU<span className="text-primary">.</span>
        </h1>
        <div className="mt-2 md:mt-4 inline-block bg-white text-black px-2 py-1 text-xs md:text-sm font-mono font-bold tracking-widest uppercase shadow-brutal-sm">
          Full_Stack_Dev_v2.0
        </div>
      </div>

      <button 
        className="absolute top-4 right-4 md:hidden p-2 bg-white dark:bg-black border-2 border-black dark:border-white rounded active:translate-y-0.5 transition-transform z-30 shadow-brutal-sm" 
        onClick={onToggleTheme}
      >
        <span className="material-symbols-outlined text-lg block text-black dark:text-white">
          {isDark ? 'light_mode' : 'dark_mode'}
        </span>
      </button>
    </div>
  );
};