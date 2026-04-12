import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './TrackYourCaseWidget.css';

/**
 * TrackYourCaseWidget Component
 * 
 * A compact, high-fidelity landing page widget for case tracking.
 * Translated from Tailwind to pure CSS for "The Modern Institutionalist" consistency.
 */
const TrackYourCaseWidget = () => {
  const navigate = useNavigate();
  return (
    <section className="tracker-section">
      {/* Background Ambient Glow */}
      <div className="tracker-glow" />

      <div className="tracker-container">
        <motion.div 
          className="tracker-card"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="tracker-grid">
            
            {/* Left Side: Copy & Search */}
            <div>
              <div className="tracker-badge">
                <span className="tracker-badge-dot" />
                <span className="tracker-badge-text">
                  Real-Time Intelligence
                </span>
              </div>
              
              <h2 className="tracker-title">
                Advanced Legal <span className="tracker-highlight">Forensics.</span>
              </h2>
              
              <p className="tracker-desc">
                The single source of truth for elite legal teams. Real-time updates, AI-driven brief generation, and predictive case modeling.
              </p>

              <div className="tracker-search-wrapper">
                <input 
                  type="text" 
                  placeholder="Enter CNR or Case ID" 
                  className="tracker-input"
                />
                <button className="tracker-btn" onClick={() => navigate('/casetracker')}>
                  Fetch Intelligence
                </button>
              </div>
            </div>

            {/* Right Side: Visual Teaser (Pipeline) */}
            <div className="tracker-visual">
              <div className="tracker-pipeline-box">
                <h4 className="tracker-pipeline-title">Neural Case Pipeline</h4>
                
                <div className="tracker-nodes">
                  {/* Pipeline Lines */}
                  <div className="tracker-line-base" />
                  <div className="tracker-line-active" />

                  {/* Nodes */}
                  {[
                    { label: 'Filing', status: 'completed', icon: 'description' },
                    { label: 'Hearing', status: 'active', icon: 'gavel' },
                    { label: 'Judgment', status: 'pending', icon: 'verified' }
                  ].map((node, idx) => (
                    <div key={idx} className={`tracker-node ${node.status}`}>
                      <div className="tracker-node-icon">
                        <span className="material-icons">{node.icon}</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <p className="tracker-node-label">{node.label}</p>
                        <p className="tracker-node-status">
                          {node.status === 'completed' ? 'Completed' : node.status === 'active' ? 'Active Now' : 'Pending'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Status Alert */}
                <div className="tracker-alert">
                  <div className="tracker-alert-dot" />
                  <p>
                    <strong>Latest Update:</strong> Next hearing scheduled for Chamber 4B, Supreme Court on Oct 24th, 10:30 AM.
                  </p>
                </div>
              </div>

              {/* Decorative Accent */}
              <div className="tracker-deco-flare" />
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrackYourCaseWidget;
