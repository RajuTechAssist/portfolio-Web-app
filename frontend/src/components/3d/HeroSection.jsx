import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import './HeroSection.css';

/**
 * Enhanced Navbar with Professional Design
 * Mobile-first responsive, smooth scroll effects
 */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-brand">
          <div className="logo-text">&lt; Raju /&gt;</div>
        </div>
        <div className="nav-links">
          <button onClick={() => scrollToSection('about')} className="nav-link">
            About
          </button>
          <button onClick={() => scrollToSection('projects')} className="nav-link">
            Work
          </button>
          <button onClick={() => scrollToSection('contact')} className="nav-link">
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
};

/**
 * Main Hero Section with Profile Image Support
 * Features:
 * - Circular profile image with glow effect
 * - Fresher-friendly copy with humor
 * - Modern CTA buttons
 * - Mobile-first design
 * - Smooth entrance animations
 */
export const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = [
    '💻 Full Stack Developer',
    '🎨 UI/UX Tinkerer',
    '🚀 Tech Enthusiast',
    '📚 Forever Learning™'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: 'easeOut' }
    }
  };

  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [0, -20, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
    }
  };

  return (
    <>
      <Navbar />
      <section className="hero-section">
        <motion.div
          className="hero-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <motion.div className="hero-content" variants={itemVariants}>
            {/* Status Badge */}
            <motion.div className="status-badge" variants={itemVariants}>
              <div className="status-dot"></div>
              <span className="status-text">Available for Hire</span>
            </motion.div>

            {/* Main Title */}
            <motion.div variants={itemVariants}>
              <h1 className="hero-title">
                Building <span className="gradient-text">Digital Experiences</span>
              </h1>
            </motion.div>

            {/* Subtitle with Rotating Roles */}
            <motion.div className="hero-subtitle" variants={itemVariants}>
              <span>I am a </span>
              <motion.span
                className="typing-text"
                key={roleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                {roles[roleIndex]}
              </motion.span>
            </motion.div>

            {/* Description */}
            <motion.p className="hero-description" variants={itemVariants}>
              Learning daily, shipping weekly. 📦 Crafting elegant web solutions using modern
              tech stack. Full Stack Developer with a passion for clean code and pixel-perfect UI.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div className="hero-actions" variants={itemVariants}>
              <motion.a
                href="#projects"
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View My Work</span>
                <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="mailto:rajukumar319247@gmail.com"
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={18} />
                <span>Get Resume</span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div className="social-links" variants={itemVariants}>
              <motion.a
                href="https://github.com/RajuTechAssist"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/raju-52b130247/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="mailto:rajukumar319247@gmail.com"
                className="social-link"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail size={20} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div className="hero-visuals" variants={imageVariants}>
            <motion.div
              className="profile-container"
              initial="initial"
              animate="animate"
              variants={floatingAnimation}
            >
              {/* Profile Image with Glow */}
              <div className="profile-image-wrapper">
                <div className="profile-glow"></div>
                <img
                  src="/Raju.jpg"
                  alt="Profile"
                  className="profile-image"
                />
              </div>

              {/* Decorative Cards Around Image */}
              <motion.div
                className="floating-stat stat-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <div className="stat-badge">
                  <span className="stat-number">6+</span>
                  <span className="stat-label">Months</span>
                </div>
              </motion.div>

              <motion.div
                className="floating-stat stat-2"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <div className="stat-badge">
                  <span className="stat-number">1</span>
                  <span className="stat-label">Project</span>
                </div>
              </motion.div>

              <motion.div
                className="floating-stat stat-3"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="stat-badge">
                  <span className="stat-icon">⚡</span>
                  <span className="stat-label">Fast Dev</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>
    </>
  );
};

export default HeroSection;