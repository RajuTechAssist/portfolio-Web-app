import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import './Footer.css';

/**
 * Footer Component
 * - Minimal, clean design aligned with portfolio theme
 * - Quick nav + social links
 * - Project status indicator
 * - Subtle humor
 * - Mobile responsive
 */

const socialLinks = [
  {
    id: 'github',
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/RajuTechAssist',
    color: '#171515'
  },
  {
    id: 'linkedin',
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/raju-52b130247/',
    color: '#0a66c2'
  },
  {
    id: 'email',
    icon: Mail,
    label: 'Email',
    href: 'mailto:rajukumar319247@gmail.com',
    color: '#3b82f6'
  }
];

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#projects' },
  { name: 'Contact', href: '#contact' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section" id="footer">
      <motion.div
        className="footer-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {/* Top divider */}
        <div className="footer-divider" />

        {/* Main footer content */}
        <div className="footer-content">
          {/* Left side: Brand + tagline */}
          <motion.div className="footer-left" variants={itemVariants}>
            <h3 className="footer-brand">Raju • Full Stack Developer</h3>
            <p className="footer-tagline">Fresher on paper, production in practice.</p>
          </motion.div>

          {/* Center: Nav links */}
          <motion.nav className="footer-nav" variants={itemVariants}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="footer-nav-link"
              >
                {link.name}
              </a>
            ))}
          </motion.nav>

          {/* Right side: Scroll to top button */}
          <motion.button
            onClick={scrollToTop}
            className="footer-scroll-top"
            variants={itemVariants}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>

        {/* Project status */}
        <motion.div className="footer-status" variants={itemVariants}>
          <span className="status-dot" />
          <p>
            Currently powering{' '}
            <a
              href="https://glow-service.studio"
              target="_blank"
              rel="noreferrer"
              className="status-link"
            >
              glow-service.studio
            </a>
            . More experiments loading…
          </p>
        </motion.div>

        {/* Social links */}
        <motion.div className="footer-socials" variants={itemVariants}>
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="social-icon"
                style={{ '--social-color': social.color }}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                title={social.label}
              >
                <Icon size={20} />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Footer humor */}
        <motion.p className="footer-humor" variants={itemVariants}>
          If you're reading this, you're definitely detail-oriented. Let's work together. 👋
        </motion.p>

        {/* Bottom divider + copyright */}
        <div className="footer-bottom">
          <div className="footer-divider" />
          <p className="footer-copy">
            © 2025 Raju. Built with React, Framer Motion & ☕ coffee.
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;