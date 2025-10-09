// ========================================
// SERVICE CARD COMPONENT - 2025
// ========================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, 
  Smartphone, 
  Palette, 
  Users, 
  Settings, 
  Zap,
  Check,
  ArrowRight,
  Star,
  Clock,
  DollarSign,
  MessageCircle
} from 'lucide-react';
import Button from '../common/Button';

/**
 * Modern Service Card Component
 * Features: Interactive hover effects, pricing display, feature list, smooth animations
 */
const ServiceCard = ({
  service,
  featured = false,
  variant = 'default',
  className = '',
  onSelect,
  onContact
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Icon mapping for different service types
  const serviceIcons = {
    'WEB_DEVELOPMENT': <Code size={24} />,
    'MOBILE_DEVELOPMENT': <Smartphone size={24} />,
    'UI_UX_DESIGN': <Palette size={24} />,
    'CONSULTING': <Users size={24} />,
    'MAINTENANCE': <Settings size={24} />,
    'PERFORMANCE': <Zap size={24} />
  };

  // Default service data
  const defaultService = {
    id: 1,
    name: 'Full Stack Web Development',
    description: 'Complete web application development from concept to deployment using modern technologies.',
    detailedDescription: 'I provide end-to-end web development services including frontend development with React/Vue.js, backend development with Node.js/Python, database design, API development, authentication systems, payment integration, and cloud deployment. Perfect for startups and businesses looking to establish their online presence.',
    category: 'WEB_DEVELOPMENT',
    features: [
      'Responsive Design',
      'Modern Frontend Frameworks',
      'RESTful API Development',
      'Database Design & Integration',
      'Authentication & Security',
      'Cloud Deployment',
      'Performance Optimization',
      'SEO Implementation'
    ],
    pricing: {
      startingPrice: 2500,
      currency: '$',
      unit: 'project',
      billingType: 'fixed'
    },
    duration: '4-8 weeks',
    deliverables: [
      'Fully functional web application',
      'Admin dashboard (if required)',
      'Source code documentation',
      '3 months post-launch support'
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'AWS'],
    featured: true,
    rating: 4.9,
    reviewCount: 27,
    completedProjects: 45
  };

  const serviceData = service || defaultService;
  const IconComponent = serviceIcons[serviceData.category] || serviceIcons['WEB_DEVELOPMENT'];

  // Animation variants
  const cardVariants = {
    initial: { 
      y: 0, 
      scale: 1,
      rotateY: 0
    },
    hover: {
      y: -8,
      scale: 1.03,
      rotateY: featured ? 3 : 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    }
  };

  const contentVariants = {
    collapsed: { 
      height: 'auto',
      opacity: 1
    },
    expanded: {
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  // Handle service selection
  const handleSelect = () => {
    if (onSelect) {
      onSelect(serviceData);
    }
  };

  const handleContact = () => {
    if (onContact) {
      onContact(serviceData);
    }
  };

  // Card classes
  const cardClasses = [
    'service-card',
    `service-card-${variant}`,
    featured && 'service-card-featured',
    className
  ].filter(Boolean).join(' ');

  return (
    <motion.div
      className={cardClasses}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      style={{ perspective: 1000 }}
    >
      {/* Featured Badge */}
      {featured && (
        <motion.div
          className="service-featured-badge"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <Star size={12} fill="currentColor" />
          Most Popular
        </motion.div>
      )}

      {/* Service Header */}
      <div className="service-header">
        <div className="service-icon">
          <motion.div
            className="service-icon-inner"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            {IconComponent}
          </motion.div>
        </div>
        
        <div className="service-title-section">
          <h3 className="service-title">{serviceData.name}</h3>
          <p className="service-category">
            {serviceData.category?.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
          </p>
        </div>

        {/* Rating */}
        {serviceData.rating && (
          <div className="service-rating">
            <div className="rating-stars">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < Math.floor(serviceData.rating) ? 'currentColor' : 'none'}
                  className={i < Math.floor(serviceData.rating) ? 'star-filled' : 'star-empty'}
                />
              ))}
            </div>
            <span className="rating-text">
              {serviceData.rating} ({serviceData.reviewCount} reviews)
            </span>
          </div>
        )}
      </div>

      {/* Service Description */}
      <div className="service-description">
        <p>{serviceData.description}</p>
        
        {serviceData.detailedDescription && (
          <button
            className="description-toggle"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show Less' : 'Learn More'}
          </button>
        )}
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && serviceData.detailedDescription && (
          <motion.div
            className="service-expanded-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="detailed-description">{serviceData.detailedDescription}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Service Features */}
      <div className="service-features">
        <h4 className="features-title">What's Included:</h4>
        <ul className="features-list">
          {serviceData.features?.slice(0, isExpanded ? serviceData.features.length : 6).map((feature, index) => (
            <motion.li
              key={feature}
              className="feature-item"
              custom={index}
              variants={featureVariants}
              initial="hidden"
              animate="visible"
            >
              <Check size={16} className="feature-check" />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>
        
        {serviceData.features?.length > 6 && !isExpanded && (
          <button
            className="features-toggle"
            onClick={() => setIsExpanded(true)}
          >
            +{serviceData.features.length - 6} more features
          </button>
        )}
      </div>

      {/* Service Meta */}
      <div className="service-meta">
        <div className="meta-grid">
          {serviceData.duration && (
            <div className="meta-item">
              <Clock size={16} />
              <div>
                <span className="meta-label">Duration</span>
                <span className="meta-value">{serviceData.duration}</span>
              </div>
            </div>
          )}
          
          {serviceData.completedProjects && (
            <div className="meta-item">
              <Check size={16} />
              <div>
                <span className="meta-label">Completed</span>
                <span className="meta-value">{serviceData.completedProjects}+ projects</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pricing */}
      {serviceData.pricing && (
        <div className="service-pricing">
          <div className="pricing-header">
            <div className="price-display">
              <span className="price-currency">{serviceData.pricing.currency}</span>
              <span className="price-amount">{serviceData.pricing.startingPrice.toLocaleString()}</span>
              <span className="price-unit">/{serviceData.pricing.unit}</span>
            </div>
            <span className="pricing-label">
              Starting {serviceData.pricing.billingType === 'fixed' ? 'from' : 'at'}
            </span>
          </div>
        </div>
      )}

      {/* Technologies */}
      {serviceData.technologies && serviceData.technologies.length > 0 && (
        <div className="service-technologies">
          <h4 className="technologies-title">Technologies:</h4>
          <div className="technology-tags">
            {serviceData.technologies.map((tech, index) => (
              <motion.span
                key={tech}
                className="technology-tag"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ delay: index * 0.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="service-actions">
        <Button
          variant="primary"
          size="md"
          onClick={handleSelect}
          icon={<ArrowRight size={16} />}
          iconPosition="right"
          className="select-service-btn"
        >
          Get Started
        </Button>
        
        <Button
          variant="ghost"
          size="md"
          onClick={handleContact}
          icon={<MessageCircle size={16} />}
          className="contact-btn"
        >
          Discuss Project
        </Button>
      </div>

      {/* Hover Effect Overlay */}
      <div className="service-hover-overlay" />
    </motion.div>
  );
};

// Compact variant for grid layouts
export const ServiceCardCompact = (props) => (
  <ServiceCard {...props} variant="compact" />
);

// Minimal variant for comparison views
export const ServiceCardMinimal = (props) => (
  <ServiceCard {...props} variant="minimal" />
);

export default ServiceCard;
