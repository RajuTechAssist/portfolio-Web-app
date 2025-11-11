// ========================================
// SKILL BADGE COMPONENT - 2025
// ========================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, 
  Database, 
  Smartphone, 
  Settings, 
  Palette, 
  Globe,
  Zap,
  Star,
  TrendingUp,
  Award,
  CheckCircle
} from 'lucide-react';

/**
 * Modern Skill Badge Component
 * Features: Proficiency visualization, interactive hover effects, category icons, animations
 */
const SkillBadge = ({
  skill,
  showProficiency = true,
  showExperience = true,
  interactive = true,
  size = 'md',
  variant = 'default',
  className = '',
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);

  // Category icon mapping
  const categoryIcons = {
    'FRONTEND': <Code size={16} />,
    'BACKEND': <Database size={16} />,
    'MOBILE': <Smartphone size={16} />,
    'DEVOPS': <Settings size={16} />,
    'DESIGN': <Palette size={16} />,
    'WEB': <Globe size={16} />,
    'PERFORMANCE': <Zap size={16} />,
    'SOFT_SKILLS': <Award size={16} />
  };

  // Default skill data
  const defaultSkill = {
    id: 1,
    name: 'React',
    category: 'FRONTEND',
    proficiencyLevel: 9,
    yearsExperience: 4,
    featured: true,
    iconUrl: null,
    description: 'Advanced React development with hooks, context, and modern patterns',
    projects: 15,
    certified: true,
    trending: true
  };

  const skillData = skill || defaultSkill;
  const CategoryIcon = categoryIcons[skillData.category] || categoryIcons['WEB'];

  // Animate proficiency bar
  useEffect(() => {
    if (showProficiency && skillData.proficiencyLevel) {
      const timer = setTimeout(() => {
        setAnimationProgress(skillData.proficiencyLevel);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [skillData.proficiencyLevel, showProficiency]);

  // Animation variants
  const badgeVariants = {
    initial: { 
      scale: 1, 
      y: 0,
      rotateY: 0 
    },
    hover: {
      scale: interactive ? 1.05 : 1,
      y: interactive ? -4 : 0,
      rotateY: interactive ? 5 : 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const proficiencyVariants = {
    initial: { width: '0%' },
    animate: {
      width: `${(animationProgress / 10) * 100}%`,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
        delay: 0.2
      }
    }
  };

  const contentVariants = {
    initial: { opacity: 1 },
    hover: {
      opacity: 1,
      transition: { duration: 0.2 }
    }
  };

  // Get proficiency color
  const getProficiencyColor = (level) => {
    if (level >= 8) return '#10B981'; // Green - Expert
    if (level >= 6) return '#F59E0B'; // Yellow - Advanced
    if (level >= 4) return '#3B82F6'; // Blue - Intermediate
    return '#6B7280'; // Gray - Beginner
  };

  // Get proficiency label
  const getProficiencyLabel = (level) => {
    if (level >= 9) return 'Expert';
    if (level >= 7) return 'Advanced';
    if (level >= 5) return 'Intermediate';
    if (level >= 3) return 'Beginner';
    return 'Learning';
  };

  // Handle click
  const handleClick = () => {
    if (onClick && interactive) {
      onClick(skillData);
    }
  };

  // Badge classes
  const badgeClasses = [
    'skill-badge',
    `skill-badge-${size}`,
    `skill-badge-${variant}`,
    `skill-category-${skillData.category?.toLowerCase()}`,
    interactive && 'skill-badge-interactive',
    skillData.featured && 'skill-badge-featured',
    className
  ].filter(Boolean).join(' ');

  return (
    <motion.div
      className={badgeClasses}
      variants={badgeVariants}
      initial="initial"
      whileHover="hover"
      whileTap={interactive ? "tap" : undefined}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      style={{ 
        cursor: interactive ? 'pointer' : 'default',
        perspective: 1000 
      }}
    >
      {/* Skill Header */}
      <div className="skill-header">
        <div className="skill-icon-section">
          {/* Custom icon or category icon */}
          <div className="skill-icon">
            {skillData.iconUrl ? (
              <img 
                src={skillData.iconUrl} 
                alt={skillData.name}
                className="skill-icon-image"
              />
            ) : (
              <motion.div 
                className="skill-icon-default"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                {CategoryIcon}
              </motion.div>
            )}
          </div>
          
          {/* Badges */}
          <div className="skill-badges">
            {skillData.featured && (
              <motion.div
                className="skill-featured-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
              >
                <Star size={10} fill="currentColor" />
              </motion.div>
            )}
            
            {skillData.certified && (
              <motion.div
                className="skill-certified-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
                title="Certified"
              >
                <CheckCircle size={10} />
              </motion.div>
            )}
            
            {skillData.trending && (
              <motion.div
                className="skill-trending-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                title="Trending Skill"
              >
                <TrendingUp size={10} />
              </motion.div>
            )}
          </div>
        </div>

        <div className="skill-info">
          <h4 className="skill-name">{skillData.name}</h4>
          {showExperience && skillData.yearsExperience && (
            <span className="skill-experience">
              {skillData.yearsExperience}+ year{skillData.yearsExperience > 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {/* Proficiency Section */}
      {showProficiency && skillData.proficiencyLevel && (
        <div className="skill-proficiency">
          <div className="proficiency-header">
            <span className="proficiency-label">
              {getProficiencyLabel(skillData.proficiencyLevel)}
            </span>
            <span className="proficiency-score">
              {skillData.proficiencyLevel}/10
            </span>
          </div>
          
          <div className="proficiency-bar">
            <motion.div
              className="proficiency-fill"
              variants={proficiencyVariants}
              initial="initial"
              animate="animate"
              style={{
                backgroundColor: getProficiencyColor(skillData.proficiencyLevel)
              }}
            />
            <div className="proficiency-background" />
          </div>
        </div>
      )}

      {/* Additional Info (shown on hover or always for larger sizes) */}
      <AnimatePresence>
        {(isHovered || size === 'lg' || size === 'xl') && (
          <motion.div
            className="skill-details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {skillData.description && (
              <p className="skill-description">{skillData.description}</p>
            )}
            
            <div className="skill-stats">
              {skillData.projects && (
                <div className="stat-item">
                  <span className="stat-value">{skillData.projects}</span>
                  <span className="stat-label">projects</span>
                </div>
              )}
              
              <div className="stat-item">
                <span className="stat-value">{skillData.category?.toLowerCase()}</span>
                <span className="stat-label">category</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover Effect Overlay */}
      {interactive && (
        <div className="skill-hover-overlay" />
      )}
    </motion.div>
  );
};

// Skill Badge variants
export const SkillBadgeMinimal = (props) => (
  <SkillBadge 
    {...props} 
    variant="minimal" 
    showProficiency={false}
    showExperience={false}
  />
);

export const SkillBadgeCompact = (props) => (
  <SkillBadge 
    {...props} 
    variant="compact"
    size="sm"
  />
);

export const SkillBadgeDetailed = (props) => (
  <SkillBadge 
    {...props} 
    variant="detailed"
    size="lg"
    showProficiency={true}
    showExperience={true}
  />
);

// Skill Grid Component for organizing multiple skills
export const SkillGrid = ({ skills = [], columns = 'auto', gap = 'md', ...badgeProps }) => {
  const gridClasses = [
    'skill-grid',
    `skill-grid-gap-${gap}`,
    typeof columns === 'number' ? `skill-grid-cols-${columns}` : `skill-grid-${columns}`
  ].join(' ');

  return (
    <div className={gridClasses}>
      {skills.map((skill, index) => (
        <motion.div
          key={skill.id || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
        >
          <SkillBadge skill={skill} {...badgeProps} />
        </motion.div>
      ))}
    </div>
  );
};

export default SkillBadge;
