import React from 'react';
import HeroSection from '../components/3d/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import ContactSection from '../components/sections/ContactSection';
import Fotter from '../components/sections/Footer'


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
      <ContactSection />
      <Fotter/>
    </div>
  );
};

export default Home;