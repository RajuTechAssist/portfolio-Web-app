// ========================================
// MODERN LOADING SPINNER COMPONENT - 2025
// ========================================

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, RotateCw, RefreshCw } from 'lucide-react';

/**
 * Modern Loading Spinner with multiple variants
 * Features: Different spinner types, sizes, colors, and animations
 */
const LoadingSpinner = ({
  size = 'md',
  variant = 'spinner',
  color = 'primary',
  text,
  className = ''
}) => {
  
  // Size configurations
  const sizeMap = {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 48,
    '2xl': 64
  };

  // Color configurations
  const colorMap = {
    primary: '#22D3EE',
    secondary: '#64748B', 
    white: '#FFFFFF',
    dark: '#1E293B',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444'
  };

  const spinnerSize = sizeMap[size];
  const spinnerColor = colorMap[color];

  // Base classes
  const containerClasses = [
    'loading-spinner-container',
    `spinner-${size}`,
    `spinner-${color}`,
    className
  ].filter(Boolean).join(' ');

  // Animation variants for different spinner types
  const spinVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  const bounceVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  const dotsVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2,
        repeat: Infinity
      }
    }
  };

  const dotVariants = {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  // Render different spinner variants
  const renderSpinner = () => {
    switch (variant) {
      case 'spinner':
        return (
          <motion.div
            className="spinner-icon"
            variants={spinVariants}
            animate="animate"
          >
            <Loader2 size={spinnerSize} color={spinnerColor} />
          </motion.div>
        );

      case 'rotate':
        return (
          <motion.div
            className="spinner-icon"
            variants={spinVariants}
            animate="animate"
          >
            <RotateCw size={spinnerSize} color={spinnerColor} />
          </motion.div>
        );

      case 'refresh':
        return (
          <motion.div
            className="spinner-icon"
            variants={spinVariants}
            animate="animate"
          >
            <RefreshCw size={spinnerSize} color={spinnerColor} />
          </motion.div>
        );

      case 'pulse':
        return (
          <motion.div
            className="spinner-pulse"
            variants={pulseVariants}
            animate="animate"
            style={{
              width: spinnerSize,
              height: spinnerSize,
              backgroundColor: spinnerColor,
              borderRadius: '50%'
            }}
          />
        );

      case 'bounce':
        return (
          <motion.div
            className="spinner-bounce"
            variants={bounceVariants}
            animate="animate"
            style={{
              width: spinnerSize,
              height: spinnerSize,
              backgroundColor: spinnerColor,
              borderRadius: '50%'
            }}
          />
        );

      case 'dots':
        return (
          <motion.div
            className="spinner-dots"
            variants={dotsVariants}
            animate="animate"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="spinner-dot"
                variants={dotVariants}
                style={{
                  width: spinnerSize / 3,
                  height: spinnerSize / 3,
                  backgroundColor: spinnerColor,
                  borderRadius: '50%',
                  margin: `0 ${spinnerSize / 12}px`
                }}
              />
            ))}
          </motion.div>
        );

      case 'bars':
        return (
          <div className="spinner-bars">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="spinner-bar"
                animate={{
                  scaleY: [1, 0.4, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut'
                }}
                style={{
                  width: spinnerSize / 8,
                  height: spinnerSize,
                  backgroundColor: spinnerColor,
                  margin: `0 ${spinnerSize / 16}px`,
                  borderRadius: spinnerSize / 16
                }}
              />
            ))}
          </div>
        );

      case 'ring':
        return (
          <div className="spinner-ring" style={{ width: spinnerSize, height: spinnerSize }}>
            <motion.div
              className="spinner-ring-inner"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{
                width: '100%',
                height: '100%',
                border: `${spinnerSize / 8}px solid transparent`,
                borderTop: `${spinnerSize / 8}px solid ${spinnerColor}`,
                borderRadius: '50%'
              }}
            />
          </div>
        );

      default:
        return (
          <motion.div
            className="spinner-icon"
            variants={spinVariants}
            animate="animate"
          >
            <Loader2 size={spinnerSize} color={spinnerColor} />
          </motion.div>
        );
    }
  };

  return (
    <div className={containerClasses} role="status" aria-label="Loading">
      <div className="spinner-content">
        {renderSpinner()}
        {text && (
          <motion.p
            className="spinner-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {text}
          </motion.p>
        )}
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

// Preset loading components for common use cases
export const PageLoader = ({ text = "Loading page..." }) => (
  <div className="page-loader">
    <LoadingSpinner size="xl" variant="spinner" text={text} />
  </div>
);

export const ButtonLoader = ({ size = "sm" }) => (
  <LoadingSpinner size={size} variant="spinner" color="white" />
);

export const InlineLoader = ({ text = "Loading..." }) => (
  <div className="inline-loader">
    <LoadingSpinner size="sm" variant="dots" text={text} />
  </div>
);

export const FullScreenLoader = ({ text = "Please wait..." }) => (
  <div className="fullscreen-loader">
    <div className="fullscreen-loader-content">
      <LoadingSpinner size="2xl" variant="spinner" />
      <motion.h3
        className="fullscreen-loader-title"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {text}
      </motion.h3>
    </div>
  </div>
);

export default LoadingSpinner;