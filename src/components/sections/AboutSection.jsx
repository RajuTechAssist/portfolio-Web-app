import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  DiReact,
  DiJava,
  DiMysql,
  DiDocker,
  DiJavascript1,
  DiPython,
} from "react-icons/di";
import { SiTypescript, SiSpringboot, SiGit, SiJenkins } from "react-icons/si";
import "./AboutSection.css";

/**
 * About Section - Enhanced with Glassmorphism Design
 * Inspired by modern portfolio layouts with interactive cards
 */

// Books Data
const BOOKS = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    emoji: "📕",
    description: "Build better habits, one small change at a time",
    highlight: true,
  },
  {
    id: 2,
    title: "The Pragmatic Programmer",
    author: "Thomas & Hunt",
    emoji: "💻",
    description: "Your journey to mastery in software development",
    highlight: false,
  },
  {
    id: 3,
    title: "Design of Everyday Things",
    author: "Don Norman",
    emoji: "🎨",
    description: "Understanding design principles and user experience",
    highlight: false,
  },
];

// Tech Stack Data
const TECH_STACK = [
  { name: "JavaScript", icon: DiJavascript1, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "React", icon: DiReact, color: "#61DAFB" },
  { name: "Java", icon: DiJava, color: "#B07219" },
  { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
  { name: "Python", icon: DiPython, color: "#3776AB" },
  { name: "MySQL", icon: DiMysql, color: "#00758F" },
  { name: "Docker", icon: DiDocker, color: "#2496ED" },
  { name: "Git", icon: SiGit, color: "#F1502F" },
  { name: "Jenkins", icon: SiJenkins, color: "#D33C3C" },
];

// Interests/Hobbies - Now using website colors (teal/blue/cyan palette)
const INITIAL_INTERESTS = [
  { id: 1, emoji: "🎨", label: "Painting" },
  { id: 2, emoji: "📸", label: "Photography" },
  { id: 3, emoji: "🎮", label: "Gaming" },
  { id: 4, emoji: "🥾", label: "Traveling" },
  { id: 5, emoji: "🎵", label: "Music" },
  { id: 6, emoji: "📖", label: "Reading" },
  { id: 7, emoji: "⚡", label: "Fitness" },
];

// Why Work With Me
const WHY_WORK = [
  {
    emoji: "🎯",
    title: "Detail Oriented",
    description: "I obsess over pixel-perfect implementations and clean code",
  },
  {
    emoji: "⚡",
    title: "Fast Learner",
    description: "Pick up new tech stacks quickly and ship production-ready code",
  },
  {
    emoji: "🤝",
    title: "Team Player",
    description: "Collaborate effectively, communicate clearly, support teammates",
  },
  {
    emoji: "🚀",
    title: "Execution Focus",
    description: "Ideas mean nothing without execution. I ship. Every week.",
  },
];

/**
 * Book Card Component
 */
const BookCard = ({ book, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="book-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className={`book-cover ${book.highlight ? "highlight" : ""}`}>
        <span className="cover-emoji">{book.emoji}</span>
      </div>
      <motion.div
        className="book-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <h4>{book.title}</h4>
        <p className="author">{book.author}</p>
        <p className="description">{book.description}</p>
      </motion.div>
      <div className="book-footer">
        <h4>{book.title}</h4>
        <p className="author">{book.author}</p>
      </div>
    </motion.div>
  );
};

/**
 * Tech Icon Component
 */
const TechIcon = ({ tech, index }) => {
  const IconComponent = tech.icon;

  return (
    <motion.div
      className="tech-badge"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.4, type: "spring" }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.1, y: -4 }}
    >
      <div className="tech-icon-wrapper" style={{ borderColor: tech.color }}>
        <IconComponent size={28} color={tech.color} />
      </div>
      <span className="tech-label">{tech.name}</span>
    </motion.div>
  );
};

/**
 * Draggable Interest Pill Component
 */
const InterestPill = ({ interest, index, onDragStart, onDragEnd }) => {
  return (
    <motion.div
      className="interest-pill"
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.08 }}
      whileDrag={{ scale: 1.05, opacity: 0.8 }}
    >
      <span className="interest-emoji">{interest.emoji}</span>
      <span className="interest-label">{interest.label}</span>
    </motion.div>
  );
};

/**
 * Why Work With Me Card Component
 */
const WhyCard = ({ item, index }) => {
  return (
    <motion.div
      className="why-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className="why-emoji">{item.emoji}</div>
      <h4>{item.title}</h4>
      <p>{item.description}</p>
    </motion.div>
  );
};

/**
 * Main About Section Component
 */
export const AboutSection = () => {
  const [interests, setInterests] = useState(INITIAL_INTERESTS);
  const [draggedInterest, setDraggedInterest] = useState(null);

  // --- ADD FADE LOGIC ---
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  // ----------------------

  const handleDragStart = (interest) => {
    setDraggedInterest(interest);
  };

  const handleDragEnd = () => {
    setDraggedInterest(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dropEffect = "move";
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (!draggedInterest) return;

    const draggedIndex = interests.findIndex(
      (interest) => interest.id === draggedInterest.id
    );

    if (draggedIndex !== targetIndex) {
      const newInterests = [...interests];
      const [draggedItem] = newInterests.splice(draggedIndex, 1);
      newInterests.splice(targetIndex, 0, draggedItem);
      setInterests(newInterests);
    }
  };

  return (
    <motion.section id="about" className="about-section" ref={sectionRef}
      style={{ opacity, scale }}>
      {/* Animated Background Elements */}
      <div className="about-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="about-container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="section-badge">
            <span>👋</span>
            <span>ABOUT ME</span>
          </div>
          <h2 className="section-title">A Glimpse Into My World</h2>
          <p className="section-subtitle">
            Learn more about who I am, what I do, and what inspires me.
          </p>
        </motion.div>

        {/* Main Content Grid - REORDERED FOR MOBILE FIRST */}
        <div className="about-content-grid">
          {/* Left Column - My Toolbox (First on mobile, left on desktop) */}
          <div className="grid-column order-mobile-1">
            {/* My Toolbox Card */}
            <motion.div
              className="card-wrapper glass-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="card-header">
                <h3>
                  <span className="card-icon">🛠️</span>
                  My Toolbox
                </h3>
                <p className="card-subtitle">
                  Explore the technologies and tools I use to craft exceptional
                  digital experiences.
                </p>
              </div>
              <div className="tech-grid">
                {TECH_STACK.map((tech, idx) => (
                  <TechIcon key={tech.name} tech={tech} index={idx} />
                ))}
              </div>
            </motion.div>

            {/* Map/Location Card */}
            <motion.div
              className="card-wrapper glass-card map-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <div className="card-header">
                <h3>
                  <span className="card-icon">📍</span>
                  Based In
                </h3>
              </div>
              <div className="location-content">
                <div className="map-visual">
                  🗺️ Delhi, India
                </div>
                <p className="location-text">
                  Timezone: IST (GMT+5:30)
                  <br />
                  Available for freelance & full-time opportunities
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Books & Interests (Second on mobile, right on desktop) */}
          <div className="grid-column order-mobile-2">
            {/* My Reads Card */}
            <motion.div
              className="card-wrapper glass-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="card-header">
                <h3>
                  <span className="card-icon">📚</span>
                  My Reads
                </h3>
                <p className="card-subtitle">
                  Explore the books shaping my perspectives.
                </p>
              </div>
              <div className="books-grid">
                {BOOKS.map((book, idx) => (
                  <BookCard key={book.id} book={book} index={idx} />
                ))}
              </div>
            </motion.div>

            {/* Beyond the Code Card - With Drag & Drop */}
            <motion.div
              className="card-wrapper glass-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="card-header">
                <h3>
                  <span className="card-icon">🌟</span>
                  Beyond the Code
                </h3>
                <p className="card-subtitle">
                  Explore my interests and hobbies beyond the digital realm.
                </p>
              </div>
              <div className="interests-grid" onDragOver={handleDragOver}>
                {interests.map((interest, idx) => (
                  <div
                    key={interest.id}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, idx)}
                    className="interest-drop-zone"
                  >
                    <InterestPill
                      interest={interest}
                      index={idx}
                      onDragStart={() => handleDragStart(interest)}
                      onDragEnd={handleDragEnd}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Why Work With Me Section */}
        <motion.div
          className="why-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="why-title">Why Work With Me?</h3>
          <div className="why-grid">
            {WHY_WORK.map((item, idx) => (
              <WhyCard key={idx} item={item} index={idx} />
            ))}
          </div>
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          className="about-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>Ready to build something awesome? Let's create magic together. ✨</p>
          <motion.a
            href="#contact"
            className="cta-button"
            whileHover={{ scale: 1.05, x: 8 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Talk →
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutSection;