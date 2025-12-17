import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './AboutSection.css';

/**
 * About Section Component - HUMOR FOCUSED
 * Features:
 * - Professional developer profile with humor
 * - Skills showcase with categories
 * - Funny strengths highlighting
 * - Why hire you section (NO experience mentioned!)
 * - Fully responsive
 * - Smooth animations
 */

export const AboutSection = () => {
  const [activeSkillCategory, setActiveSkillCategory] = useState(null);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
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
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
    hover: {
      y: -8,
      transition: { duration: 0.3 }
    }
  };

  const skills = [
    {
      category: 'Frontend',
      icon: '⚛️',
      technologies: ['React', 'TypeScript', 'JavaScript', 'HTML/CSS']
    },
    {
      category: 'Backend',
      icon: '🔧',
      technologies: ['Spring Boot', 'Java', 'Python', 'MySQL']
    },
    {
      category: 'Testing & DevOps',
      icon: '🧪',
      technologies: ['Playwright', 'Appium', 'Jenkins', 'CI/CD']
    },
    {
      category: 'Tools & Platforms',
      icon: '🛠️',
      technologies: ['Git', 'Render', 'Vercel', 'GitHub']
    }
  ];

  const strengths = [
    {
      emoji: '⚡',
      title: 'Speed Demon',
      description: 'Features shipped faster than you can say "merge conflict". Quality? Non-negotiable.'
    },
    {
      emoji: '🎯',
      title: 'QA Mindset Jedi',
      description: 'I think about edge cases even in my sleep. Bugs don\'t stand a chance against me.'
    },
    {
      emoji: '📚',
      title: 'Learning Machine',
      description: 'New framework drops? Already know it. New pattern? Already implemented it. Send help.'
    },
    {
      emoji: '🤝',
      title: 'Team Glue',
      description: 'Love code reviews, great at feedback, and my desk plant is thriving. Great team vibes.'
    }
  ];

  const highlights = [
    { number: '10+', label: 'Languages & Frameworks' },
    { number: '∞', label: 'Debug Sessions Won' },
    { number: '💯', label: 'Passion Level' },
    { number: '🚀', label: 'Ship Velocity' }
  ];

  const whyHireMe = [
    {
      emoji: '🚀',
      title: 'Ship Like Lightning',
      description: 'I get things done fast without cutting corners. Production-ready code, guaranteed.'
    },
    {
      emoji: '🛡️',
      title: 'Quality First Always',
      description: 'My QA background means bulletproof code is my default mode. Edge cases? Squashed.'
    },
    {
      emoji: '🔧',
      title: 'End-to-End Master',
      description: 'Frontend, backend, database, deployment—I own the full stack. No handoff needed.'
    },
    {
      emoji: '🔥',
      title: 'Always Growing',
      description: 'Best practices? Mastered. New tech? Already learning. I stay sharp and relevant.'
    },
    {
      emoji: '👥',
      title: 'Communication Pro',
      description: 'Clear code, great documentation, honest feedback. I make teams better by default.'
    },
    {
      emoji: '💡',
      title: 'Problem Solver',
      description: 'Complex bugs? Architectural challenges? I solve them with precision and grit.'
    }
  ];

  return (
    <section className="about-section">
      <motion.div
        className="about-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Header */}
        <motion.div className="section-header" variants={itemVariants}>
          <div className="section-badge">👋 About Me</div>
          <h1 className="section-title">Full Stack Developer & Automation Specialist 🎯</h1>
          <p className="section-subtitle">
            I turn caffeine into production code. Building robust apps, crushing bugs with precision, and shipping features that actually work. 
            <span className="highlight"> No BS. All execution.</span>
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="about-content">
          {/* Left Column */}
          <motion.div className="about-left" variants={itemVariants}>
            {/* Story Section */}
            <div className="about-story">
              <h3>Who Am I? 🚀</h3>
              <div className="story-text">
                <p>
                  I'm a <span className="highlight">full-stack software developer</span> obsessed with building solutions that work flawlessly. 
                  With hands-on experience spanning test automation, web development, and mobile app testing, 
                  I bring a "<span className="highlight">test everything first</span>" mindset to every project.
                </p>
                <p>
                  My background is diverse: QA automation taught me to think like a hacker, breaking things systematically. 
                  Now I apply that mindset to building features that DON'T break. It's a superpower in disguise.
                </p>
                <p>
                  <strong>My unshakeable belief:</strong> Clean code isn't optional. Tests aren't a luxury. 
                  And users deserve an amazing experience. I code like my reputation depends on it. Because it does.
                </p>
              </div>
            </div>

            {/* Strengths */}
            <div className="strengths-section">
              <h3>My Superpowers 💪</h3>
              {strengths.map((strength, index) => (
                <motion.div
                  key={index}
                  className="strength-card"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <div className="strength-emoji">{strength.emoji}</div>
                  <div className="strength-content">
                    <h4>{strength.title}</h4>
                    <p>{strength.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div className="about-right" variants={itemVariants}>
            {/* Highlights - NO EXPERIENCE METRICS */}
            <div className="highlights-grid">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  className="highlight-card"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <div className="highlight-number">{highlight.number}</div>
                  <div className="highlight-label">{highlight.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Skills */}
            <div className="skills-section">
              <h3>Tech Arsenal 💻</h3>
              {skills.map((skillGroup, index) => (
                <motion.div
                  key={index}
                  className="skill-category"
                  variants={cardVariants}
                  whileHover="hover"
                  onClick={() =>
                    setActiveSkillCategory(
                      activeSkillCategory === skillGroup.category ? null : skillGroup.category
                    )
                  }
                >
                  <h4 className="skill-category-title">
                    <span className="skill-dot"></span>
                    {skillGroup.icon} {skillGroup.category}
                  </h4>
                  <motion.div
                    className="skill-tags"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: activeSkillCategory === skillGroup.category ? 1 : 1,
                      height: 'auto'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {skillGroup.technologies.map((tech, idx) => (
                      <span key={idx} className="skill-tag">
                        {tech}
                      </span>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Why Work With Me - PURE VALUE, NO GAPS */}
        <motion.div className="about-why" variants={itemVariants}>
          <h2 className="why-title">Why Team Up With Me? 🎯</h2>
          <div className="why-grid">
            {whyHireMe.map((item, index) => (
              <motion.div
                key={index}
                className="why-card"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="why-emoji">{item.emoji}</div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Fun Footer */}
        <motion.div className="about-footer" variants={itemVariants}>
          <p className="footer-text">
            Ready to build something awesome? Let's create magic together. ✨
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;