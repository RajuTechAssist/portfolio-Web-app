import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/portfolio/ProjectCard';
import { apiService } from '../services/api';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Call the API
                const data = await apiService.getProjects();
                console.log('✅ Projects loaded:', data);
                setProjects(data);
            } catch (err) {
                console.error('❌ Error fetching projects:', err);
                setError(err.message || 'Failed to load projects');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Loading state
    if (loading) {
        return (
            <div className="projects-page">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading projects...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="projects-page">
                <div className="error-container">
                    <h2>⚠️ Error Loading Projects</h2>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Filter projects
    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(p => p.status === filter);

    return (
        <div className="projects-page">
            <section className="projects-hero">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1>My Projects</h1>
                    <p>Explore my portfolio of web development projects</p>
                </motion.div>
            </section>

            {/* Filter Tabs */}
            <div className="project-filters">
                <button 
                    className={filter === 'all' ? 'active' : ''}
                    onClick={() => setFilter('all')}
                >
                    All ({projects.length})
                </button>
                <button 
                    className={filter === 'ACTIVE' ? 'active' : ''}
                    onClick={() => setFilter('ACTIVE')}
                >
                    Active
                </button>
                <button 
                    className={filter === 'COMPLETED' ? 'active' : ''}
                    onClick={() => setFilter('COMPLETED')}
                >
                    Completed
                </button>
            </div>

            {/* Projects Grid */}
            <div className="projects-grid">
                {filteredProjects.length === 0 ? (
                    <div className="no-projects">
                        <p>No projects found</p>
                    </div>
                ) : (
                    filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ProjectCard 
                                project={project} 
                                featured={project.featured}
                            />
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Projects;
