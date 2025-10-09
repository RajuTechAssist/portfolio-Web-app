// ========================================
// FEATURED PROJECTS SECTION - 2025
// ========================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Filter, 
  Grid, 
  List, 
  Search,
  Star,
  ExternalLink,
  Github,
  Eye,
  Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectCard, { ProjectCardCompact } from '../portfolio/ProjectCard';
import Button from '../common/Button';

/**
 * Featured Projects Section Component
 * Features: Project filtering, view modes, search, interactive animations
 */
const FeaturedProjects = ({ 
  projects = [], 
  showFilters = true,
  viewMode = 'grid',
  maxProjects = 6,
  className = '',
  onProjectClick,
  onViewAll
}) => {
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [currentViewMode, setCurrentViewMode] = useState(viewMode);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Default featured projects data
  const defaultProjects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Modern e-commerce platform with real-time inventory, secure payments, and admin dashboard.',
      detailedDescription: 'A comprehensive e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, payment processing with Stripe, order management, and responsive design.',
      imageUrl: '/api/placeholder/600/400',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'Redux'],
      githubUrl: 'https://github.com/yourusername/ecommerce-platform',
      liveUrl: 'https://ecommerce-demo.vercel.app',
      featured: true,
      status: 'COMPLETED',
      category: 'Web Development',
      startDate: '2024-01-15',
      teamSize: 3,
      likes: 89,
      views: 2340,
      stars: 156
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management with real-time updates, team collaboration, and productivity analytics.',
      detailedDescription: 'A powerful project management tool that helps teams organize tasks, track progress, and collaborate effectively. Built with modern technologies for optimal performance.',
      imageUrl: '/api/placeholder/600/400',
      technologies: ['React', 'Firebase', 'Material-UI', 'Socket.io', 'Chart.js'],
      githubUrl: 'https://github.com/yourusername/task-manager',
      liveUrl: 'https://taskmanager-demo.vercel.app',
      featured: true,
      status: 'COMPLETED',
      category: 'Web Development',
      startDate: '2024-02-10',
      teamSize: 2,
      likes: 67,
      views: 1890,
      stars: 123
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Beautiful weather dashboard with forecasts, maps, and location-based recommendations.',
      detailedDescription: 'An elegant weather application that provides detailed forecasts, interactive maps, and personalized recommendations based on current conditions.',
      imageUrl: '/api/placeholder/600/400',
      technologies: ['React', 'TypeScript', 'OpenWeather API', 'Mapbox', 'Tailwind CSS'],
      githubUrl: 'https://github.com/yourusername/weather-dashboard',
      liveUrl: 'https://weather-demo.vercel.app',
      featured: true,
      status: 'COMPLETED',
      category: 'Web Development',
      startDate: '2024-03-05',
      teamSize: 1,
      likes: 45,
      views: 1234,
      stars: 89
    },
    {
      id: 4,
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media management with insights and scheduling features.',
      detailedDescription: 'A comprehensive social media management tool that helps businesses track performance, schedule posts, and analyze engagement across multiple platforms.',
      imageUrl: '/api/placeholder/600/400',
      technologies: ['Vue.js', 'Python', 'Django', 'PostgreSQL', 'D3.js'],
      githubUrl: 'https://github.com/yourusername/social-dashboard',
      liveUrl: 'https://social-demo.vercel.app',
      featured: true,
      status: 'IN_PROGRESS',
      category: 'Web Development',
      startDate: '2024-04-01',
      teamSize: 4,
      likes: 78,
      views: 1567,
      stars: 134
    },
    {
      id: 5,
      title: 'Mobile Fitness App',
      description: 'Cross-platform fitness app with workout tracking, nutrition planning, and social features.',
      detailedDescription: 'A comprehensive fitness application that helps users track workouts, plan nutrition, connect with friends, and achieve their health goals through gamification.',
      imageUrl: '/api/placeholder/600/400',
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Firebase', 'HealthKit'],
      githubUrl: 'https://github.com/yourusername/fitness-app',
      liveUrl: 'https://fitness-demo.vercel.app',
      featured: true,
      status: 'COMPLETED',
      category: 'Mobile Development',
      startDate: '2024-01-20',
      teamSize: 3,
      likes: 92,
      views: 2100,
      stars: 167
    },
    {
      id: 6,
      title: 'AI Content Generator',
      description: 'AI-powered content generation tool for blogs, social media, and marketing materials.',
      detailedDescription: 'An innovative content creation platform that leverages artificial intelligence to help businesses and creators generate high-quality content efficiently.',
      imageUrl: '/api/placeholder/600/400',
      technologies: ['Next.js', 'Python', 'OpenAI API', 'PostgreSQL', 'Redis'],
      githubUrl: 'https://github.com/yourusername/ai-content',
      liveUrl: 'https://ai-content-demo.vercel.app',
      featured: true,
      status: 'IN_PROGRESS',
      category: 'AI/ML',
      startDate: '2024-05-01',
      teamSize: 2,
      likes: 156,
      views: 3400,
      stars: 234
    }
  ];

    const displayProjects = projects && projects.length > 0 ? projects : defaultProjects;

  // Get unique categories
  const categories = ['ALL', ...new Set(displayProjects.map(project => project.category))];

  // Filter projects based on active filter and search query
  useEffect(() => {
    setIsLoading(true);
    
    let filtered = displayProjects;

    // Apply category filter
    if (activeFilter !== 'ALL') {
      filtered = filtered.filter(project => project.category === activeFilter);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies?.some(tech => 
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Limit to max projects
    filtered = filtered.slice(0, maxProjects);

    setTimeout(() => {
      setFilteredProjects(filtered);
      setIsLoading(false);
    }, 300);
  }, [activeFilter, searchQuery, displayProjects, maxProjects]);

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

  // Handle project click
  const handleProjectClick = (project) => {
    if (onProjectClick) {
      onProjectClick(project);
    }
  };

  // Handle view all click
  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll();
    }
  };

  return (
    <section className={`featured-projects-section ${className}`}>
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
              <h2 className="section-title">Featured Projects</h2>
              <p className="section-subtitle">
                Showcase of my recent work and side projects. Each project demonstrates 
                different skills and technologies I've mastered.
              </p>
            </div>
            
            {/* View All Button */}
            <div className="section-actions">
              <Button
                variant="outline"
                onClick={handleViewAll}
                as={Link}
                to="/projects"
                icon={<ArrowRight size={16} />}
                iconPosition="right"
                className="view-all-btn"
              >
                View All Projects
              </Button>
            </div>
          </div>

          {/* Controls */}
          {showFilters && (
            <div className="project-controls">
              {/* Search */}
              <div className="project-search">
                <div className="search-input-wrapper">
                  <Search size={16} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="project-filters">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                    onClick={() => setActiveFilter(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="view-mode-toggle">
                <button
                  className={`view-mode-btn ${currentViewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setCurrentViewMode('grid')}
                  title="Grid View"
                >
                  <Grid size={16} />
                </button>
                <button
                  className={`view-mode-btn ${currentViewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setCurrentViewMode('list')}
                  title="List View"
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Projects Grid/List */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              className="projects-loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="loading-projects">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="project-skeleton" />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              className={`projects-container projects-${currentViewMode}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={`${activeFilter}-${searchQuery}-${currentViewMode}`}
            >
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    className="project-item"
                  >
                    {currentViewMode === 'grid' ? (
                      <ProjectCard
                        project={project}
                        featured={project.featured || index < 2}
                        onLike={(id, liked) => console.log('Liked:', id, liked)}
                        onShare={(proj) => console.log('Shared:', proj)}
                      />
                    ) : (
                      <ProjectCardCompact
                        project={project}
                        featured={project.featured || index < 2}
                        onLike={(id, liked) => console.log('Liked:', id, liked)}
                        onShare={(proj) => console.log('Shared:', proj)}
                      />
                    )}
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className="no-projects"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="no-projects-content">
                    <Filter size={48} className="no-projects-icon" />
                    <h3>No Projects Found</h3>
                    <p>
                      No projects match your current filters. 
                      Try adjusting your search or category selection.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setActiveFilter('ALL');
                        setSearchQuery('');
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Summary */}
        <motion.div
          className="projects-stats"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">
                <Star size={20} />
              </div>
              <div className="stat-content">
                <span className="stat-number">{displayProjects.length}</span>
                <span className="stat-label">Featured Projects</span>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">
                <Eye size={20} />
              </div>
              <div className="stat-content">
                <span className="stat-number">
                  {displayProjects.reduce((sum, p) => sum + (p.views || 0), 0).toLocaleString()}
                </span>
                <span className="stat-label">Total Views</span>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">
                <Heart size={20} />
              </div>
              <div className="stat-content">
                <span className="stat-number">
                  {displayProjects.reduce((sum, p) => sum + (p.likes || 0), 0)}
                </span>
                <span className="stat-label">Total Likes</span>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">
                <Github size={20} />
              </div>
              <div className="stat-content">
                <span className="stat-number">
                  {displayProjects.reduce((sum, p) => sum + (p.stars || 0), 0)}
                </span>
                <span className="stat-label">GitHub Stars</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
