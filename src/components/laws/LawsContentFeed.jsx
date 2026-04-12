import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LawsContentFeed.css';

const TRENDING_LAWS = [
  { id: 't1', section: 'Section 302 IPC', title: 'Punishment for Murder', desc: 'Explanation of the legal consequences and investigative procedures regarding intentional death.', severity: 'SERIOUS', badgeColor: 'serious' },
  { id: 't2', section: 'Section 420 IPC', title: 'Cheating & Dishonesty', desc: 'Understanding fraud, property delivery inducement, and legal remedies for victims.', severity: 'MODERATE', badgeColor: 'moderate' },
  { id: 't3', section: 'Section 498A IPC', title: 'Dowry & Cruelty', desc: 'Protection of women from domestic cruelty by husband or relatives.', severity: 'SEVERE', badgeColor: 'serious' },
  { id: 't4', section: 'Section 138 NI Act', title: 'Cheque Bounce', desc: 'Legal remedies, notices, and procedural penalties for dishonour of cheques.', severity: 'MODERATE', badgeColor: 'moderate' },
  { id: 't5', section: 'Article 14 const.', title: 'Right to Equality', desc: 'Equality before the law and equal protection of the laws within the territory of India.', severity: 'CRITICAL', badgeColor: 'serious' }
];

const RECENT_CLAUSES = [
  { id: 'r1', category: 'CIVIL', title: 'Right to Privacy', desc: 'Protection of personal data and individual autonomy under Article 21 of the Constitution.', catColor: 'civil' },
  { id: 'r2', category: 'LABOUR', title: 'Minimum Wages Act', desc: 'Statutory guidelines for ensuring fair remuneration across scheduled employments.', catColor: 'labour' },
  { id: 'r3', category: 'CYBER', title: 'IT Act Section 66A', desc: 'Legal implications of sending offensive messages through communication services.', catColor: 'cyber' },
  { id: 'r4', category: 'FAMILY', title: 'Hindu Marriage Act Sec 13', desc: 'Legal grounds for divorce including cruelty, adultery, and desertion.', catColor: 'labour' },
  { id: 'r5', category: 'CORPORATE', title: 'Companies Act Sec 447', desc: 'Strict definitions and severe punishments regarding corporate fraud.', catColor: 'civil' },
  { id: 'r6', category: 'CRIMINAL', title: 'BNSS Section 173', desc: 'Newly introduced criminal procedural law regarding the digital registration of FIRs.', catColor: 'cyber' }
];

const LawsContentFeed = () => {
  const [trendingIndex, setTrendingIndex] = useState(0);
  const [recentIndex, setRecentIndex] = useState(0);
  const [isTrendingPaused, setIsTrendingPaused] = useState(false);
  const [isRecentPaused, setIsRecentPaused] = useState(false);

  // Auto-slide Trending Laws (2 items visible max)
  useEffect(() => {
    if (isTrendingPaused) return;
    const interval = setInterval(() => {
      setTrendingIndex((prev) => (prev + 1 > TRENDING_LAWS.length - 2 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [isTrendingPaused]);

  // Auto-slide Recent Clauses (3 items visible max)
  useEffect(() => {
    if (isRecentPaused) return;
    const interval = setInterval(() => {
      setRecentIndex((prev) => (prev + 1 > RECENT_CLAUSES.length - 3 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [isRecentPaused]);

  return (
    <div className="laws-content-feed">
      
      {/* Trending Laws Section */}
      <section className="feed-section">
        <div className="section-header">
          <h3>Trending Laws</h3>
          <div className="nav-arrows">
            <span className="material-icons" onClick={() => setTrendingIndex(prev => Math.max(0, prev - 1))}>west</span>
            <span className="material-icons" onClick={() => setTrendingIndex(prev => Math.min(TRENDING_LAWS.length - 2, prev + 1))}>east</span>
          </div>
        </div>

        <div 
          className="carousel-viewport" 
          onMouseEnter={() => setIsTrendingPaused(true)} 
          onMouseLeave={() => setIsTrendingPaused(false)}
        >
          <div 
            className="carousel-track" 
            style={{ transform: `translateX(-${trendingIndex * (100 / 2)}%)` }}
          >
            {TRENDING_LAWS.map(law => (
              <div key={law.id} className="trending-card-wrapper">
                <div className="law-card glass-panel">
                  <div className="card-top-meta">
                    <span className={`severity-badge ${law.badgeColor}`}>{law.severity}</span>
                    <span className="section-id">{law.section}</span>
                  </div>
                  <h4>{law.title}</h4>
                  <p className="card-desc">{law.desc}</p>
                  <div className="card-actions">
                    <button className="link-btn">KNOW MORE &rarr;</button>
                    <button className="link-btn highlight"><span className="material-icons text-[14px]">auto_awesome</span> SIMPLIFY</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Added Clauses Section */}
      <section className="feed-section">
        <div className="section-header">
          <h3>Recently Added Clauses</h3>
        </div>

        <div 
          className="carousel-viewport"
          onMouseEnter={() => setIsRecentPaused(true)} 
          onMouseLeave={() => setIsRecentPaused(false)}
        >
          <div 
            className="carousel-track" 
            style={{ transform: `translateX(-${recentIndex * (100 / 3)}%)` }}
          >
            {RECENT_CLAUSES.map(clause => (
              <div key={clause.id} className="recent-card-wrapper">
                <div className="recent-card glass-panel">
                  <span className={`category ${clause.catColor}`}>{clause.category}</span>
                  <h5>{clause.title}</h5>
                  <p>{clause.desc}</p>
                  <button className="details-btn">DETAILS</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Law Deep-Dive Promo */}
      <section className="ai-deep-dive-block">
        <div className="ai-badge">
          <span className="material-icons">psychology</span>
          AI INTELLIGENCE
        </div>
        <div className="ai-block-content">
          <div className="ai-text-area">
            <h2>AI Law Deep-Dive</h2>
            <p>
              Our Jurist AI analyzes thousands of precedents to give you a plain-language summary of how a specific section is applied in real courtrooms today.
            </p>
            <div className="ai-buttons">
              <Link to="/chat" style={{textDecoration: 'none'}}>
                <button className="btn-primary">Ask NyayaSarthi AI</button>
              </Link>
              <button className="btn-secondary">View AI Reports</button>
            </div>
          </div>
          <div className="ai-block-graphic">
            <span className="material-icons gigantic-icon">psychology</span>
          </div>
        </div>
      </section>

      {/* Recently Viewed History */}
      <section className="feed-section history-section">
          <h4 className="history-title">RECENTLY VIEWED HISTORY</h4>
          
          <div className="history-item">
            <div className="history-left">
              <span className="material-icons history-icon">history</span>
              <div>
                <p className="history-item-title">POCSO Act, Section 3</p>
                <p className="history-meta">Viewed 2 hours ago &middot; Criminal Domain</p>
              </div>
            </div>
            <span className="material-icons history-link">open_in_new</span>
          </div>

          <div className="history-item">
            <div className="history-left">
              <span className="material-icons history-icon">history</span>
              <div>
                <p className="history-item-title">Hindu Succession Act</p>
                <p className="history-meta">Viewed Yesterday &middot; Family Domain</p>
              </div>
            </div>
            <span className="material-icons history-link">open_in_new</span>
          </div>
      </section>

    </div>
  );
};

export default LawsContentFeed;
