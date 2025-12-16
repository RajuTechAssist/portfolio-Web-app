import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { User, Code2, Cpu, GraduationCap, Zap, Globe, Database, Layout } from 'lucide-react';
import './AboutSection.css';
import SkillCrystals from '../3d/SkillCrystals';

const BentoCard = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={`bento-card ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - left}px`);
        e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - top}px`);
      }}
    >
      {children}
    </motion.div>
  );
};

export const AboutSection = () => {
  const techStack = [
    "React", "Three.js", "Node.js", "TailwindCSS", 
    "TypeScript", "Next.js", "MongoDB", "Framer Motion",
    "Git", "Docker", "AWS", "GraphQL"
  ];

  return (
    <section className="about-section" id="about">
      {/* Background Glows */}
      <div className="about-bg-glow glow-1" />
      <div className="about-bg-glow glow-2" />

      <div className="about-container">
        
        {/* Section Header */}
        <div className="section-header">
          <motion.span 
            className="section-subtitle"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            // DISCOVER
          </motion.span>
          <br />
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            About Me
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid">
          
          {/* 1. Bio Card (Wide) */}
          <BentoCard className="card-bio">
            <div className="card-icon">
              <User size={24} />
            </div>
            <h3 className="card-title">Who I Am</h3>
            <p className="card-text">
              I'm a passionate Full Stack Developer with a unique blend of creative design 
              and technical engineering. My journey started with a curiosity for how things work, 
              evolving into a career building scalable web applications.
              <br /><br />
              I believe in "Clean Code" and "User-Centric Design". Whether it's optimizing 
              backend algorithms or crafting fluid frontend animations, I treat every line of code as art.
            </p>
          </BentoCard>

          {/* 2. Tech Stack (Tall) */}
          <BentoCard className="card-tech-stack" delay={0.2}>
            <div className="card-icon">
              <Cpu size={24} />
            </div>
            <h3 className="card-title">Tech Arsenal</h3>
            <div className="tech-tags">
              {techStack.map((tech, i) => (
                <span key={i} className="tech-tag">{tech}</span>
              ))}
            </div>
          </BentoCard>

          {/* 3. Stats Card (Small) */}
          <BentoCard className="card-stats" delay={0.3}>
            <span className="stat-number">10+</span>
            <span className="stat-label">Projects Completed</span>
          </BentoCard>

          {/* 4. Attributes Card (Wide) */}
          <BentoCard className="card-attributes" delay={0.4}>
            <div className="card-icon">
              <Zap size={24} />
            </div>
            <h3 className="card-title">What Drives Me</h3>
            <div className="attributes-list">
              <div className="attribute-item">
                <Globe size={18} />
                <span>Scalable Architecture</span>
              </div>
              <div className="attribute-item">
                <Layout size={18} />
                <span>Responsive Design</span>
              </div>
              <div className="attribute-item">
                <Code2 size={18} />
                <span>Clean Code Practices</span>
              </div>
              <div className="attribute-item">
                <Database size={18} />
                <span>Data Optimization</span>
              </div>
            </div>
          </BentoCard>

          {/* 5. Education Card (Small/Medium) */}
          <BentoCard className="card-education" delay={0.5}>
            <div className="card-icon">
              <GraduationCap size={24} />
            </div>
            <h3 className="card-title">Education</h3>
            <div className="education-item">
              <p className="card-text" style={{ fontWeight: 600, color: '#fff' }}>BCA Graduate</p>
              <p className="card-text" style={{ fontSize: '0.9rem' }}>IGNOU University</p>
              <div style={{ margin: '1rem 0', height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
              <p className="card-text" style={{ fontWeight: 600, color: '#fff' }}>Full Stack Certified</p>
              <p className="card-text" style={{ fontSize: '0.9rem' }}>CodeSquadz Bootcamp</p>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;