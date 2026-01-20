import React from 'react';
import { Tab, NAV_ITEMS } from '../types';

interface NavigationProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTab, onTabChange }) => {
  return (
    <nav className="fixed md:absolute bottom-0 left-0 right-0 w-full h-16 md:h-24 bg-surface-light dark:bg-zinc-900 border-t-4 border-black dark:border-white z-50 flex items-stretch shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      {NAV_ITEMS.map((item) => {
        const isActive = currentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`
              flex-1 flex flex-col items-center justify-center gap-1 border-r border-zinc-300 dark:border-zinc-800 group transition-all duration-100 ease-in-out
              ${isActive 
                ? 'bg-primary text-white translate-y-[2px] shadow-pressed' 
                : 'text-zinc-500 hover:bg-primary/10 hover:text-primary active:translate-y-1 active:shadow-none'
              }
            `}
          >
            <span className={`material-symbols-outlined text-2xl md:text-3xl transition-transform ${!isActive && 'group-hover:scale-110'}`}>
              {item.icon}
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest hidden md:block">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};