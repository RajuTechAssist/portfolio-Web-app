// ========================================
// ANIMATIONS INDEX - EXPORT ALL ANIMATION COMPONENTS
// ========================================

// Import all animation components
export { CustomCursor } from './CursorAnimation';
export { HeroAnimation } from './HeroAnimation';
export { 
  ScrollReveal, 
  StaggerContainer, 
  ParallaxSection, 
  ScrollProgress, 
  FadeInOnScroll, 
  SlideUpOnScroll, 
  TypewriterOnScroll 
} from './ScrollAnimation';

// You can also import from your main Animations.jsx if it has other components
// export * from './Animations';

// Default export for convenience
export default {
  CustomCursor: require('./CursorAnimation').CustomCursor,
  HeroAnimation: require('./HeroAnimation').HeroAnimation,
  ScrollReveal: require('./ScrollAnimation').ScrollReveal,
  StaggerContainer: require('./ScrollAnimation').StaggerContainer,
  ParallaxSection: require('./ScrollAnimation').ParallaxSection,
  ScrollProgress: require('./ScrollAnimation').ScrollProgress,
  FadeInOnScroll: require('./ScrollAnimation').FadeInOnScroll,
  SlideUpOnScroll: require('./ScrollAnimation').SlideUpOnScroll,
  TypewriterOnScroll: require('./ScrollAnimation').TypewriterOnScroll
};