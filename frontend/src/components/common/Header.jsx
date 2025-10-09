// ========================================
// MODERN HEADER COMPONENT - 2025
// ========================================

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, Code, Phone, Award } from 'lucide-react';
import Button from './Button';

/**
 * Modern Header Component with scroll effects and responsive design
 * Features: Auto-hide on scroll down, glass morphism, smooth animations
 */
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  // Track scroll position and direction
  useEffect(() => {
    let previousScrollY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      if (currentScrollY > previousScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < previousScrollY) {
        setScrollDirection('up');
      }

      previousScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-hide header on scroll down (modern UX pattern)
  useEffect(() => {
    if (scrollY > 100) {
      setIsVisible(scrollDirection !== 'down');
    } else {
      setIsVisible(true);
    }
  }, [scrollDirection, scrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Navigation items with icons
  const navItems = [
    { label: 'Home', href: '/', icon: <Home size={18} /> },
    { label: 'About', href: '/about', icon: <User size={18} /> },
    { label: 'Projects', href: '/projects', icon: <Briefcase size={18} /> },
    { label: 'Skills', href: '/skills', icon: <Code size={18} /> },
    { label: 'Experience', href: '/experience', icon: <Award size={18} /> },
    { label: 'Contact', href: '/contact', icon: <Phone size={18} /> },
  ];

  const headerVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    hidden: {
      y: -100,
      opacity: 0.8,
      transition: {
        duration: 0.3,
        ease: 'easeIn'
      }
    }
  };

  const mobileMenuVariants = {
    closed: {
      x: '100%',
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <>
      <motion.header
        className={`header ${scrollY > 20 ? 'header-scrolled' : ''}`}
        variants={headerVariants}
        animate={isVisible ? 'visible' : 'hidden'}
      >
        <div className="header-container">
          {/* Logo/Brand */}
          <Link to="/" className="header-logo">
            <motion.div
              className="logo-content"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="logo-icon">
                <Code size={24} />
              </div>
              <span className="logo-text">Portfolio</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={`nav-link ${
                      location.pathname === item.href ? 'nav-link-active' : ''
                    }`}
                  >
                    <span className="nav-link-icon">{item.icon}</span>
                    <span className="nav-link-text">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Actions */}
          <div className="header-actions">
            <Button 
              as={Link}
              to="/contact"
              variant="primary" 
              size="sm"
              className="contact-btn"
            >
              Get In Touch
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.nav
              className="mobile-menu"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mobile-menu-header">
                <h3 className="mobile-menu-title">Navigation</h3>
                <button
                  className="mobile-menu-close"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close mobile menu"
                >
                  <X size={24} />
                </button>
              </div>

              <ul className="mobile-nav-list">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.href}
                      className={`mobile-nav-link ${
                        location.pathname === item.href ? 'mobile-nav-link-active' : ''
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="mobile-nav-icon">{item.icon}</span>
                      <span className="mobile-nav-text">{item.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mobile-menu-footer">
                <Button 
                  as={Link}
                  to="/contact"
                  variant="primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mobile-contact-btn"
                >
                  Get In Touch
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;