// ========================================
// ANIMATION COMPONENTS - FRAMER MOTION 2025 (JavaScript)
// ========================================

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIntersection, useScrollPosition } from '../hooks';

// =====================================
// CUSTOM CURSOR COMPONENT
// =====================================

/**
 * Modern Custom Cursor with smooth animations
 * Features: Mouse tracking, hover effects, glass morphism
 */
export const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, textarea, [role="button"]');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', updateCursor);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [mouseX, mouseY]);

  const variants = {
    default: {
      scale: 1,
      backgroundColor: 'rgba(34, 211, 238, 0.6)',
      mixBlendMode: 'difference',
    },
    hover: {
      scale: 1.5,
      backgroundColor: 'rgba(34, 211, 238, 0.8)',
      mixBlendMode: 'normal',
    }
  };

  return (
    <motion.div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        x: cursorX,
        y: cursorY,
      }}
      variants={variants}
      animate={isHovering ? 'hover' : 'default'}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    />
  );
};

// =====================================
// SCROLL PROGRESS COMPONENT
// =====================================

/**
 * Scroll Progress Indicator with smooth animation
 */
export const ScrollProgress = () => {
  const { scrollPercentage } = useScrollPosition();

  return (
    <motion.div
      className="scroll-progress"
      style={{
        scaleX: scrollPercentage / 100,
      }}
      transition={{ duration: 0.1, ease: 'linear' }}
    />
  );
};

// =====================================
// SCROLL REVEAL ANIMATION
// =====================================

/**
 * Scroll Reveal Animation using Intersection Observer
 * Modern approach to scroll-triggered animations
 */
export const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 50,
  once = true,
  className = ''
}) => {
  const { ref, inView } = useIntersection({
    threshold: 0.1,
    triggerOnce: once,
  });

  const directionVariants = {
    up: { y: distance, opacity: 0 },
    down: { y: -distance, opacity: 0 },
    left: { x: distance, opacity: 0 },
    right: { x: -distance, opacity: 0 },
  };

  const variants = {
    hidden: directionVariants[direction],
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
};

// =====================================
// HERO BACKGROUND ANIMATION
// =====================================

/**
 * Animated Hero Background with floating geometric shapes
 * Features: Continuous animation, performance optimized
 */
export const HeroAnimation = () => {
  return (
    <div className="hero-animation">
      {/* Animated gradient orbs */}
      <motion.div
        className="gradient-orb orb-1"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.8, 0.4],
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="gradient-orb orb-2"
        animate={{
          scale: [1, 0.8, 1],
          opacity: [0.6, 0.3, 0.6],
          x: [0, -80, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <motion.div
        className="gradient-orb orb-3"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.7, 0.3],
          x: [0, 60, 0],
          y: [0, -80, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="floating-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// =====================================
// STAGGER ANIMATION CONTAINER
// =====================================

/**
 * Container that staggers animations of its children
 */
export const StaggerContainer = ({
  children,
  staggerDelay = 0.1,
  className = ''
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {React.Children.map(children, (child, index) => (
        <motion.div variants={itemVariants} key={index}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// =====================================
// MAGNETIC BUTTON EFFECT
// =====================================

/**
 * Button with magnetic hover effect
 * Features: Mouse tracking, smooth spring animations
 */
export const MagneticButton = ({
  children,
  intensity = 0.3,
  className = '',
  onClick
}) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * intensity;
    const deltaY = (e.clientY - centerY) * intensity;
    
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`magnetic-button ${className}`}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};

// =====================================
// PAGE TRANSITION WRAPPER
// =====================================

/**
 * Page transition animation wrapper
 * Features: Smooth page transitions, loading states
 */
export const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.4,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.div>
  );
};

// =====================================
// PARALLAX SECTION
// =====================================

/**
 * Parallax scrolling section
 * Features: Performance optimized parallax effect
 */
export const ParallaxSection = ({
  children,
  speed = 0.5,
  className = ''
}) => {
  const ref = useRef(null);
  const y = useMotionValue(0);
  const { scrollY } = useScrollPosition();

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Calculate if element is in viewport
        if (latest > elementTop - windowHeight && latest < elementTop + elementHeight) {
          const progress = (latest - (elementTop - windowHeight)) / (windowHeight + elementHeight);
          y.set(-progress * speed * 100);
        }
      }
    });

    return unsubscribe;
  }, [scrollY, speed, y]);

  return (
    <motion.div
      ref={ref}
      className={`parallax-section ${className}`}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
};

// =====================================
// TYPEWRITER EFFECT
// =====================================

/**
 * Typewriter animation effect
 */
export const Typewriter = ({
  text,
  delay = 0,
  speed = 50,
  className = ''
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, currentIndex === 0 ? delay : speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, speed, text]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="typewriter-cursor"
      >
        |
      </motion.span>
    </span>
  );
};