import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  ChevronDown,
} from "lucide-react";
import "./HeroSection.css";
import {
  DiReact,
  DiJava,
  DiMysql,
  DiDocker,
  DiJavascript1,
} from "react-icons/di";
import { SiTypescript, SiSpringboot } from "react-icons/si";

/**
 * Tech Stack Data with Icons
 * Each tech includes: name, icon (emoji/text), color, and animation delay
 */
const TECH_STACK = [
  { name: "MySQL", icon: DiMysql, color: "#00758f", delay: 0.5 },
  { name: "Docker", icon: DiDocker, color: "#2496ed", delay: 0.6 },
  { name: "Spring Boot", icon: SiSpringboot, color: "#6db33f", delay: 0.3 },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6", delay: 0.1 },
  { name: "React", icon: DiReact, color: "#61dafb", delay: 0 },
  { name: "Java", icon: DiJava, color: "#b07219", delay: 0.2 },
  { name: "JavaScript", icon: DiJavascript1, color: "#f7df1e", delay: 0.4 },
];


/**
 * Enhanced Navbar with Professional Design
 */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`glass-nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <a href="/about" className="nav-logo">
          {"< "}
          Raju
          {" />"}
        </a>
        <div className="nav-links">
          <button onClick={() => scrollToSection("about")} className="nav-link">
            About
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="nav-link"
          >
            Work
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="nav-link"
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
};

/**
 * Floating Tech Icon Component
 * Displays individual tech stack icons with orbital animation
 */
const FloatingTechIcon = ({ tech, index, totalIcons }) => {
  const angle = (index / totalIcons) * 360;
  const radius = 180;
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;
const IconComponent = tech.icon;
  return (
    <motion.div
      className="tech-icon-badge"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: tech.delay, duration: 0.6, type: "spring" }}
      whileHover={{ scale: 1.15 }}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        x: x - 20,
        y: y - 20,
      }}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotateZ: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4 + index * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="tech-icon-inner"
        style={{ borderColor: tech.color }}
      >
        <IconComponent className="tech-icon-react" size={32} color={tech.color} />
      </motion.div>
      <motion.div
        className="tech-label"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {tech.name}
      </motion.div>
    </motion.div>
  );
};

/**
 * Enhanced Hero Section with Tech Stack Icons & Deep Visuals
 */
export const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = [
    "💻 Full Stack Developer",
    "🎨 UI/UX Tinkerer",
    "🚀 Tech Enthusiast",
    "📚 Forever Learning™",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleResumeDownload = () => {
    // Create a simple resume download
    const resumeLink = document.createElement("a");
    resumeLink.href = "/resume.pdf"; // Update with your actual resume path
    resumeLink.download = "Raju_Resume.pdf";
    document.body.appendChild(resumeLink);
    resumeLink.click();
    document.body.removeChild(resumeLink);
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <>
      <Navbar />

      <section className="hero-section">
        {/* Deep Visual Backdrop - Enhanced 3D Effect */}
        <div className="hero-backdrop">
          {/* Animated Gradient Orbs */}
          <motion.div
            className="orb orb-1"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="orb orb-2"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1.2, 1, 1.2],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="orb orb-3"
            animate={{
              x: [0, 50, 0],
              y: [0, 100, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
          />

          {/* Grid Pattern Overlay */}
          <div className="grid-overlay" />

          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              initial={{
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                opacity: 0,
              }}
              animate={{
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="hero-content-wrapper">
          <div className="hero-container">
            {/* Left Content */}
            <motion.div
              className="hero-content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Status Badge */}
              <motion.div className="status-badge" variants={itemVariants}>
                <div className="status-dot" />
                <span className="status-text">Available for Hire</span>
              </motion.div>

              {/* Main Title */}
              <motion.h1 className="hero-title" variants={itemVariants}>
                Building
                <br />
                <span className="title-highlight">Digital Experiences</span>
              </motion.h1>

              {/* Subtitle with Rotating Roles */}
              <motion.p className="hero-subtitle" variants={itemVariants}>
                I am a{" "}
                <motion.span
                  className="typing-text"
                  key={roleIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  {roles[roleIndex]}
                </motion.span>
              </motion.p>

              {/* Description */}
              <motion.p className="hero-description" variants={itemVariants}>
                Learning daily, shipping weekly. 📦 Crafting elegant web
                solutions using modern tech stack. Full Stack Developer with
                passion for clean code and pixel-perfect UI.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div className="hero-actions" variants={itemVariants}>
                <motion.a
                  href="#projects"
                  className="btn-glass btn-primary"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work
                  <ArrowRight size={18} />
                </motion.a>

                <motion.button
                  onClick={handleResumeDownload}
                  className="btn-glass btn-secondary"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={18} />
                  Download Resume
                </motion.button>
              </motion.div>

              {/* Social Links */}
              <motion.div className="social-links" variants={itemVariants}>
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={20} />
                </motion.a>
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin size={20} />
                </motion.a>
                <motion.a
                  href="mailto:your-email@example.com"
                  className="social-link"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail size={20} />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right Content - Profile Image & Tech Stack Icons */}
            <motion.div
              className="hero-visuals"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Profile Image Container with Deep Visuals */}
              <div className="profile-image-container">
                {/* Animated Background Layers */}
                <motion.div
                  className="profile-bg-layer layer-1"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="profile-bg-layer layer-2"
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 50,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Glow Effect */}
                <div className="profile-glow" />

                {/* Profile Image */}
                <div className="profile-image">
                  {/* Placeholder - Replace with your actual image */}
                  <img
                    src="./Raju.jpg"
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </div>

                {/* Floating Tech Stack Icons Around Photo */}
                <div className="tech-icons-orbit">
                  {TECH_STACK.map((tech, index) => (
                    <FloatingTechIcon
                      key={tech.name}
                      tech={tech}
                      index={index}
                      totalIcons={TECH_STACK.length}
                    />
                  ))}
                </div>
              </div>

              {/* Scroll Indicator */}
              <motion.div
                className="scroll-indicator"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ChevronDown size={24} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
