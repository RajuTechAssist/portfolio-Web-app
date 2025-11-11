// ========================================
// SERVICE PREVIEW SECTION - 2025
// ========================================

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, 
  Smartphone, 
  Palette, 
  Users, 
  Settings, 
  Zap,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle,
  Clock,
  DollarSign,
  MessageCircle,
  Sparkles,
  Target,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceCard, { ServiceCardCompact } from '../portfolio/ServiceCard';
import Button from '../common/Button';

/**
 * Service Preview Section Component
 * Features: Service carousel, testimonials, pricing preview, interactive animations
 */
const ServicePreview = ({ 
  services = [], 
  showCarousel = true,
  showTestimonials = true,
  maxServices = 4,
  className = '',
  onServiceSelect,
  onContactClick
}) => {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef(null);

  // Default services data
  const defaultServices = [
    {
      id: 1,
      name: 'Full Stack Web Development',
      description: 'Complete web application development from concept to deployment using modern technologies.',
      detailedDescription: 'I create scalable web applications using React, Node.js, and cloud technologies. From responsive frontends to robust backends, I handle the entire development lifecycle.',
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
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'AWS'],
      featured: true,
      rating: 4.9,
      reviewCount: 27,
      completedProjects: 45,
      icon: 'WEB_DEVELOPMENT'
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'Cross-platform mobile applications for iOS and Android with native performance.',
      detailedDescription: 'I build beautiful, performant mobile apps using React Native and Flutter. From concept to app store deployment, I create user-friendly mobile experiences.',
      category: 'MOBILE_DEVELOPMENT',
      features: [
        'Cross-Platform Development',
        'Native Performance',
        'Push Notifications',
        'Offline Functionality',
        'App Store Deployment',
        'User Analytics',
        'In-App Purchases',
        'Social Integration'
      ],
      pricing: {
        startingPrice: 3500,
        currency: '$',
        unit: 'project',
        billingType: 'fixed'
      },
      duration: '6-12 weeks',
      technologies: ['React Native', 'Flutter', 'Firebase', 'Redux'],
      featured: true,
      rating: 4.8,
      reviewCount: 18,
      completedProjects: 23,
      icon: 'MOBILE_DEVELOPMENT'
    },
    {
      id: 3,
      name: 'UI/UX Design',
      description: 'User-centered design solutions that combine beautiful aesthetics with exceptional usability.',
      detailedDescription: 'I create intuitive user interfaces and engaging user experiences through research, wireframing, prototyping, and testing. Every design decision is backed by user insights.',
      category: 'UI_UX_DESIGN',
      features: [
        'User Research & Analysis',
        'Wireframing & Prototyping',
        'Visual Design',
        'Interaction Design',
        'Usability Testing',
        'Design Systems',
        'Responsive Design',
        'Accessibility Standards'
      ],
      pricing: {
        startingPrice: 1800,
        currency: '$',
        unit: 'project',
        billingType: 'fixed'
      },
      duration: '3-6 weeks',
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle'],
      featured: false,
      rating: 4.9,
      reviewCount: 31,
      completedProjects: 38,
      icon: 'UI_UX_DESIGN'
    },
    {
      id: 4,
      name: 'Technical Consulting',
      description: 'Strategic technology guidance and architecture reviews to optimize your development process.',
      detailedDescription: 'I provide expert technical consulting to help you make informed technology decisions, improve code quality, and scale your development team effectively.',
      category: 'CONSULTING',
      features: [
        'Technology Strategy',
        'Architecture Review',
        'Code Quality Audit',
        'Performance Analysis',
        'Team Mentoring',
        'Best Practices Training',
        'Technology Selection',
        'Scalability Planning'
      ],
      pricing: {
        startingPrice: 150,
        currency: '$',
        unit: 'hour',
        billingType: 'hourly'
      },
      duration: '1-4 weeks',
      technologies: ['Various', 'Architecture', 'Best Practices'],
      featured: false,
      rating: 5.0,
      reviewCount: 12,
      completedProjects: 28,
      icon: 'CONSULTING'
    }
  ];

  const displayServices = services && services.length > 0 ? services : defaultServices;
  const featuredServices = displayServices.filter(service => service.featured).slice(0, maxServices);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CEO, TechStart Inc.',
      company: 'TechStart Inc.',
      content: 'Outstanding work! The web application exceeded our expectations. Professional, timely, and exactly what we needed.',
      rating: 5,
      serviceId: 1,
      avatar: '/api/placeholder/60/60'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'Innovation Labs',
      content: 'The mobile app is fantastic. Great communication throughout the project and delivered exactly on time.',
      rating: 5,
      serviceId: 2,
      avatar: '/api/placeholder/60/60'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Marketing Director',
      company: 'Creative Studios',
      content: 'Beautiful UI/UX design that perfectly captures our brand. Users love the new interface!',
      rating: 5,
      serviceId: 3,
      avatar: '/api/placeholder/60/60'
    }
  ];

  // Auto-play carousel
  React.useEffect(() => {
    if (!isAutoPlaying || !showCarousel) return;

    const interval = setInterval(() => {
      setActiveServiceIndex((prev) => 
        prev === featuredServices.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredServices.length, showCarousel]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: 'easeIn'
      }
    })
  };

  // Handle navigation
  const goToNext = () => {
    setActiveServiceIndex((prev) => 
      prev === featuredServices.length - 1 ? 0 : prev + 1
    );
  };

  const goToPrev = () => {
    setActiveServiceIndex((prev) => 
      prev === 0 ? featuredServices.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setActiveServiceIndex(index);
  };

  // Handle service selection
  const handleServiceSelect = (service) => {
    if (onServiceSelect) {
      onServiceSelect(service);
    }
  };

  const handleContactClick = (service) => {
    if (onContactClick) {
      onContactClick(service);
    }
  };

  return (
    <section className={`service-preview-section ${className}`}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="section-header-content">
            <div className="section-title-area">
              <div className="section-badge">
                <Sparkles size={16} />
                <span>Services</span>
              </div>
              <h2 className="section-title">What I Can Do For You</h2>
              <p className="section-subtitle">
                From concept to completion, I provide comprehensive development services 
                tailored to your specific needs and goals.
              </p>
            </div>
            
            <div className="section-actions">
              <Button
                variant="outline"
                as={Link}
                to="/services"
                icon={<ArrowRight size={16} />}
                iconPosition="right"
                className="view-all-btn"
              >
                All Services
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Service Carousel */}
        {showCarousel && featuredServices.length > 0 && (
          <div className="service-carousel">
            <div className="carousel-container">
              {/* Main Carousel */}
              <div 
                className="carousel-content"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <AnimatePresence mode="wait" custom={activeServiceIndex}>
                  <motion.div
                    key={activeServiceIndex}
                    custom={activeServiceIndex}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="carousel-slide"
                  >
                    <div className="featured-service-card">
                      <ServiceCard
                        service={featuredServices[activeServiceIndex]}
                        featured={true}
                        onSelect={handleServiceSelect}
                        onContact={handleContactClick}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button 
                  className="carousel-nav carousel-nav-prev"
                  onClick={goToPrev}
                  aria-label="Previous service"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <button 
                  className="carousel-nav carousel-nav-next"
                  onClick={goToNext}
                  aria-label="Next service"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Carousel Indicators */}
              <div className="carousel-indicators">
                {featuredServices.map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-indicator ${index === activeServiceIndex ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to service ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Services Grid */}
        {!showCarousel && (
          <motion.div
            className="services-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {displayServices.slice(0, maxServices).map((service, index) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="service-item"
              >
                <ServiceCardCompact
                  service={service}
                  featured={service.featured}
                  onSelect={handleServiceSelect}
                  onContact={handleContactClick}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Process Steps */}
        <motion.div
          className="process-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="process-header">
            <h3>How We Work Together</h3>
            <p>A streamlined process designed to deliver exceptional results</p>
          </div>
          
          <div className="process-steps">
            <div className="process-step">
              <div className="step-icon">
                <MessageCircle size={24} />
              </div>
              <div className="step-content">
                <h4>1. Discovery</h4>
                <p>We discuss your goals, requirements, and vision for the project.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-icon">
                <Target size={24} />
              </div>
              <div className="step-content">
                <h4>2. Planning</h4>
                <p>I create a detailed project plan with timelines and deliverables.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-icon">
                <Code size={24} />
              </div>
              <div className="step-content">
                <h4>3. Development</h4>
                <p>I build your solution using best practices and modern technologies.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-icon">
                <Award size={24} />
              </div>
              <div className="step-content">
                <h4>4. Delivery</h4>
                <p>I deliver the finished product with documentation and support.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        {showTestimonials && testimonials.length > 0 && (
          <motion.div
            className="testimonials-section"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="testimonials-header">
              <h3>What Clients Say</h3>
              <p>Real feedback from satisfied clients</p>
            </div>
            
            <div className="testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="testimonial-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <div className="testimonial-content">
                    <div className="testimonial-rating">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < testimonial.rating ? 'currentColor' : 'none'}
                          className={i < testimonial.rating ? 'star-filled' : 'star-empty'}
                        />
                      ))}
                    </div>
                    <p className="testimonial-text">"{testimonial.content}"</p>
                  </div>
                  
                  <div className="testimonial-author">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="author-avatar"
                    />
                    <div className="author-info">
                      <div className="author-name">{testimonial.name}</div>
                      <div className="author-role">{testimonial.role}</div>
                      <div className="author-company">{testimonial.company}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          className="service-cta"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="cta-content">
            <h3>Ready to Start Your Project?</h3>
            <p>
              Let's discuss how I can help bring your ideas to life with 
              professional development services tailored to your needs.
            </p>
            <div className="cta-actions">
              <Button
                variant="primary"
                size="lg"
                as={Link}
                to="/contact"
                icon={<MessageCircle size={20} />}
              >
                Get Free Consultation
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                as={Link}
                to="/services"
              >
                View All Services
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicePreview;
