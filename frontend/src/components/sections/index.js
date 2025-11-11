// ========================================
// SECTION COMPONENTS INDEX - EXPORT ALL
// ========================================

// Export main section components
export { default as FeaturedProjects } from './FeaturedProjects';
export { default as ServicePreview } from './ServicePreview';

// Default export for convenience
export default {
  FeaturedProjects: require('./FeaturedProjects').default,
  ServicePreview: require('./ServicePreview').default
};