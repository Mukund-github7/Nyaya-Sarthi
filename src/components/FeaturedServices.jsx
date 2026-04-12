import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './FeaturedServices.css';

const FeaturedServices = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

  const services = [
    {
      id: 1,
      title: "AI Legal Assistant",
      subtitle: "NyayaBot",
      description: "Instant legal guidance and research powered by our proprietary sovereign LLM optimized for regional statutes.",
      icon: "smart_toy",
      badge: "AI Powered",
      glowStart: "rgba(249, 115, 22, 0.2)",
      glowEnd: "rgba(251, 146, 60, 0.2)",
      accent: "#ea580c"
    },
    {
      id: 2,
      title: "Document Analyzer",
      subtitle: "Premium",
      description: "Automated risk detection and clause summarization using advanced OCR and semantic mapping.",
      icon: "analytics",
      badge: "Premium",
      glowStart: "rgba(99, 102, 241, 0.2)",
      glowEnd: "rgba(168, 85, 247, 0.2)",
      accent: "#818cf8"
    },
    {
      id: 3,
      title: "Document Generator",
      subtitle: "Automated",
      description: "Draft professional-grade legal notices, agreements, and petitions in seconds with dynamic variable injection.",
      icon: "description",
      badge: "Automated",
      glowStart: "rgba(16, 185, 129, 0.2)",
      glowEnd: "rgba(20, 184, 166, 0.2)",
      accent: "#34d399"
    },
    {
      id: 4,
      title: "Lawyer Marketplace",
      subtitle: "Verified",
      description: "Connect with specialized legal professionals vetted for expertise and track record across India.",
      icon: "gavel",
      badge: "Verified",
      glowStart: "rgba(245, 158, 11, 0.2)",
      glowEnd: "rgba(249, 115, 22, 0.2)",
      accent: "#fbbf24"
    },
    {
      id: 5,
      title: "Safety & Emergency",
      subtitle: "24/7",
      description: "Immediate guidance and emergency protocols for domestic, workplace, and harassment situations.",
      icon: "security",
      badge: "SOS",
      glowStart: "rgba(244, 63, 94, 0.2)",
      glowEnd: "rgba(239, 68, 68, 0.2)",
      accent: "#fb7185"
    },
    {
      id: 6,
      title: "Legal Awareness",
      subtitle: "Free",
      description: "Democratizing legal knowledge through simple-language explanations of Indian statutes and rights.",
      icon: "menu_book",
      badge: "Educational",
      glowStart: "rgba(251, 146, 60, 0.2)",
      glowEnd: "rgba(249, 115, 22, 0.2)",
      accent: "#f97316"
    }
  ];

  useEffect(() => {
    if (!isPaused) {
      timeoutRef.current = setTimeout(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % services.length);
          setIsAnimating(false);
        }, 800); // Wait for the CSS margin transition to complete
      }, 3000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, isPaused, services.length]);

  // Extract exactly 4 cards: 3 for display, 1 offscreen buffer ready to enter
  const visibleCards = [];
  for (let i = 0; i < 4; i++) {
    visibleCards.push(services[(currentIndex + i) % services.length]);
  }

  return (
    <section className="featured-section">
      <div className="featured-radial-bg" />
      <div className="featured-container">
        
        {/* Section Header */}
        <motion.div 
          className="featured-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="featured-badge">
            <span className="featured-badge-dot" />
            <span className="featured-badge-text">Cognitive Solutions</span>
          </div>
          <h2 className="featured-title">
            Smart Legal <span className="featured-title-highlight">Services  </span>
          </h2>
          <p className="featured-subtitle">
            Transforming legal workflows with high-velocity intelligence. Our neural systems provide the precision of a seasoned jurist at the click of a button.
          </p>
        </motion.div>

        {/* Infinite Slider Track */}
        <motion.div 
          className="slider-outer"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div 
            className={`featured-slider-track ${isAnimating ? 'transition-anim' : ''}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {visibleCards.map((card, idx) => {
              // The middle card dynamically blooms. When navigating, the target index shifts.
              const isActive = isAnimating ? idx === 2 : idx === 1;
              
              return (
              <div 
                key={card.id}
                className={`featured-card ${isActive ? 'featured-card-active' : ''}`}
              style={{
                '--glow-start': card.glowStart,
                '--glow-end': card.glowEnd,
                '--accent-color': card.accent
              }}
            >
              <div className="featured-card-glow" />
              
              <div className="featured-card-header">
                <div className="featured-card-icon-wrapper">
                  <span className="material-icons featured-card-icon">
                    {card.icon}
                  </span>
                </div>
                <span className="featured-card-tag">
                  {card.badge}
                </span>
              </div>

              <h3 className="featured-card-title">{card.title}</h3>
              <p className="featured-card-desc">
                {card.description}
              </p>

              <button className="featured-card-action" onClick={() => {
                if (card.title === 'AI Legal Assistant') navigate('/chat');
                else if (card.title === 'Lawyer Marketplace') navigate('/lawyers');
                else if (card.title === 'Safety & Emergency') navigate('/women');
                else navigate('/laws');
              }}>
                <span>Explore App</span>
                <span className="material-icons">east</span>
              </button>
            </div>
            )})}
          </div>
        </motion.div>

        {/* Navigation Indicators */}
        <div className="featured-nav">
          {services.map((_, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  setIsAnimating(true);
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setIsAnimating(false);
                  }, 800);
                }}
                className={`featured-nav-dot ${currentIndex === index ? 'featured-nav-dot-active' : 'featured-nav-dot-inactive'}`}
              />
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <motion.div 
          className="featured-cta"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="featured-cta-bg-1" />
          <div className="featured-cta-bg-2" />
          
          <div className="featured-cta-grid">
            <div style={{ position: 'relative', zIndex: 10 }}>
              <div className="featured-cta-label">
                 <span className="material-icons">person</span>
                 <span className="featured-cta-label-text">Personalized Control</span>
              </div>
              <h3 className="featured-cta-title">Unified User Dashboard</h3>
              <p className="featured-cta-desc">
                Your entire legal journey organized into one intelligent view. Monitor ongoing cases, review immediate next steps, and receive actionable guidance tailored directly to your specific petitions.
              </p>

              <ul className="featured-cta-features">
                <li>
                  <span className="material-icons">track_changes</span>
                  <span><strong>Live Case Tracking:</strong> Real-time court status and hearing scheduler.</span>
                </li>
                <li>
                  <span className="material-icons">psychology</span>
                  <span><strong>Strategic AI Guidance:</strong> Automated advice on required legal documents.</span>
                </li>
                <li>
                  <span className="material-icons">lock</span>
                  <span><strong>Secure Evidence Vault:</strong> Encrypted repository for your sensitive files.</span>
                </li>
              </ul>

              <button className="featured-cta-btn" onClick={() => navigate('/casetracker')}>
                <span>Go to My Dashboard</span>
                <span className="material-icons" style={{ fontSize: '14px' }}>arrow_forward</span>
              </button>
            </div>
            
            <div className="featured-mockup">
               <div className="mockup-header">
                 <div className="mockup-dot mockup-dot-red" />
                 <div className="mockup-dot mockup-dot-amber" />
                 <div className="mockup-dot mockup-dot-green" />
               </div>
               <div className="mockup-body">
                  <div className="mockup-chart">
                     <span className="material-icons" style={{ fontSize: '36px', opacity: 0.5 }}>bar_chart</span>
                  </div>
                  <div className="mockup-grid">
                    <div className="mockup-card-1" />
                    <div className="mockup-card-2" />
                  </div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedServices;
