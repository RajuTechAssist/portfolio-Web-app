import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowRight } from 'lucide-react';
import './ContactSection.css';

/**
 * Contact Section
 * - Compact 2-column layout: Form + Why hire me
 * - Social cards on top
 * - Cool glassmorphism effects
 * - No "fresher", no years of experience
 * - Fun but confident tone
 */

const contactLinks = [
  {
    id: 'email',
    icon: Mail,
    label: 'Email',
    value: 'your.email@example.com',
    href: 'mailto:your.email@example.com',
    color: '#3b82f6',
    message: '💌 Let\'s talk details',
    description: 'Direct line to my inbox'
  },
  {
    id: 'linkedin',
    icon: Linkedin,
    label: 'LinkedIn',
    value: '/in/your-username',
    href: 'https://linkedin.com/in/your-username',
    color: '#0a66c2',
    message: '🔗 Let\'s connect',
    description: 'Professional updates & conversations'
  },
  {
    id: 'github',
    icon: Github,
    label: 'GitHub',
    value: '@your-username',
    href: 'https://github.com/your-username',
    color: '#171515',
    message: '💻 View my code',
    description: 'Repos, experiments, and side projects'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  hover: {
    y: -8,
    transition: { duration: 0.2 }
  }
};

export const ContactSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [formStatus, setFormStatus] = useState('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formStatus !== 'idle') setFormStatus('idle');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 4000);
      return;
    }
    setFormStatus('success');
    // Reset form after success
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setFormStatus('idle');
    }, 2000);
  };

  return (
    <section className="contact-section" id="contact">
      <motion.div
        className="contact-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Header */}
        <motion.div className="contact-header" variants={itemVariants}>
          <div className="section-badge">📬 Contact</div>
          <h2 className="contact-title">Let's build something awesome</h2>
          <p className="contact-subtitle">
            A clear brief, a bit of caffeine, and a good problem to solve is
            all that's needed. If you have an idea, prototype, or messy legacy
            code, it's welcome here.
          </p>
        </motion.div>

        {/* Social cards */}
        <motion.div className="contact-cards-grid" variants={itemVariants}>
          {contactLinks &&
            contactLinks.map((link) => {
              const IconComponent = link.icon;
              const isHovered = hoveredCard === link.id;

              return (
                <motion.div
                  key={link.id}
                  className="contact-card-wrapper"
                  variants={cardVariants}
                  whileHover="hover"
                  onMouseEnter={() => setHoveredCard(link.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className="card-glow"
                    style={{
                      background: `radial-gradient(circle at 20% 0%, ${link.color}22, transparent 60%)`
                    }}
                  />
                  <a
                    href={link.href}
                    className="contact-card"
                    target="_blank"
                    rel="noreferrer"
                    style={{ borderColor: link.color }}
                  >
                    <div className="card-icon-container">
                      <IconComponent
                        className="card-icon"
                        size={32}
                        color={link.color}
                      />
                    </div>

                    <div className="card-content">
                      <h3 className="card-label">{link.label}</h3>
                      <p className="card-value">{link.value}</p>
                      <p className="card-description">{link.description}</p>
                    </div>

                    <div className="card-message">
                      <span>
                        {isHovered ? link.message : 'Tap to open'}
                      </span>
                      <ArrowRight size={16} />
                    </div>

                    <div className="card-border-bottom" />
                  </a>
                </motion.div>
              );
            })}
        </motion.div>

        {/* Main 2-column block: form + why hire me */}
        <motion.div className="contact-main-grid" variants={itemVariants}>
          {/* Contact form */}
          <motion.div
            className="contact-form-card"
            variants={cardVariants}
            whileHover="hover"
          >
            <h3 className="contact-form-title">Send a message</h3>
            <p className="contact-form-subtitle">
              Briefly tell what you need help with. Replies are thoughtful, not
              automated.
            </p>

            {formStatus === 'success' && (
              <div className="form-status form-status--success">
                ✅ Got your message! Will be in touch soon.
              </div>
            )}
            {formStatus === 'error' && (
              <div className="form-status form-status--error">
                ⚠️ Please fill email and message fields.
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-control contact-input"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Email<span className="required-dot">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control contact-input"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="subject">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  className="form-control contact-input"
                  placeholder="Project, collaboration, question..."
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">
                  Message<span className="required-dot">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-control contact-textarea"
                  rows={4}
                  placeholder="Share a quick overview of what you're looking for."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn--primary contact-submit">
                <span>Send message</span>
                <ArrowRight size={18} />
              </button>
            </form>
          </motion.div>

          {/* Why hire me */}
          <motion.div
            className="why-hire-card"
            variants={cardVariants}
            whileHover="hover"
          >
            <h3 className="why-hire-title">Why hire me?</h3>
            <p className="why-hire-subtitle">
              No buzzwords, just how collaboration actually feels when working
              together.
            </p>

            <div className="why-hire-grid">
              <div className="why-pill">
                <span className="why-emoji">⚡</span>
                <div>
                  <div className="why-pill-title">Fast, not rushed</div>
                  <div className="why-pill-text">
                    Features shipped quickly, with tests and stability in mind.
                  </div>
                </div>
              </div>

              <div className="why-pill">
                <span className="why-emoji">🧪</span>
                <div>
                  <div className="why-pill-title">Built to not break</div>
                  <div className="why-pill-text">
                    Automation mindset from day one: fewer regressions, calmer
                    releases.
                  </div>
                </div>
              </div>

              <div className="why-pill">
                <span className="why-emoji">🔧</span>
                <div>
                  <div className="why-pill-title">Full stack thinking</div>
                  <div className="why-pill-text">
                    From UI to API to DB and CI/CD, decisions consider the whole
                    system.
                  </div>
                </div>
              </div>

              <div className="why-pill">
                <span className="why-emoji">📚</span>
                <div>
                  <div className="why-pill-title">Always levelling up</div>
                  <div className="why-pill-text">
                    Continuously learning, refactoring, and improving patterns
                    as projects grow.
                  </div>
                </div>
              </div>
            </div>

            <p className="why-hire-footer">
              If you value clean code, realistic timelines, and honest
              communication, we will work well together.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactSection;