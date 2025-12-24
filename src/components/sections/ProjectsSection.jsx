import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github, Sparkles, ArrowRight } from 'lucide-react';
import './ProjectsSection.css';

/**
 * Projects Section Component
 * Features:
 * - Featured single project (Glow Services)
 * - Playful "Coming Soon" card with Easter egg
 * - Project metrics display
 * - Mobile-first responsive design
 * - Smooth animations and hover effects
 */

export const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState('featured');
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  // --- ADD FADE LOGIC ---
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"] // Triggers when section enters/leaves view
  });

  // 0-15%: Fade In | 15-85%: Fully Visible | 85-100%: Fade Out
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.8, 1, 1, 0.8]);
  // ----------------------

  // Featured Project Data
  const featuredProject = {
    id: 1,
    title: 'Glow Services',
    tagline: 'Next-Gen Wellness Booking Platform',
    description:
      'A comprehensive full-stack solution that removes booking friction. Features a "Smart Guest Checkout" system that auto-registers users, reducing drop-off rates. Includes intelligent location validation (NCR), a custom React scheduling engine, and a dual-role architecture for Customers and Admins.',
    longDescription:
      'Glow Services is a production-ready wellness booking platform built with modern tech. The platform intelligently handles guest checkout flows, reducing user friction by 40%. Admin dashboard provides real-time insights, analytics, and booking management. Built with attention to performance, security, and user experience.',
    tech: [
      { name: 'React', color: '#61dafb' },
      { name: 'Spring Boot 3', color: '#6db33f' },
      { name: 'PostgreSQL', color: '#336791' },
      { name: 'AWS S3', color: '#ff9900' },
      { name: 'Java 21', color: '#007396' }
    ],
    metrics: [
      { label: 'Performance', value: '98/100', icon: '⚡' },
      { label: 'Users', value: '500+', icon: '👥' },
      { label: 'Uptime', value: '99.9%', icon: '🟢' }
    ],
    image: '/glow-services.jpg',
    links: {
      live: 'https://glow-service.studio',
      github: 'https://github.com/raju-developer/glow-services'
    }
  };

  // Coming Soon Projects (Teaser)
  const comingSoonProjects = [
    {
      id: 2,
      title: 'Neural Dashboard',
      tagline: 'Real-time AI Training Monitor',
      emoji: '🧠',
      teaser: 'D3.js + WebSockets magic incoming...'
    },
    {
      id: 3,
      title: 'Cyber Chat App',
      tagline: 'End-to-End Encrypted Messaging',
      emoji: '🔐',
      teaser: 'Cyberpunk vibes + Security first'
    }
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.section id="projects" className="projects-section" ref={sectionRef} style={{ opacity, scale }}>
      <motion.div
        className="projects-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Section Header */}
        <motion.div className="section-header" variants={itemVariants}>
          <div className="section-badge">
            <Sparkles size={16} />
            <span>My Work</span>
          </div>
          <h2 className="section-title">Featured Project</h2>
          <p className="section-subtitle">
            Building solutions that solve real problems, starting with Glow Services
          </p>
        </motion.div>

        {/* Featured Project Card */}
        <motion.div
          className="featured-project"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="project-grid">
            {/* Left: Project Info */}
            <div className="project-content">
              <motion.div className="project-header" variants={itemVariants}>
                <div className="project-label">FEATURED PROJECT</div>
                <h3 className="project-title">{featuredProject.title}</h3>
                <p className="project-tagline">{featuredProject.tagline}</p>
              </motion.div>

              <motion.p className="project-description" variants={itemVariants}>
                {featuredProject.longDescription}
              </motion.p>

              {/* Tech Stack */}
              <motion.div className="tech-stack" variants={itemVariants}>
                <h4 className="tech-label">Built with</h4>
                <div className="tech-list">
                  {featuredProject.tech.map((tech, idx) => (
                    <motion.div
                      key={idx}
                      className="tech-badge"
                      whileHover={{ scale: 1.1 }}
                      style={{ borderColor: tech.color }}
                    >
                      <span className="tech-dot" style={{ backgroundColor: tech.color }}></span>
                      {tech.name}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Project Metrics */}
              <motion.div className="metrics-grid" variants={itemVariants}>
                {featuredProject.metrics.map((metric, idx) => (
                  <div key={idx} className="metric-card">
                    <div className="metric-icon">{metric.icon}</div>
                    <div className="metric-content">
                      <div className="metric-value">{metric.value}</div>
                      <div className="metric-label">{metric.label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div className="project-actions" variants={itemVariants}>
                <motion.a
                  href={featuredProject.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink size={18} />
                  <span>Visit Live</span>
                </motion.a>
                <motion.a
                  href={featuredProject.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={18} />
                  <span>View Code</span>
                </motion.a>
              </motion.div>
            </div>

            {/* Right: Project Image */}
            <motion.div className="project-visual" variants={itemVariants}>
              <motion.div
                className="project-image-wrapper"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="project-image"
                />
                <div className="image-overlay"></div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Coming Soon Section */}
        <motion.div className="coming-soon-section" variants={itemVariants}>
          <div className="coming-soon-header">
            <h3 className="coming-soon-title">What's Next? 🚀</h3>
            <p className="coming-soon-subtitle">
              More projects cooking in the oven. Here's a sneak peek...
            </p>
          </div>

          <div className="coming-soon-grid">
            {comingSoonProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                className="coming-soon-card"
                variants={cardVariants}
                whileHover="hover"
                onClick={() => setShowEasterEgg(!showEasterEgg)}
              >
                <div className="coming-soon-emoji">{project.emoji}</div>
                <h4 className="coming-soon-project-title">{project.title}</h4>
                <p className="coming-soon-tagline">{project.tagline}</p>
                <p className="coming-soon-teaser">{project.teaser}</p>
                <div className="coming-soon-badge">COMING SOON</div>

                {/* Easter Egg */}
                {showEasterEgg && idx === 0 && (
                  <motion.div
                    className="easter-egg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    ✨ Still learning, shipping soon! ✨
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div className="projects-cta" variants={itemVariants}>
          <p className="cta-text">
            More projects are in progress. Follow my progress or reach out to collaborate!
          </p>
          <motion.a
            href="#contact"
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Let's Connect</span>
            <ArrowRight size={18} />
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default ProjectsSection;