import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Github } from 'lucide-react';
import ProjectDisplay from '../3d/ProjectDisplay';
import './ProjectsSection.css';

const projects = [
  {
    title: "E-Commerce AI",
    description: "A next-gen shopping platform powered by AI recommendations. Features real-time inventory tracking, 3D product previews, and a seamless checkout experience built with Stripe.",
    tech: ["React", "Three.js", "Node.js", "Stripe"],
    links: { live: "#", github: "#" }
  },
  {
    title: "Neural Dashboard",
    description: "Data visualization dashboard for monitoring neural network training in real-time. Uses WebSockets for live data updates and D3.js for complex graph rendering.",
    tech: ["TypeScript", "D3.js", "Socket.io", "Express"],
    links: { live: "#", github: "#" }
  },
  {
    title: "Cyber Chat App",
    description: "End-to-end encrypted messaging application with a cyberpunk aesthetic. Features self-destructing messages, group chats, and file sharing capabilities.",
    tech: ["React Native", "Firebase", "Encryption", "Redux"],
    links: { live: "#", github: "#" }
  }
];

export const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const current = projects[currentIndex];

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        
        {/* Left Side: Project Details */}
        <div className="project-info">
          <div className="project-header">
            <span className="project-number">
              PROJECT 0{currentIndex + 1} / 0{projects.length}
            </span>
            <AnimatePresence mode="wait">
              <motion.h2 
                key={currentIndex}
                className="project-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {current.title}
              </motion.h2>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.p 
              key={currentIndex}
              className="project-desc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {current.description}
            </motion.p>
          </AnimatePresence>

          <div className="project-tech">
            {current.tech.map((tech, i) => (
              <span key={`${currentIndex}-${i}`} className="tech-pill">
                {tech}
              </span>
            ))}
          </div>

          <div className="project-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
             <a href={current.links.github} className="nav-btn" aria-label="GitHub">
                <Github size={20} />
             </a>
             <a href={current.links.live} className="nav-btn" aria-label="Live Demo">
                <ExternalLink size={20} />
             </a>
          </div>

          <div className="project-nav">
            <button onClick={prevProject} className="nav-btn" aria-label="Previous Project">
              <ArrowLeft size={20} />
            </button>
            <button onClick={nextProject} className="nav-btn" aria-label="Next Project">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Right Side: 3D Carousel */}
        <div className="project-3d-wrapper">
          <ProjectDisplay 
            currentProject={currentIndex} 
            totalProjects={projects.length} 
          />
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;