// ========================================
// SCROLL ANIMATION COMPONENTS - FRAMER MOTION 2025
// ========================================

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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
  const { ref, inView } = useInView({
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
      whileInView="visible"
      viewport={{ once: true }}
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
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false
  });

  return (
    <motion.div
      ref={ref}
      className={`parallax-section ${className}`}
      style={{
        y: inView ? 0 : speed * 100
      }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

// =====================================
// SCROLL PROGRESS INDICATOR
// =====================================

/**
 * Scroll Progress Indicator that shows at top of page
 */
export const ScrollProgress = () => {
  const [scrollPercentage, setScrollPercentage] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = documentHeight > 0 ? (currentScrollY / documentHeight) * 100 : 0;
      setScrollPercentage(Math.min(100, Math.max(0, percentage)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
// FADE IN ON SCROLL
// =====================================

/**
 * Simple fade in animation on scroll
 */
export const FadeInOnScroll = ({ children, delay = 0, className = '' }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

// =====================================
// SLIDE UP ON SCROLL
// =====================================

/**
 * Slide up animation on scroll
 */
export const SlideUpOnScroll = ({ children, delay = 0, className = '' }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ y: 60, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

// =====================================
// TYPEWRITER EFFECT
// =====================================

/**
 * Typewriter animation effect that triggers on scroll
 */
export const TypewriterOnScroll = ({
  text,
  delay = 0,
  speed = 50,
  className = ''
}) => {
  const [displayText, setDisplayText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [startAnimation, setStartAnimation] = React.useState(false);
  
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  React.useEffect(() => {
    if (inView) {
      setTimeout(() => setStartAnimation(true), delay);
    }
  }, [inView, delay]);

  React.useEffect(() => {
    if (startAnimation && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [startAnimation, currentIndex, speed, text]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      {startAnimation && currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="typewriter-cursor"
        >
          |
        </motion.span>
      )}
    </span>
  );
};

// Export all scroll animation components
export default {
  ScrollReveal,
  StaggerContainer,
  ParallaxSection,
  ScrollProgress,
  FadeInOnScroll,
  SlideUpOnScroll,
  TypewriterOnScroll
};