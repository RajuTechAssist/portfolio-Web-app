import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Cpu, Code, Zap } from 'lucide-react';
import AbstractHeroScene from './AbstractHeroScene';
import './HeroSection.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`glass-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#home" className="nav-logo">
          {'<Raju />'}
        </a>
        <div className="nav-links">
          <a href="#about" className="nav-link">About</a>
          <a href="#projects" className="nav-link">Work</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export const HeroSection = () => {
  const roles = ["Full Stack Developer", "UI/UX Designer", "Tech Enthusiast"];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="hero-section" id="home">
      <Navbar />

      {/* 3D Background - Now using the Abstract Scene */}
      <div className="hero-3d-background">
        <AbstractHeroScene />
      </div>

      <div className="hero-content-wrapper">
        <div className="hero-container">
          
          {/* Left Content */}
          <motion.div 
            className="hero-content"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="status-badge" variants={item}>
              <span className="status-dot"></span>
              <span className="status-text">Available for Hire</span>
            </motion.div>

            <motion.div variants={item}>
              <h1 className="hero-title">
                Crafting <br />
                <span className="title-highlight">Digital Experiences</span>
              </h1>
            </motion.div>

            <motion.h2 className="hero-subtitle" variants={item}>
              I am a
              <span key={roleIndex} className="typing-text">
                {roles[roleIndex]}
              </span>
            </motion.h2>

            <motion.p className="hero-description" variants={item}>
              Transforming complex problems into elegant, scalable solutions. 
              Specialized in React, Node.js, and modern web technologies to build 
              immersive user interfaces.
            </motion.p>

            <motion.div className="hero-actions" variants={item}>
              <a href="#projects" className="btn-glass btn-primary">
                View My Work <ArrowRight size={18} />
              </a>
              <a href="/resume.pdf" className="btn-glass btn-secondary">
                Download CV <Download size={18} />
              </a>
            </motion.div>

            <motion.div className="social-links" variants={item} style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
              <a href="https://github.com" className="btn-icon">
                <Github size={24} color="#94a3b8" />
              </a>
              <a href="https://linkedin.com" className="btn-icon">
                <Linkedin size={24} color="#94a3b8" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Visuals - Floating Glass Cards Overlaying the 3D Scene */}
          <div className="hero-visuals">
            {/* These cards float over the 3D Abstract Sphere */}
            <motion.div 
              className="glass-card card-tech"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <div className="card-icon">
                <Cpu size={24} />
              </div>
              <div className="card-content">
                <span className="card-label">Tech Stack</span>
                <span className="card-value">Modern & Fast</span>
              </div>
            </motion.div>

            <motion.div 
              className="glass-card card-exp"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              <div className="card-icon">
                <Zap size={24} />
              </div>
              <div className="card-content">
                <span className="card-label">Performance</span>
                <span className="card-value">Optimized</span>
              </div>
            </motion.div>

            <motion.div 
              className="glass-card card-code"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 1 }}
            >
              <div className="card-icon">
                <Code size={24} />
              </div>
              <div className="card-content">
                <span className="card-label">Code Quality</span>
                <span className="card-value">Clean & Scalable</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;