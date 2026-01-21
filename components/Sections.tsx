import React, { useState } from 'react';
import { Tab } from '../types';
import emailjs from '@emailjs/browser';

// --- Shared Components ---
const SectionHeader: React.FC<{ title: string; meta: string }> = ({ title, meta }) => (
  <div className="flex items-baseline justify-between mb-8 border-b-2 border-zinc-200 dark:border-zinc-800 pb-4">
    <h2 className="text-3xl font-bold uppercase tracking-tight">{title}</h2>
    <span className="font-mono text-xs text-primary">{meta}</span>
  </div>
);

const SkillPill: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center px-3 py-1 text-xs font-bold font-mono border-2 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 bg-transparent hover:border-primary hover:text-primary hover:shadow-[2px_2px_0_0_#8b5cf6] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all duration-200">
    {label}
  </span>
);

// --- Sections ---

export const ProfileSection: React.FC<{ onNavigate: (tab: Tab) => void }> = ({ onNavigate }) => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(formState.email)) {
      setEmailError('INVALID_EMAIL_SYNTAX');
      return;
    }
    
    setStatus('submitting');
    
    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          title: 'New Contact Form Submission',
          name: formState.name,
          email: formState.email,
          message: formState.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
      console.log('Email sent successfully:', result.text);
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setEmailError('');
      
      // Reset status after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send message. Please try again or email directly.');
      setStatus('idle');
    }
  };

  const inputClasses = "w-full bg-white dark:bg-black border-2 border-zinc-300 dark:border-zinc-700 p-3 font-mono text-sm outline-none transition-all duration-200 placeholder:text-zinc-400 hover:border-zinc-500 dark:hover:border-zinc-400 focus:border-primary focus:shadow-[4px_4px_0px_0px_#8b5cf6] focus:-translate-y-1 focus:-translate-x-1";

  return (
    <section className="section-content max-w-3xl mx-auto animate-fade-in">
      <div className="border-l-4 border-black dark:border-white pl-6 md:pl-8 py-2 mb-8 md:mb-10">
        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-4 leading-none uppercase">
          Digital<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Architect</span>
        </h2>
        <p className="text-base md:text-xl font-medium text-zinc-600 dark:text-zinc-400 max-w-lg leading-relaxed">
          Building robust, scalable solutions with a brutalist approach to code and design. Based in Delhi, India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
        <div className="bg-surface-light dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 p-4 md:p-6 shadow-brutal text-zinc-800 dark:text-zinc-200">
          <div className="flex items-center gap-2 mb-4 text-primary font-bold font-mono text-sm uppercase">
            <span className="material-symbols-outlined text-lg">terminal</span>
            Current Stack
          </div>
          <ul className="space-y-2 font-mono text-xs md:text-sm">
            <li>&gt; Java / Spring Boot</li>
            <li>&gt; JavaScript / React</li>
            <li>&gt; PostgreSQL / AWS</li>
            <li>&gt; GenAI Integration</li>
          </ul>
        </div>

        <div className="bg-surface-light dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 p-4 md:p-6 shadow-brutal text-zinc-800 dark:text-zinc-200">
          <div className="flex items-center gap-2 mb-4 text-primary font-bold font-mono text-sm uppercase">
            <span className="material-symbols-outlined text-lg">alternate_email</span>
            Contact Protocol
          </div>
          <div className="space-y-3 text-xs md:text-sm">
            <a className="flex items-center gap-3 hover:text-primary transition-colors font-medium truncate" href="mailto:rajukumar319247@gmail.com">
              <span className="material-symbols-outlined text-base">mail</span>
              rajukumar...@gmail.com
            </a>
            <a className="flex items-center gap-3 hover:text-primary transition-colors font-medium" href="#">
              <span className="material-symbols-outlined text-base">call</span>
              +91 8510893313
            </a>
            <a className="flex items-center gap-3 hover:text-primary transition-colors font-medium truncate" href="https://www.linkedin.com/in/raju-52b130247/" target="_blank" rel="noreferrer">
              <span className="material-symbols-outlined text-base">link</span>
              linkedin.com/in/raju...
            </a>
            <a className="flex items-center gap-3 hover:text-primary transition-colors font-medium truncate" href="https://github.com/RajuTechAssist" target="_blank" rel="noreferrer">
              <span className="material-symbols-outlined text-base">code</span>
              github.com/RajuTechAssist
            </a>
            <a className="flex items-center gap-3 hover:text-primary transition-colors font-medium truncate" href="https://www.instagram.com/oooye.raju/" target="_blank" rel="noreferrer">
              <span className="material-symbols-outlined text-base">code</span>
              instagram.com/oooye.raju/
            </a>
          </div>
        </div>
      </div>

      {/* Freelance Services Module */}
      <div className="mb-8 md:mb-12">
        <div className="bg-yellow-400 dark:bg-yellow-600 border-2 border-black dark:border-white p-4 mb-6 shadow-brutal flex flex-col md:flex-row items-center gap-4">
          <span className="material-symbols-outlined text-4xl text-black dark:text-white animate-pulse">campaign</span>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-lg font-bold uppercase text-black dark:text-white leading-tight">
              AVAILABLE FOR SIDE_QUESTS
            </h3>
            <p className="font-mono text-xs md:text-sm text-black dark:text-zinc-100 font-medium mt-1">
              "Will code for currency. I turn caffeine into deployable software. Check out the menu below."
            </p>
          </div>
          <div className="hidden md:block text-4xl font-mono font-bold text-black/20 dark:text-white/20 select-none">
            $$$
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { 
              title: "Web Development", 
              desc: "Building pixel-perfect interfaces that don't explode on mobile devices.",
              icon: "html" 
            },
            { 
              title: "Tech Content Writing", 
              desc: "I translate 'Developer Klingon' into human-readable documentation.",
              icon: "edit_note" 
            },
            { 
              title: "Java/CS Tutoring", 
              desc: "Debugging your brain. I explain recursion until you stop crying.",
              icon: "school" 
            },
            { 
              title: "AI Integration", 
              desc: "Sprinkling LLM magic on boring apps. Skynet is not included.",
              icon: "psychology" 
            },
            { 
              title: "Payment Systems", 
              desc: "Secure gateways for acquiring funds. Because exposure doesn't pay rent.",
              icon: "credit_card" 
            },
            { 
              title: "E-commerce Ops", 
              desc: "Digital storefronts. 24/7 revenue streams while you sleep.",
              icon: "storefront" 
            }
          ].map((service, index) => (
            <div key={index} className="bg-surface-light dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 p-4 hover:border-primary hover:-translate-y-1 transition-transform group">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">{service.icon}</span>
                <span className="font-bold text-xs uppercase tracking-wider">{service.title}</span>
              </div>
              <p className="font-mono text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="mb-8 md:mb-12 border-2 border-black dark:border-white p-6 md:p-8 bg-surface-light dark:bg-zinc-900 shadow-brutal group">
        <h3 className="text-xl font-bold mb-6 uppercase flex items-center gap-2 border-b border-zinc-300 dark:border-zinc-700 pb-2">
          <span className="material-symbols-outlined group-hover:text-primary transition-colors">send</span>
          Direct_Transmission
        </h3>
        
        {status === 'success' ? (
          <div className="bg-green-100 dark:bg-green-900/30 border-2 border-green-500 p-6 text-center animate-fade-in">
            <span className="material-symbols-outlined text-4xl text-green-600 dark:text-green-400 mb-2">check_circle</span>
            <p className="font-mono text-green-800 dark:text-green-200 font-bold uppercase">{'>'} PACKET_TRANSMITTED_SUCCESSFULLY</p>
            <p className="text-xs text-green-700 dark:text-green-300 mt-2 font-mono">Stand by for handshake protocol...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group/input">
                <label className="block text-[10px] font-mono font-bold uppercase mb-2 text-zinc-500 tracking-wider group-focus-within/input:text-primary transition-colors">Identity ID</label>
                <input 
                  required
                  type="text" 
                  value={formState.name}
                  onChange={e => setFormState({...formState, name: e.target.value})}
                  className={inputClasses}
                  placeholder="ENTER_NAME"
                />
              </div>
              <div className="group/input">
                <label className={`block text-[10px] font-mono font-bold uppercase mb-2 tracking-wider transition-colors ${emailError ? 'text-red-500' : 'text-zinc-500 group-focus-within/input:text-primary'}`}>
                  Return Frequency
                  {emailError && <span className="ml-2 text-red-500 animate-pulse">! ERROR</span>}
                </label>
                <input 
                  required
                  type="email" 
                  value={formState.email}
                  onChange={e => {
                    setFormState({...formState, email: e.target.value});
                    if (emailError) setEmailError('');
                  }}
                  className={emailError 
                    ? "w-full bg-white dark:bg-black border-2 border-red-500 p-3 font-mono text-sm outline-none transition-all duration-200 text-red-600 dark:text-red-400 placeholder:text-zinc-400 focus:border-red-600 focus:shadow-[4px_4px_0px_0px_#dc2626] focus:-translate-y-1 focus:-translate-x-1"
                    : inputClasses
                  }
                  placeholder="ENTER_EMAIL"
                />
                {emailError && (
                  <p className="mt-1 text-[10px] font-mono font-bold text-red-500 uppercase animate-fade-in">
                    &gt; {emailError}
                  </p>
                )}
              </div>
            </div>
            <div className="group/input">
              <label className="block text-[10px] font-mono font-bold uppercase mb-2 text-zinc-500 tracking-wider group-focus-within/input:text-primary transition-colors">Data Packet</label>
              <textarea 
                required
                rows={4}
                value={formState.message}
                onChange={e => setFormState({...formState, message: e.target.value})}
                className={inputClasses}
                placeholder="INPUT_MESSAGE_CONTENT..."
              />
            </div>
            <div className="flex justify-end">
              <button 
                disabled={status === 'submitting'}
                type="submit" 
                className="bg-black dark:bg-white text-white dark:text-black font-bold font-mono uppercase px-8 py-3 border-2 border-transparent hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white transition-all shadow-brutal active:shadow-none active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 group/btn"
              >
                {status === 'submitting' ? (
                  <>
                    <span className="animate-spin material-symbols-outlined text-sm">progress_activity</span>
                    UPLOADING...
                  </>
                ) : (
                  <>
                    INITIATE_SEND
                    <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-4 pb-4 md:pb-8 mb-4">
        <button 
          onClick={() => onNavigate(Tab.PROJECTS)}
          className="bg-transparent text-zinc-800 dark:text-zinc-200 font-bold font-mono uppercase px-6 py-3 border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors w-full md:w-auto text-center"
        >
          View_Full_Portfolio_&gt;
        </button>

        <a 
          href="/Raju_CV.pdf"
          download="Raju_Kumar_CV.pdf"
          className="bg-primary text-white font-bold font-mono uppercase px-6 py-3 border-2 border-black dark:border-white shadow-brutal hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all w-full md:w-auto flex items-center justify-center gap-2 group"
        >
          <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">download</span>
          Download_CV_v2.0
        </a>
      </div>

    </section>
  );
};

const ProjectCard: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className="group relative bg-white dark:bg-zinc-900 border-2 border-black dark:border-white mb-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-brutal">
      <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 font-mono uppercase">
        Featured
      </div>
      <div className="p-6 md:p-8">
        <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
          GLOW SERVICES
        </h3>
        <p className="text-zinc-500 font-mono text-xs mb-6 uppercase tracking-wider">Full Stack E-Commerce • Spring Boot • React</p>
        
        <div className="mb-6">
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
            A robust, full-stack web application designed to digitize beauty and wellness operations. Hybridizing service booking and e-commerce with separate secure portals for Customers and Admins.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-surface-light dark:bg-zinc-800 p-3 border border-zinc-200 dark:border-zinc-700">
            <span className="block text-primary font-bold text-lg mb-1">25%</span>
            <span className="text-xs font-mono text-zinc-500 uppercase">Bug Reduction</span>
          </div>
          <div className="bg-surface-light dark:bg-zinc-800 p-3 border border-zinc-200 dark:border-zinc-700">
            <span className="block text-primary font-bold text-lg mb-1">AI</span>
            <span className="text-xs font-mono text-zinc-500 uppercase">Content Auto-Gen</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {['Java Spring Boot', 'React.js', 'PostgreSQL', 'AWS S3', 'Google Gemini', 'JWT'].map(tech => (
             <span key={tech} className="px-2 py-1 text-xs font-bold border border-zinc-300 dark:border-zinc-700 uppercase">{tech}</span>
          ))}
        </div>

        {isExpanded && (
          <div className="mt-8 mb-8 border-t-2 border-dashed border-zinc-200 dark:border-zinc-800 pt-6 animate-fade-in space-y-8">
            {/* 1. Technology Stack */}
            <div>
              <h4 className="font-mono text-sm font-bold text-primary mb-3 uppercase">{'> 01_TECHNOLOGY_STACK'}</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-surface-light dark:bg-zinc-800 p-4 border border-zinc-200 dark:border-zinc-700">
                  <strong className="block mb-2 font-bold uppercase">Frontend (Client)</strong>
                  <ul className="list-disc list-inside space-y-1 text-zinc-600 dark:text-zinc-400 text-xs">
                    <li>React.js (Vite) + Tailwind CSS</li>
                    <li>Context API (Cart, Auth)</li>
                    <li>Lucide-React Icons</li>
                  </ul>
                </div>
                <div className="bg-surface-light dark:bg-zinc-800 p-4 border border-zinc-200 dark:border-zinc-700">
                  <strong className="block mb-2 font-bold uppercase">Backend (Server)</strong>
                  <ul className="list-disc list-inside space-y-1 text-zinc-600 dark:text-zinc-400 text-xs">
                    <li>Java Spring Boot v3.x</li>
                    <li>PostgreSQL + Hibernate JPA</li>
                    <li>Spring Security (RBAC/JWT)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2. Features */}
            <div>
               <h4 className="font-mono text-sm font-bold text-primary mb-3 uppercase">{'> 02_CORE_MODULES'}</h4>
               <div className="space-y-4">
                 <div>
                   <strong className="text-sm uppercase tracking-wide border-b border-zinc-300 dark:border-zinc-700">Customer Portal</strong>
                   <p className="text-xs mt-2 text-zinc-600 dark:text-zinc-400">
                     Features a visually engaging landing page, dynamic service booking system with double-booking prevention, and a full e-commerce shopping cart with state persistence. Includes a personal dashboard for order history and loyalty rewards.
                   </p>
                 </div>
                 <div>
                   <strong className="text-sm uppercase tracking-wide border-b border-zinc-300 dark:border-zinc-700">Admin Portal</strong>
                   <p className="text-xs mt-2 text-zinc-600 dark:text-zinc-400">
                     Secure dashboard for managing operations. Includes "AI Writer" powered by Google Gemini to generate blog posts, CMS for services/products (images stored on AWS S3), and business analytics (RevPATH, Staff Utilization).
                   </p>
                 </div>
               </div>
            </div>

            {/* 3. Architecture */}
            <div>
               <h4 className="font-mono text-sm font-bold text-primary mb-3 uppercase">{'> 03_SYSTEM_ARCHITECTURE'}</h4>
               <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                 <li className="flex items-center gap-2">
                   <span className="material-symbols-outlined text-sm">lock</span>
                   JWT Stateless Authentication
                 </li>
                 <li className="flex items-center gap-2">
                   <span className="material-symbols-outlined text-sm">cloud</span>
                   AWS S3 Image Offloading
                 </li>
                 <li className="flex items-center gap-2">
                   <span className="material-symbols-outlined text-sm">api</span>
                   Global Exception Handling
                 </li>
                 <li className="flex items-center gap-2">
                   <span className="material-symbols-outlined text-sm">health_and_safety</span>
                   KeepAlive Mechanism
                 </li>
               </ul>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-6">
          <div className="flex gap-4">
            <a 
              href="https://glow-service.studio" 
              target="_blank" 
              rel="noreferrer"
              className="bg-black dark:bg-white text-white dark:text-black text-xs font-bold px-4 py-2 uppercase hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white transition-colors"
            >
              View Live Demo
            </a>
            <a className="text-xs font-bold border-b-2 border-zinc-300 dark:border-zinc-700 hover:border-primary hover:text-primary transition-colors py-2 cursor-pointer">
              Source Code
            </a>
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-mono font-bold text-zinc-500 hover:text-primary uppercase flex items-center gap-1"
          >
            {isExpanded ? '[-] Collapse_Log' : '[+] Expand_Mission_Log'}
          </button>
        </div>
      </div>
    </article>
  );
};

export const ProjectsSection: React.FC = () => (
  <section className="section-content max-w-3xl mx-auto animate-fade-in">
    <SectionHeader title="Mission Log" meta="STATUS: DEPLOYED" />
    <ProjectCard />
    
    <div className="p-8 border-2 border-dashed border-zinc-300 dark:border-zinc-700 text-center">
      <span className="material-symbols-outlined text-4xl text-zinc-400 mb-2">construction</span>
      <p className="font-mono text-sm text-zinc-500">ADDITIONAL ARCHIVES ENCRYPTED</p>
    </div>
  </section>
);

export const SkillsSection: React.FC = () => (
  <section className="section-content max-w-3xl mx-auto animate-fade-in">
    <SectionHeader title="Arsenal" meta="CAPABILITY: HIGH" />
    
    <div className="space-y-8">
      <div>
        <h3 className="font-mono text-sm font-bold text-zinc-500 mb-4 uppercase tracking-widest">/ Core_Technologies</h3>
        <div className="flex flex-wrap gap-3">
          {['Java', 'JavaScript (ES6+)', 'Spring Boot', 'React.js', 'SQL'].map(skill => (
            <SkillPill key={skill} label={skill} />
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-mono text-sm font-bold text-zinc-500 mb-4 uppercase tracking-widest">/ Infrastructure_&_Tools</h3>
        <div className="flex flex-wrap gap-3">
          {['AWS S3', 'Docker', 'Git / GitHub', 'Postman', 'Vercel', 'Hibernate'].map(skill => (
            <SkillPill key={skill} label={skill} />
          ))}
        </div>
      </div>

      <div className="bg-black dark:bg-zinc-900 text-white p-6 border-l-4 border-primary mt-8">
        <h3 className="text-xl font-bold mb-2">Focus Area</h3>
        <p className="font-mono text-sm text-zinc-400">
          Currently exploring advanced Microservices patterns and deepening knowledge in System Design for high-scale applications.
        </p>
      </div>
    </div>
  </section>
);

export const ExperienceSection: React.FC = () => (
  <section className="section-content max-w-3xl mx-auto animate-fade-in">
    <SectionHeader title="Trajectory" meta="YEARS: 2023-2025" />
    
    <div className="relative space-y-8 pl-4 border-l-2 border-dashed border-zinc-300 dark:border-zinc-700">
      <div className="relative pl-8">
        <span className="absolute -left-[9px] top-1 h-4 w-4 bg-primary border-2 border-white dark:border-black rounded-sm"></span>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
          <h3 className="text-xl font-bold">Quality Analyst Intern</h3>
          <span className="font-mono text-xs font-bold bg-zinc-200 dark:bg-zinc-800 px-2 py-1">2023/12 – 2024/06</span>
        </div>
        <div className="text-sm font-bold text-zinc-500 dark:text-zinc-400 mb-4 uppercase tracking-wide">KIET Infra Engineering Pvt. Ltd.</div>
        <ul className="list-disc ml-4 space-y-2 text-zinc-600 dark:text-zinc-300 text-sm">
          <li>Reduced post-release bugs by <span className="text-primary font-bold">25%</span> through structured manual & regression testing.</li>
          <li>Accelerated bug resolution time by <span className="text-primary font-bold">20%</span> via detailed QA documentation.</li>
        </ul>
      </div>

      <div className="relative pl-8">
        <span className="absolute -left-[9px] top-1 h-4 w-4 bg-zinc-400 border-2 border-white dark:border-black rounded-sm"></span>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
          <h3 className="text-xl font-bold">Full Stack Certification</h3>
          <span className="font-mono text-xs font-bold bg-zinc-200 dark:bg-zinc-800 px-2 py-1">2024/08 – Present</span>
        </div>
        <div className="text-sm font-bold text-zinc-500 dark:text-zinc-400 mb-4 uppercase tracking-wide">CodeSquadz</div>
        <p className="text-zinc-600 dark:text-zinc-300 text-sm">
          Intensive training in Java Full Stack development, specializing in Spring Boot microservices architecture and React frontend integration.
        </p>
      </div>
    </div>
  </section>
);

export const EducationSection: React.FC = () => (
  <section className="section-content max-w-3xl mx-auto animate-fade-in">
    <SectionHeader title="Data Bank" meta="ACADEMIC" />
    
    <div className="bg-surface-light dark:bg-zinc-900 border-2 border-black dark:border-white p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
      <div className="w-16 h-16 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-2xl flex-shrink-0 border-2 border-primary shadow-brutal">
        BCA
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-1">Bachelor of Computer Application</h3>
        <p className="text-primary font-mono font-bold text-sm mb-4">IGNOU, New Delhi</p>
        <p className="text-zinc-600 dark:text-zinc-300">
          Completed undergraduate studies with a focus on computer science fundamentals, software engineering, and database management systems.
        </p>
        <div className="mt-4 inline-block px-3 py-1 border border-zinc-400 text-xs font-mono">
          Class of 2023
        </div>
      </div>
    </div>
  </section>
);