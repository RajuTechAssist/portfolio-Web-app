import React, { useEffect, useRef, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HeroAnimation } from '../components/animations/HeroAnimation';
import { ScrollReveal } from '../components/animations/ScrollAnimation';
import ServicePreview from '../components/sections/ServicePreview';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import Button from '../components/common/Button';
import { useApi } from '../hooks';
import Scene3D from '../components/3d/Scene3D';

import profileImage from '../assets/Raju1.jpg';

/**
 * Modern Home Page with Hero Section and Scroll Animations
 * Features: Parallax effects, scroll-triggered animations, modern glass morphism
 */
export const Home = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  // Parallax effects using Motion's useTransform
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Fetch data for dynamic content
  const { data: featuredProjects } = useApi('/projects/featured', { 
    cacheKey: 'featured_projects' 
  });
  const { data: services } = useApi('/services', { 
    cacheKey: 'services' 
  });

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: 'easeOut', 
        staggerChildren: 0.2 
      } 
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: 'easeOut' 
      } 
    }
  };

  return (
    <div className="home">
      {/* Hero Section with Parallax */}
      <motion.section 
        ref={heroRef}
        className="hero-section"
        style={{ y: yBg }}
      >
        {/* 3D Background Scene */}
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
        
        {/* Background Effects */}
        <div className="gradient-orb gradient-orb-1"></div>
        <div className="gradient-orb gradient-orb-2"></div>
        <div className="gradient-orb gradient-orb-3"></div>
        
        <div className="hero-container">
          <motion.div
            className="hero-content"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            style={{ y: yText, opacity }}
          >
            {/* Text Content */}
            <motion.div className="hero-text" variants={childVariants}>
              <motion.div 
                className="hero-greeting"
                variants={childVariants}
              >
                <span>👋</span>
                <span>Hello, I'm</span>
              </motion.div>
              
              <motion.h1 
                className="hero-title-main"
                variants={childVariants}
              >
                Raju
              </motion.h1>
              
              <motion.h2 
                className="hero-title-sub"
                variants={childVariants}
              >
                Software Developer
              </motion.h2>
              
              <motion.p 
                className="hero-description"
                variants={childVariants}
              >
                I'm a passionate fresher software developer eager to create innovative 
                web applications. I love building modern, responsive solutions with clean 
                code and exceptional user experiences.
              </motion.p>
              
              <motion.div 
                className="hero-actions"
                variants={childVariants}
              >
                <Button
                  variant="primary"
                  size="lg"
                  as={Link}
                  to="/contact"
                  className="hero-cta-button"
                >
                  Let's Work Together
                </Button>
                
                <Button
                  variant="secondary"
                  size="lg"
                  as={Link}
                  to="/projects"
                  className="hero-secondary-button"
                >
                  View My Work
                </Button>
              </motion.div>
              
              <motion.div 
                className="hero-social-links"
                variants={childVariants}
              >
                <a 
                  href="https://github.com/RajuTechAssist"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="GitHub Profile"
                >
                  <Github size={22} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/raju-52b130247/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={22} />
                </a>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div 
              className="hero-visual"
              variants={childVariants}
            >
              <div className="hero-image-container">
                {/* Replace this src with your actual image path */}
                <img
                  src={profileImage} // Update this path to your image
                  alt="Your Name - Full Stack Developer"
                  className="hero-avatar"
                />
                
                {/* Floating Elements */}
                <motion.div
                  className="floating-card"
                  style={{
                    position: 'absolute',
                    top: '10%',
                    right: '-10%',
                    transform: 'rotate(5deg)'
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    rotate: [5, -5, 5]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <div style={{ padding: '1rem', fontSize: '0.875rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%', 
                        background: '#22D3EE' 
                      }}></div>
                      <span>Available for work</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="floating-card"
                  style={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '-20%',
                    transform: 'rotate(-5deg)'
                  }}
                  animate={{
                    y: [10, -10, 10],
                    rotate: [-5, 5, -5]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <div style={{ padding: '1rem', fontSize: '0.875rem' }}>
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>10+ Projects</div>
                      <div style={{ color: '#94A3B8' }}>Completed</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="scroll-indicator"
          style={{ opacity }}
          onClick={() => {
            document.querySelector('.services-section')?.scrollIntoView({ 
              behavior: 'smooth' 
            });
          }}
        >
          <span className="scroll-indicator-text">Scroll</span>
          <ArrowDown size={20} className="scroll-indicator-arrow" />
        </motion.div>
      </motion.section>

      {/* Services Preview Section */}
      <ScrollReveal>
        <ServicePreview 
          services={services} 
          className="services-section"
          showCarousel={true}
          showTestimonials={true}
          maxServices={4}
        />
      </ScrollReveal>

      {/* Featured Projects Section */}
      <ScrollReveal>
        <FeaturedProjects 
          projects={featuredProjects}
          showFilters={true}
          maxProjects={6}
        />
      </ScrollReveal>

      {/* Call to Action Section */}
      <ScrollReveal>
        <section className="section-padding" style={{ 
          background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div className="container">
            <div style={{ 
              textAlign: 'center', 
              maxWidth: '600px', 
              margin: '0 auto' 
            }}>
              <motion.h2 
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: '700',
                  marginBottom: '1.5rem',
                  color: '#F8FAFC'
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Ready to Start Your Project?
              </motion.h2>
              
              <motion.p 
                style={{
                  fontSize: '1.125rem',
                  color: '#CBD5E1',
                  marginBottom: '2rem',
                  lineHeight: '1.6'
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Let's discuss how we can bring your vision to life with modern 
                technology and creative design.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  as={Link}
                  to="/contact"
                >
                  <Mail size={20} />
                  Get In Touch
                </Button>
                
                <Button
                  variant="secondary"
                  size="lg"
                  as="a"
                  href="https://github.com/RajuTechAssist"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={20} />
                  View GitHub
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
};

export default Home;
