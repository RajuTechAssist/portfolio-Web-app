// ========================================
// PORTFOLIO COMPONENTS INDEX - EXPORT ALL
// ========================================

// Export main portfolio components
export { default as ExperienceTimeline } from './ExperienceTimeline';
export { default as ProjectCard, ProjectCardCompact, ProjectCardMinimal } from './ProjectCard';
export { default as ServiceCard, ServiceCardCompact, ServiceCardMinimal } from './ServiceCard';
export { default as SkillBadge, SkillBadgeMinimal, SkillBadgeCompact, SkillBadgeDetailed, SkillGrid } from './SkillBadge';

// Default export for convenience
export default {
  ExperienceTimeline: require('./ExperienceTimeline').default,
  ProjectCard: require('./ProjectCard').default,
  ProjectCardCompact: require('./ProjectCard').ProjectCardCompact,
  ProjectCardMinimal: require('./ProjectCard').ProjectCardMinimal,
  ServiceCard: require('./ServiceCard').default,
  ServiceCardCompact: require('./ServiceCard').ServiceCardCompact,
  ServiceCardMinimal: require('./ServiceCard').ServiceCardMinimal,
  SkillBadge: require('./SkillBadge').default,
  SkillBadgeMinimal: require('./SkillBadge').SkillBadgeMinimal,
  SkillBadgeCompact: require('./SkillBadge').SkillBadgeCompact,
  SkillBadgeDetailed: require('./SkillBadge').SkillBadgeDetailed,
  SkillGrid: require('./SkillBadge').SkillGrid
};