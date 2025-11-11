// ========================================
// PROJECT CARD COMPONENT - 2025
// ========================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Calendar,
  Users,
  Star,
  Eye,
  Code,
  Play,
  Heart,
  Share2
} from 'lucide-react';
import Button from '../common/Button';

/**
 * Modern Project Card Component
 * Features: Interactive hover effects, image overlay, technology badges, animations
 */
const ProjectCard = ({ 
  project, 
  featured = false, 
  variant = 'default',
  className = '',
  onLike,
  onShare 
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Fallback project data
  const defaultProject = {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce platform built with React and Node.js featuring real-time inventory management, secure payments, and responsive design.',
    detailedDescription: 'This comprehensive e-commerce solution includes user authentication, product catalog management, shopping cart functionality, secure payment processing with Stripe, order tracking, admin dashboard, and real-time notifications. The platform is built using modern web technologies and follows best practices for security and performance.',
    imageUrl: '/api/placeholder/400/250',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe API', 'Socket.io'],
    githubUrl: 'https://github.com/yourusername/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.vercel.app',
    featured: true,
    status: 'COMPLETED',
    startDate: '2024-01-15',
    endDate: '2024-03-20',
    teamSize: 3,
    category: 'Web Development',
    likes: 42,
    views: 1250,
    stars: 89
  };

  const projectData = project || defaultProject;

  // Handle like functionality
  const handleLike = () => {
    setIsLiked(!isLiked);
    if (onLike) {
      onLike(projectData.id, !isLiked);
    }
  };

  // Handle share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: projectData.title,
        text: projectData.description,
        url: projectData.liveUrl || window.location.href,
      });
    } else if (onShare) {
      onShare(projectData);
    }
  };

  // Animation variants
  const cardVariants = {
    initial: { 
      y: 0, 
      rotateY: 0,
      scale: 1
    },
    hover: {
      y: -8,
      rotateY: featured ? 2 : 0,
      scale: 1.02,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    }
  };

  const overlayVariants = {
    initial: { 
      opacity: 0, 
      scale: 1.1,
      backdropFilter: 'blur(0px)'
    },
    hover: {
      opacity: 1,
      scale: 1,
      backdropFilter: 'blur(8px)',
      transition: { duration: 0.3 }
    }
  };

  const badgeVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 15
      }
    }
  };

  // Card classes
  const cardClasses = [
    'project-card',
    `project-card-${variant}`,
    featured && 'project-card-featured',
    className
  ].filter(Boolean).join(' ');

  return (
    <motion.article
      className={cardClasses}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      style={{ perspective: 1000 }}
    >
      {/* Project Image */}
      <div className="project-image-container">
        <div className="project-image-wrapper">
          <img
            src={projectData.imageUrl}
            alt={projectData.title}
            className={`project-image ${imageLoaded ? 'loaded' : 'loading'}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="project-image-placeholder">
              <Code size={32} />
            </div>
          )}
        </div>

        {/* Image Overlay with Actions */}
        <motion.div
          className="project-overlay"
          variants={overlayVariants}
        >
          <div className="project-actions">
            {projectData.liveUrl && (
              <Button
                as="a"
                href={projectData.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="sm"
                icon={<Play size={16} />}
                className="action-btn"
              >
                Live Demo
              </Button>
            )}
            {projectData.githubUrl && (
              <Button
                as="a"
                href={projectData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
                icon={<Github size={16} />}
                className="action-btn"
              >
                View Code
              </Button>
            )}
          </div>

          {/* Project Stats */}
          <div className="project-stats">
            <div className="stat-item">
              <Eye size={14} />
              <span>{projectData.views || 0}</span>
            </div>
            {projectData.stars && (
              <div className="stat-item">
                <Star size={14} />
                <span>{projectData.stars}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Status Badge */}
        <AnimatePresence>
          {projectData.status && (
            <motion.div
              className={`project-status-badge status-${projectData.status.toLowerCase()}`}
              variants={badgeVariants}
              initial="initial"
              animate="animate"
              exit={{ scale: 0, opacity: 0 }}
            >
              {projectData.status.replace('_', ' ')}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Featured Badge */}
        {featured && (
          <motion.div
            className="project-featured-badge"
            variants={badgeVariants}
            initial="initial"
            animate="animate"
          >
            <Star size={12} fill="currentColor" />
            Featured
          </motion.div>
        )}
      </div>

      {/* Project Content */}
      <div className="project-content">
        {/* Header */}
        <div className="project-header">
          <div className="project-title-section">
            <h3 className="project-title">{projectData.title}</h3>
            {projectData.category && (
              <span className="project-category">{projectData.category}</span>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="project-header-actions">
            <motion.button
              className={`action-icon ${isLiked ? 'liked' : ''}`}
              onClick={handleLike}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
              {projectData.likes && <span>{projectData.likes + (isLiked ? 1 : 0)}</span>}
            </motion.button>
            
            <motion.button
              className="action-icon"
              onClick={handleShare}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 size={18} />
            </motion.button>
          </div>
        </div>

        {/* Description */}
        <div className="project-description">
          <p>
            {showFullDescription 
              ? (projectData.detailedDescription || projectData.description)
              : projectData.description
            }
          </p>
          
          {projectData.detailedDescription && (
            <button
              className="description-toggle"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? 'Show Less' : 'Read More'}
            </button>
          )}
        </div>

        {/* Project Meta */}
        <div className="project-meta">
          {projectData.startDate && (
            <div className="meta-item">
              <Calendar size={14} />
              <span>
                {new Date(projectData.startDate).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric'
                })}
              </span>
            </div>
          )}
          
          {projectData.teamSize && (
            <div className="meta-item">
              <Users size={14} />
              <span>{projectData.teamSize} member{projectData.teamSize > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>

        {/* Technology Tags */}
        <div className="project-technologies">
          {projectData.technologies?.map((tech, index) => (
            <motion.span
              key={tech}
              className="tech-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ 
                delay: index * 0.05,
                duration: 0.2 
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Project Links (mobile view) */}
        <div className="project-links-mobile">
          {projectData.liveUrl && (
            <Button
              as="a"
              href={projectData.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="sm"
              icon={<ExternalLink size={16} />}
            >
              View Project
            </Button>
          )}
          {projectData.githubUrl && (
            <Button
              as="a"
              href={projectData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="sm"
              icon={<Github size={16} />}
            >
              GitHub
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  );
};

// Compact variant for grid layouts
export const ProjectCardCompact = (props) => (
  <ProjectCard {...props} variant="compact" />
);

// Minimal variant for lists
export const ProjectCardMinimal = (props) => (
  <ProjectCard {...props} variant="minimal" />
);

export default ProjectCard;
