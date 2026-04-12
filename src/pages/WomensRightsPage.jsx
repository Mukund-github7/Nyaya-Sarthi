import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './WomensRightsPage.css';

/**
 * WomensRightsPortal Component
 * 
 * A high-fidelity, comprehensive portal for Women's Rights & Safety.
 * Translated from Tailwind to strict Lex Obsidian Modular CSS.
 */
const WomensRightsPage = () => {
  const [activeTab, setActiveTab] = useState('Legal Guides');

  const emergencyNumbers = [
    { label: "Women's Helpline (All India)", number: "1091", icon: "phone_in_talk", color: "blue" },
    { label: "Domestic Abuse Support", number: "181", icon: "security", color: "cyan" }
  ];

  const knowledgeCategories = [
    {
      title: "Workplace & Professional Rights",
      description: "Detailed breakdown of the POSH Act, maternity benefits, and equal compensation frameworks for modern professionals.",
      tags: ["POSH Act", "Equal Pay", "Remote Policy"],
      icon: "work"
    },
    {
      title: "Marriage & Family Law",
      description: "Expert guidance on divorce proceedings, maintenance rights, child custody, and complex inheritance laws.",
      icon: "family_restroom",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Domestic Safety",
      description: "Protection from Violence Act and rapid response steps for immediate physical and psychological safety.",
      icon: "home_health"
    },
    {
      title: "Civil Liberties",
      description: "Fundamental rights, privacy laws, and freedom of expression guaranteed under the Constitution.",
      icon: "gavel"
    }
  ];

  const handleQuickExit = () => {
    // Quick escape feature: Instantly navigates away to a safe neutral site
    window.location.replace('https://www.google.com'); 
  };

  return (
    <div className="women-portal-container">
      
      <main className="women-main-content">
        {/* Hero Section */}
        <section className="women-hero-section">
          <div className="hero-glow-blob" />
          <motion.div 
            className="women-container hero-grid"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-pulse" />
                <span className="badge-text">National Legal Portal</span>
              </div>
              <h2 className="hero-headline">
                Empowering Her through <span className="text-gradient">Legal Clarity</span>
              </h2>
              <p className="hero-description">
                Advanced legal intelligence and rapid safety assistance designed exclusively for women's justice and safety across the nation.
              </p>
              <div className="hero-actions">
                <button className="btn-hero-primary">
                  Start Your Consultation
                </button>
                <button className="btn-hero-secondary">
                  Download Guide
                </button>
              </div>
            </div>
            <div className="hero-imagery">
              <div className="hero-image-wrapper">
                 <img 
                  src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1000&auto=format&fit=crop" 
                  className="hero-image"
                  alt="Justice Symbol"
                 />
                 <div className="hero-image-overlay" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Crisis Support Grid */}
        <section className="crisis-support-section">
          <motion.div 
            className="women-container crisis-grid"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
          >
            {emergencyNumbers.map((item, idx) => (
              <div key={idx} className="crisis-card">
                 <div className="crisis-card-header">
                    <div className="crisis-card-meta">
                      <p className="crisis-card-label">{item.label}</p>
                      <h3 className="crisis-card-number">{item.number}</h3>
                    </div>
                    <span className="material-icons crisis-card-icon">{item.icon}</span>
                 </div>
                 <p className="crisis-card-desc">
                   Immediate response for {item.label.toLowerCase()} cases. Connect to verified police and medical units instantly.
                 </p>
                 <button className={`btn-crisis-action ${item.color}`}>
                   {item.color === 'blue' ? 'Call Now' : 'Request Help'}
                 </button>
              </div>
            ))}

            <div className="sos-card">
               <div className="sos-content-wrapper">
                 <h3 className="sos-title">One-Tap SOS</h3>
                 <p className="sos-desc">Send your real-time location to local authorities and emergency contacts instantly.</p>
                 <button className="btn-sos-activate">
                   ACTIVATE SOS
                 </button>
               </div>
               <div className="sos-glow-blob" />
            </div>
          </motion.div>
        </section>

        {/* Knowledge Base */}
        <section className="knowledge-base-section">
          <motion.div 
            className="women-container"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-header-row">
              <div className="section-title-group">
                <h2 className="section-main-title">Essential Rights <span>Knowledge Base</span></h2>
                <p className="section-sub-title">Navigate the legal framework with expert-curated guides.</p>
              </div>
              <button className="btn-text-primary">View All Documentation</button>
            </div>

            <div className="knowledge-grid">
              <div className="knowledge-standard-group">
                {knowledgeCategories.filter(c => !c.image).map((cat, idx) => (
                  <div key={idx} className="knowledge-card">
                    <span className="material-icons knowledge-icon">{cat.icon}</span>
                    <h4 className="knowledge-title">{cat.title}</h4>
                    <p className="knowledge-desc">{cat.description}</p>
                    <div className="knowledge-tags">
                      {cat.tags?.map(tag => (
                        <span key={tag} className="tag-pill">{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="knowledge-featured-group">
                <div className="featured-card">
                   <span className="material-icons knowledge-icon">groups</span>
                   <h4 className="knowledge-title">Marriage & Family Law</h4>
                   <p className="knowledge-desc">Expert guidance on divorce proceedings, maintenance, and inheritance laws.</p>
                   <div className="featured-image-container">
                     <img src={knowledgeCategories[1].image} alt="Family Law" className="featured-image" />
                   </div>
                   <button className="btn-featured-action">
                     Access Library
                   </button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Immediate Actions */}
        <section className="immediate-actions-section">
          <motion.div 
            className="women-container flex-center-col"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="section-main-title centered">Crisis Response <span>Immediate Actions</span></h2>
            <div className="actions-step-grid">
              <div className="actions-connecting-line" />
              {[
                { step: "01", title: "Ensure Safety", desc: "Relocate to a public space or trusted shelter immediately." },
                { step: "02", title: "Gather Evidence", desc: "Store photos, screenshots, and recordings in a hidden digital vault." },
                { step: "03", title: "File an e-FIR", desc: "Use our guided portal to draft a zero-FIR valid at any station." },
                { step: "04", title: "Seek Legal Aid", desc: "Connect with a pro-bono advocate from our verified network." }
              ].map((item, idx) => (
                <div key={idx} className="action-step-item">
                  <div className="step-number-bubble">
                    {idx + 1}
                  </div>
                  <h5 className="step-title">{item.title}</h5>
                  <p className="step-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* LexFemina AI Promo */}
        <section className="ai-promo-section">
           <motion.div 
            className="women-container"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
           >
             <div className="ai-promo-card">
                <div className="ai-promo-glow" />
                <div className="ai-promo-grid">
                   <div className="ai-promo-content">
                      <div className="ai-promo-header">
                         <div className="ai-icon-container">
                            <span className="material-icons">smart_toy</span>
                         </div>
                         <div className="ai-header-text">
                            <h3 className="ai-title">Ask NyayaSarthi AI</h3>
                            <p className="ai-subtitle">Your 24/7 Digital Legal Consultant</p>
                         </div>
                      </div>
                      <div className="ai-promo-examples">
                         <p className="ai-example-quote">
                           "How do I file a workplace harassment complaint without losing my job?"
                         </p>
                         <div className="ai-chips-group">
                            {['Domestic Violence Help', 'Inheritance Laws', 'Cyber Stalking'].map(chip => (
                              <button key={chip} className="ai-action-chip">
                                {chip}
                              </button>
                            ))}
                         </div>
                      </div>
                      <div className="ai-input-component">
                         <input 
                          type="text" 
                          placeholder="Type your legal query here..." 
                          className="ai-text-input"
                         />
                         <button className="ai-btn-send">
                            <span className="material-icons">send</span>
                         </button>
                      </div>
                   </div>
                   <div className="ai-promo-visual">
                      <div className="ai-visual-placeholder">
                         <div className="ai-visual-pulse" />
                         Case Intelligence Interface Visualization
                      </div>
                   </div>
                </div>
             </div>
           </motion.div>
        </section>
      </main>
    </div>
  );
};

export default WomensRightsPage;
