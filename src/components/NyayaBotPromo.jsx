import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './NyayaBotPromo.css';

/**
 * NyayaBotPromo Component
 * 
 * A premium, high-fidelity promotional section for the NyayaBot AI assistant.
 * Translated from Tailwind to pure CSS for "The Modern Institutionalist" consistency.
 */
const NyayaBotPromo = () => {
  return (
    <section className="nyayabot-section">
      {/* Background Glows */}
      <div className="nyayabot-glow-1" />
      <div className="nyayabot-glow-2" />

      <div className="nyayabot-container">
        <div className="nyayabot-grid">
          
          {/* Left Side: Copy and Features */}
          <motion.div 
            className="nyayabot-content"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="nyayabot-badge">
              <span className="nyayabot-badge-dot" />
              <span className="nyayabot-badge-text">
                AI-Powered Legal Assistant
              </span>
            </div>

            <h2 className="nyayabot-title">
              Your Personal <br />
              <span className="nyayabot-highlight">
                Legal Expert, 24/7.
              </span>
            </h2>

            <p className="nyayabot-desc">
              Meet NyayaBot: The AI-powered assistant that simplifies complex Indian statutes into plain, actionable advice. Get instant clarity on your rights and procedures without the legalese.
            </p>

            {/* Feature Cards */}
            <div className="nyayabot-features">
              {[
                { icon: 'bolt', title: 'Instant Clarification', desc: 'Get accurate answers to your legal queries in seconds.' },
                { icon: 'gavel', title: 'Indian Law Expert', desc: 'Deeply trained on IPC, BNS, CrPC, and the Constitution.' },
                { icon: 'chat', title: 'Simple Language', desc: 'No jargon. Just clear, understandable guidance.' }
              ].map((feature, idx) => (
                <div key={idx} className="nyayabot-feature-item">
                  <div className="nyayabot-feature-icon">
                    <span className="material-icons">{feature.icon}</span>
                  </div>
                  <div className="nyayabot-feature-content">
                    <h4>{feature.title}</h4>
                    <p>{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/chat" style={{textDecoration: 'none'}}>
               <button className="nyayabot-btn">
                 Try NyayaBot Free
               </button>
            </Link>
          </motion.div>

          {/* Right Side: Chat Mockup UI */}
          <motion.div 
            className="nyayabot-mockup-wrapper"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* The offset background neon border line */}
            <div className="nyayabot-deco-border" />
            
            {/* The "Glass" Chat Window */}
            <div className="nyayabot-mockup">
              {/* Mockup Header */}
              <div className="nyayabot-mockup-header">
                <div className="nyayabot-mockup-profile">
                  <div className="nyayabot-mockup-avatar">
                    <span className="material-icons">smart_toy</span>
                  </div>
                  <div className="nyayabot-mockup-info">
                    <h5>NyayaBot AI</h5>
                    <div className="nyayabot-mockup-status">
                      <div className="nyayabot-status-dot" />
                      <span className="nyayabot-status-text">Active Intelligence</span>
                    </div>
                  </div>
                </div>
                <span className="material-icons" style={{ color: '#64748b', cursor: 'pointer' }}>more_vert</span>
              </div>

              {/* Mockup Content */}
              <div className="nyayabot-mockup-content">
                <div className="nyayabot-msg-user">
                  What are the key provisions of Section 498A under the new legal updates?
                </div>
                
                <div className="nyayabot-msg-bot">
                  <div className="nyayabot-msg-bot-icon">
                    <span className="material-icons" style={{ fontSize: '1.25rem' }}>bolt</span>
                  </div>
                  <div className="nyayabot-msg-bot-text">
                    Section 498A deals with 'Cruelty by husband or relatives'. In the recent updates, the focus remains on protection, but courts have emphasized "prima facie" evidence to prevent misuse. Would you like me to break down the 3 specific criteria for conviction?
                  </div>
                </div>
                
                <div className="nyayabot-msg-actions">
                  <button className="nyayabot-msg-action-btn primary">
                    <span className="material-icons" style={{ fontSize: '14px' }}>visibility</span>
                    Show legal criteria
                  </button>
                  <button className="nyayabot-msg-action-btn secondary">
                    Punishment details
                  </button>
                </div>
              </div>

              {/* Mockup Input */}
              <div className="nyayabot-mockup-input">
                <div className="nyayabot-input-wrapper">
                  <span className="material-icons nyayabot-input-icon-left">add_circle_outline</span>
                  <div className="nyayabot-input-field">
                    Ask anything about Indian Law...
                  </div>
                  <span className="material-icons nyayabot-input-icon-right">send</span>
                </div>
              </div>
            </div>

            {/* Trusted Badge */}
            <div className="nyayabot-trusted">
              <div className="nyayabot-trusted-avatars">
                {[1, 2, 3].map(i => (
                  <div key={i} className="nyayabot-trusted-avatar">
                    <img src={`https://i.pravatar.cc/100?u=${i+20}`} alt="User Avatar" />
                  </div>
                ))}
              </div>
              <div className="nyayabot-trusted-info">
                <p>Trusted By</p>
                <p>5,000+ Professionals</p>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NyayaBotPromo;
