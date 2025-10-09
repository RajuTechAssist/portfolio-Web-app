// ========================================
// EXPERIENCE TIMELINE COMPONENT - 2025
// ========================================

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, Award, Briefcase } from 'lucide-react';

/**
 * Modern Experience Timeline Component
 * Features: Interactive timeline, smooth animations, responsive design
 */
const ExperienceTimeline = ({ experiences = [] }) => {
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const lineVariants = {
    hidden: { height: 0 },
    visible: {
      height: '100%',
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
        delay: 0.5
      }
    }
  };

  // Fallback data if no experiences provided
  const defaultExperiences = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovators Inc.',
      location: 'San Francisco, CA',
      startDate: '2023-01-01',
      endDate: null, // Current position
      description: 'Leading development of scalable web applications using React, Node.js, and cloud technologies. Mentoring junior developers and implementing best practices.',
      achievements: [
        'Increased application performance by 40%',
        'Led team of 5 developers',
        'Implemented CI/CD pipeline reducing deployment time by 60%',
        'Built microservices architecture serving 100K+ users'
      ],
      technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB', 'Docker'],
      type: 'FULL_TIME',
      companyUrl: 'https://techinnovators.com'
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'New York, NY',
      startDate: '2021-06-01',
      endDate: '2022-12-31',
      description: 'Developed and maintained multiple client projects using modern web technologies. Collaborated with design team to implement pixel-perfect UIs.',
      achievements: [
        'Built 5+ production applications',
        'Improved code quality with automated testing',
        'Mentored 2 junior developers',
        'Reduced bug reports by 30%'
      ],
      technologies: ['React', 'Python', 'PostgreSQL', 'Redux', 'Material-UI'],
      type: 'FULL_TIME',
      companyUrl: 'https://startupxyz.com'
    },
    {
      id: 3,
      title: 'Frontend Developer',
      company: 'Digital Solutions Ltd.',
      location: 'Austin, TX',
      startDate: '2020-03-01',
      endDate: '2021-05-31',
      description: 'Specialized in creating responsive and accessible user interfaces. Worked closely with UX designers to bring designs to life.',
      achievements: [
        'Improved website accessibility to WCAG AA standards',
        'Reduced page load times by 50%',
        'Implemented responsive design for mobile-first approach'
      ],
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'Sass', 'jQuery', 'Bootstrap'],
      type: 'FULL_TIME',
      companyUrl: 'https://digitalsolutions.com'
    },
    {
      id: 4,
      title: 'Junior Web Developer',
      company: 'WebCraft Agency',
      location: 'Remote',
      startDate: '2019-01-01',
      endDate: '2020-02-29',
      description: 'Started my professional journey building websites for small businesses. Learned fundamentals of web development and client communication.',
      achievements: [
        'Delivered 15+ client websites on time',
        'Achieved 98% client satisfaction rate',
        'Learned multiple web technologies quickly'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'WordPress', 'PHP'],
      type: 'FULL_TIME',
      companyUrl: 'https://webcraftagency.com'
    }
  ];

  const displayExperiences = experiences.length > 0 ? experiences : defaultExperiences;

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  // Calculate duration
  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const diffTime = Math.abs(end - start);
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    
    if (diffMonths < 12) {
      return `${diffMonths} month${diffMonths > 1 ? 's' : ''}`;
    } else {
      const years = Math.floor(diffMonths / 12);
      const months = diffMonths % 12;
      let duration = `${years} year${years > 1 ? 's' : ''}`;
      if (months > 0) {
        duration += ` ${months} month${months > 1 ? 's' : ''}`;
      }
      return duration;
    }
  };

  return (
    <div className="experience-timeline">
      <motion.div
        className="timeline-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Timeline line */}
        <div className="timeline-line">
          <motion.div
            className="timeline-progress"
            variants={lineVariants}
          />
        </div>

        {/* Timeline items */}
        <div className="timeline-items">
          {displayExperiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              className={`timeline-item ${index % 2 === 0 ? 'timeline-item-left' : 'timeline-item-right'}`}
              variants={itemVariants}
            >
              {/* Timeline marker */}
              <div className="timeline-marker">
                <motion.div
                  className="timeline-marker-inner"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Briefcase size={16} />
                </motion.div>
              </div>

              {/* Experience card */}
              <motion.div
                className="experience-card"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header */}
                <div className="experience-header">
                  <div className="experience-title-section">
                    <h3 className="experience-title">{experience.title}</h3>
                    <div className="experience-company">
                      {experience.companyUrl ? (
                        <a 
                          href={experience.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="company-link"
                        >
                          {experience.company}
                          <ExternalLink size={14} />
                        </a>
                      ) : (
                        <span>{experience.company}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="experience-type">
                    <span className={`type-badge type-${experience.type?.toLowerCase()}`}>
                      {experience.type?.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Meta info */}
                <div className="experience-meta">
                  <div className="experience-date">
                    <Calendar size={14} />
                    <span>
                      {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                    </span>
                    <span className="experience-duration">
                      ({calculateDuration(experience.startDate, experience.endDate)})
                    </span>
                  </div>
                  
                  <div className="experience-location">
                    <MapPin size={14} />
                    <span>{experience.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="experience-description">
                  {experience.description}
                </p>

                {/* Achievements */}
                {experience.achievements && experience.achievements.length > 0 && (
                  <div className="experience-achievements">
                    <h4 className="achievements-title">
                      <Award size={16} />
                      Key Achievements
                    </h4>
                    <ul className="achievements-list">
                      {experience.achievements.map((achievement, achievementIndex) => (
                        <motion.li
                          key={achievementIndex}
                          className="achievement-item"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: achievementIndex * 0.1 }}
                        >
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                {experience.technologies && experience.technologies.length > 0 && (
                  <div className="experience-technologies">
                    <h4 className="technologies-title">Technologies Used</h4>
                    <div className="technology-tags">
                      {experience.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          className="technology-tag"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ delay: techIndex * 0.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ExperienceTimeline;
