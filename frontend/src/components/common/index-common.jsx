// ========================================
// COMMON COMPONENTS INDEX - EXPORT ALL
// ========================================

// Export main components
export { default as Button } from './Button';
export { default as Header } from './Header';
export { default as Footer } from './Footer';
export { default as LoadingSpinner, PageLoader, ButtonLoader, InlineLoader, FullScreenLoader } from './LoadingSpinner';

// Default export for convenience
export default {
  Button: require('./Button').default,
  Header: require('./Header').default,
  Footer: require('./Footer').default,
  LoadingSpinner: require('./LoadingSpinner').default,
  PageLoader: require('./LoadingSpinner').PageLoader,
  ButtonLoader: require('./LoadingSpinner').ButtonLoader,
  InlineLoader: require('./LoadingSpinner').InlineLoader,
  FullScreenLoader: require('./LoadingSpinner').FullScreenLoader
};