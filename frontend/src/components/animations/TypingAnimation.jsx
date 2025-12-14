import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Typing Animation Component
 * Creates a typewriter effect for text
 * Note: For optimal performance, wrap the onComplete callback with useCallback in parent component
 */
export const TypingAnimation = ({ 
  text, 
  speed = 100, 
  delay = 0,
  className = '',
  onComplete
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const onCompleteRef = useRef(onComplete);

  // Update ref when onComplete changes to avoid stale closures
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, currentIndex === 0 ? delay : speed);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
    }
  }, [currentIndex, text, speed, delay, isComplete]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          style={{ display: 'inline-block', marginLeft: '2px' }}
        >
          |
        </motion.span>
      )}
    </span>
  );
};

export default TypingAnimation;
