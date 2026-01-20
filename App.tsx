import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navigation } from './components/Navigation';
import { ProfileSection, ProjectsSection, SkillsSection, ExperienceSection, EducationSection } from './components/Sections';
import { Tab } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.PROFILE);
  const [isDark, setIsDark] = useState(true);

  // Initialize theme based on preference or system
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.PROFILE:
        return <ProfileSection onNavigate={setActiveTab} />;
      case Tab.PROJECTS:
        return <ProjectsSection />;
      case Tab.SKILLS:
        return <SkillsSection />;
      case Tab.EXPERIENCE:
        return <ExperienceSection />;
      case Tab.EDUCATION:
        return <EducationSection />;
      default:
        return <ProfileSection onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col md:flex-row">
      {/* Left / Top Sidebar */}
      <Sidebar onToggleTheme={toggleTheme} isDark={isDark} />

      {/* Right / Bottom Content Area */}
      <div className="flex-1 flex flex-col h-[60vh] md:h-full relative bg-white dark:bg-zinc-950">
        
        {/* Header - Desktop Only */}
        <header className="hidden md:flex h-16 border-b-4 border-black dark:border-white items-center justify-between px-8 bg-white dark:bg-zinc-950 z-20 flex-shrink-0">
          <div className="font-mono text-xs font-bold tracking-wider uppercase flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 border border-black dark:border-white"></span>
            System_Ready
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-zinc-500" id="breadcrumb-current">
              ROOT / {activeTab.toUpperCase()}
            </span>
            <button 
              onClick={toggleTheme} 
              className="p-2 hover:text-primary transition-colors"
              title="Toggle Theme"
            >
              <span className="material-symbols-outlined text-xl">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
          </div>
        </header>

        {/* Main Content Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-12 pb-32 md:pb-32 relative scroll-smooth bg-white dark:bg-zinc-950">
          {renderContent()}
        </main>

        {/* Bottom Navigation */}
        <Navigation currentTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}

export default App;