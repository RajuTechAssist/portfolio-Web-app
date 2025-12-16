import React from 'react';
import HeroSection from '../components/3d/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ProjectsSection from '../components/sections/ProjectsSection';


/**
 * Modern 3D Home Page with Hero Section
 * Features: 3D developer scene, smooth animations, responsive design
 */
export const Home = () => {
  return (
    <div className="home">
      {/* 3D Hero Section with Developer Scene */}
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
    </div>
  );
};

export default Home;