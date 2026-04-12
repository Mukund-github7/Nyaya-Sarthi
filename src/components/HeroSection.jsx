import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './HeroSection.css';

/**
 * HeroSection Component
 * 
 * A high-fidelity, cinematic hero section for NyaySarthi.
 * Design System: Dharma Night (Dark Mode, Newsreader Serif, Saffron Accents)
 */
const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="hero-section">
      {/* 3D Blurry Aurora Background */}
      <div className="hero-orb orb-1" />
      <div className="hero-orb orb-2" />
      <div className="hero-orb orb-3" />
      <div className="hero-orb orb-4" />

      <div className="hero-container">
        
        {/* Left Content: Text and CTAs */}
        <motion.div 
          style={{ maxWidth: '42rem' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            <span className="hero-badge-text">
              Next-Gen Legal Intelligence
            </span>
          </div>

          <h1 className="hero-title">
            The Law, <br />
            <span className="hero-title-highlight">
              Reimagined.
            </span>
          </h1>

          <p className="hero-description">
            Demystifying Indian statutes through a premium, AI-driven experience designed for the modern citizen. Experience jurisprudence illuminated.
          </p>

          <div className="hero-actions">
            <button className="hero-btn-primary" onClick={() => navigate('/laws')}>
              Get Started Now
            </button>
            <button className="hero-btn-secondary" onClick={() => navigate('/laws')}>
              Explore Codes
            </button>
          </div>
        </motion.div>

        {/* Right Content: Visual/Image Card */}
        <motion.div 
          style={{ position: 'relative' }}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="hero-visual-wrapper">
            {/* Main Visual Image */}
            <img 
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop" 
              alt="Justice Gavel" 
              className="hero-image"
            />
            
            {/* Glassmorphic Overlay Card */}
            <div className="hero-glass-card">
              <p className="hero-glass-quote">"WE, THE PEOPLE OF INDIA..."</p>
              <p className="hero-glass-text">
                Instant AI synthesis of over 1,200 central and state acts at your fingertips.
              </p>
            </div>
          </div>
          
          {/* Decorative Back Elements */}
          <div className="hero-decorative-back" />
        </motion.div>

      </div>

      {/* National Badge/Detail */}
      <motion.div 
        className="hero-national-badge"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="hero-national-line" />
        <p className="hero-national-text">NyayanSarthi • The Digital Gavel</p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
