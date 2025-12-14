// ========================================
// MODERN FOOTER COMPONENT - 2025
// ========================================

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  Heart, 
  Code,
  ExternalLink,
  ArrowUp
} from 'lucide-react';
import Button from './Button';

/**
 * Modern Footer Component with social links and contact info
 * Features: Smooth animations, responsive design, back to top functionality
 */
const Footer = () => {
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Footer sections data
  const footerSections = [
    {
      title: 'Navigation',
      links: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Projects', href: '/projects' },
        { label: 'Skills', href: '/skills' },
        { label: 'Experience', href: '/experience' },
        { label: 'Contact', href: '/contact' },
      ]
    },
    {
      title: 'Services',
      links: [
        { label: 'Web Development', href: '/services/web' },
        { label: 'Mobile Apps', href: '/services/mobile' },
        { label: 'UI/UX Design', href: '/services/design' },
        { label: 'Consulting', href: '/services/consulting' },
        { label: 'Code Review', href: '/services/review' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', href: '/blog' },
        { label: 'Portfolio', href: '/portfolio' },
        { label: 'Resume', href: '/resume.pdf', external: true },
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'Testimonials', href: '/testimonials' },
      ]
    }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github size={20} />,
      url: 'https://github.com/RajuTechAssist',
      color: '#333'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={20} />,
      url: 'https://www.linkedin.com/in/raju-52b130247/',
      color: '#0077B5'
    },
    {
      name: 'Email',
      icon: <Mail size={20} />,
      url: 'mailto:rajutechassist@gmail.com',
      color: '#EA4335'
    }
  ];

  const contactInfo = [
    {
      icon: <Mail size={16} />,
      label: 'hello@example.com',
      href: 'mailto:hello@example.com'
    },
    {
      icon: <Phone size={16} />,
      label: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: <MapPin size={16} />,
      label: 'San Francisco, CA',
      href: 'https://maps.google.com'
    }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <motion.div
          className="footer-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Footer Brand */}
          <motion.div className="footer-brand" variants={itemVariants}>
            <Link to="/" className="footer-logo">
              <div className="footer-logo-content">
                <Code size={32} />
                <span className="footer-logo-text">Portfolio</span>
              </div>
            </Link>
            <p className="footer-brand-text">
              Crafting digital experiences with passion and precision. 
              Let's build something amazing together.
            </p>
            
            {/* Contact Info */}
            <div className="footer-contact">
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.href}
                  className="footer-contact-item"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <span className="footer-contact-icon">{contact.icon}</span>
                  <span className="footer-contact-text">{contact.label}</span>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div className="footer-social">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  className="footer-social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  style={{ '--social-color': social.color }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          <div className="footer-links">
            {footerSections.map((section, sectionIndex) => (
              <motion.div 
                key={section.title} 
                className="footer-section"
                variants={itemVariants}
              >
                <h4 className="footer-section-title">{section.title}</h4>
                <ul className="footer-section-list">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: (sectionIndex * 0.1) + (linkIndex * 0.05) }}
                    >
                      {link.external ? (
                        <a
                          href={link.href}
                          className="footer-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>{link.label}</span>
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        <Link to={link.href} className="footer-link">
                          {link.label}
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Newsletter Signup */}
            <motion.div className="footer-newsletter" variants={itemVariants}>
              <h4 className="footer-section-title">Stay Updated</h4>
              <p className="newsletter-text">
                Get notified about new projects and blog posts
              </p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <div className="newsletter-input-group">
                  <input
                    type="email"
                    className="newsletter-input"
                    placeholder="Enter your email"
                    required
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    type="submit"
                    className="newsletter-btn"
                  >
                    Subscribe
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              <p>
                © {new Date().getFullYear()} Portfolio. Made with{' '}
                <motion.span
                  className="heart-icon"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Heart size={14} fill="currentColor" />
                </motion.span>
                {' '}by Raju
              </p>
            </div>

            <div className="footer-actions">
              <div className="footer-links-inline">
                <Link to="/privacy" className="footer-link-inline">Privacy</Link>
                <Link to="/terms" className="footer-link-inline">Terms</Link>
                <Link to="/sitemap" className="footer-link-inline">Sitemap</Link>
              </div>

              {/* Back to Top Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="back-to-top"
                icon={<ArrowUp size={16} />}
                iconPosition="left"
              >
                Back to Top
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;