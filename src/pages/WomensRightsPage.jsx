import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './WomensRightsPage.css';

/**
 * WomensRightsPortal Component
 * 
 * A high-fidelity, comprehensive portal for Women's Rights & Safety.
 * Translated from Tailwind to strict Lex Obsidian Modular CSS.
 */
const WomensRightsPage = () => {
  const [activeTab, setActiveTab] = useState('Domestic Violence');

  const emergencyNumbers = [
    { label: "Police", number: "100", icon: "local_police", color: "blue" },
    { label: "NCW Helpline", number: "7827170170", icon: "support_agent", color: "purple" },
    { label: "Women Helpline", number: "1091", icon: "phone_in_talk", color: "cyan" }
  ];

  const safetySections = {
    'Domestic Violence': {
      title: "Domestic Violence (PWDVA 2005)",
      desc: "Protection of Women from Domestic Violence Act provides civil remedies.",
      steps: [
        "1. Ensure Immediate Safety: Lock yourself in a room or leave the premises if possible.",
        "2. Call 100 or 1091 immediately. Keep the phone on to record audio if safe to do so.",
        "3. Do not change clothes or wash up if physical assault occurred. Seek medical attention immediately to document injuries.",
        "4. Contact the nearest Protection Officer or an NGO under the PWDVA for a Domestic Incident Report (DIR).",
        "5. Connect with a Duty Lawyer via NyayaSarthi SOS to file for immediate protection and residence orders."
      ]
    },
    'Workplace Harassment': {
      title: "Workplace Harassment (POSH Act 2013)",
      desc: "Prevention of Sexual Harassment at Workplace.",
      steps: [
        "1. Clearly object to the behavior if you feel safe doing so, establishing that the conduct is unwelcome.",
        "2. Document everything: Save emails, messages, notes, and records of incidents with dates and times.",
        "3. Avoid isolating yourself with the harasser. Inform a trusted colleague.",
        "4. File a formal written complaint to the Internal Complaints Committee (ICC) of your organization within 3 months.",
        "5. If your company lacks an ICC or action is not taken, register a complaint with the Local Complaints Committee (LCC) or file an e-FIR."
      ]
    },
    'Dowry/498A': {
      title: "Dowry Harassment (IPC 498A & Dowry Prohibition Act)",
      desc: "Cruelty by husband or relatives for unlawful dowry demands.",
      steps: [
        "1. Do not succumb to demands. Make copies of all financial transactions, wedding expenses, and gifts (stridhan).",
        "2. Secure your original educational certificates, passport, and essential documents in a safe location outside the matrimonial home.",
        "3. Record or document all verbal, emotional, or physical harassment related to dowry demands.",
        "4. Register an FIR under Section 498A at the nearest Women's Police Station.",
        "5. File a petition for the return of your 'stridhan' simultaneously."
      ]
    },
    'Matrimonial Disputes': {
      title: "Matrimonial Disputes & Maintenance",
      desc: "Separation, Divorce, Child Custody, and Maintenance Rights.",
      steps: [
        "1. Create a secret financial safety net. Gather account details, property papers, and tax returns of your spouse.",
        "2. Do not leave the matrimonial house unless there is a threat to your life (it strengthens your right to residence claim).",
        "3. If forced out, immediately file under Section 125 CrPC for interim maintenance.",
        "4. Do not sign any blank papers or mutual consent agreements under pressure.",
        "5. Consult a verified family lawyer through NyayaSarthi before initiating any formal divorce petition."
      ]
    }
  };

  const handleQuickExit = () => {
    // Quick escape feature: Instantly navigates away to a safe neutral site
    window.location.replace('https://www.google.com'); 
  };

  return (
    <div className="women-portal-container">
      
      <main className="women-main-content">
        {/* Quick Exit Header */}
        <div className="quick-exit-banner">
          <p>If you are in immediate danger, close this page instantly.</p>
          <button onClick={handleQuickExit} className="btn-quick-exit">Quick Exit (ESC)</button>
        </div>

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
              <div className="hero-badge" style={{ borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)'}}>
                <span className="badge-pulse" style={{ backgroundColor: '#ef4444'}}/>
                <span className="badge-text" style={{ color: '#fca5a5' }}>Women's Safety Wing</span>
              </div>
              <h2 className="hero-headline">
                Rapid Safety & <span className="text-gradient">Legal Guidance</span>
              </h2>
              <p className="hero-description">
                Immediate action guides, verified procedures, and direct emergency connections for women facing critical disputes or danger.
              </p>
              <div className="hero-actions">
                <button className="btn-hero-primary" style={{ background: '#e11d48' }}>
                  Connect to Duty Lawyer NOW
                </button>
                <a href="tel:100" className="btn-hero-secondary">
                  Call Police 100
                </a>
              </div>
            </div>
            <div className="hero-imagery">
              <div className="hero-image-wrapper">
                 <img 
                  src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1000&auto=format&fit=crop" 
                  className="hero-image"
                  alt="Justice Symbol"
                 />
                 <div className="hero-image-overlay" style={{ background: 'linear-gradient(to top, rgba(15,23,42,1) 0%, rgba(15,23,42,0) 100%)' }} />
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
                      <p className="crisis-card-label" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{item.label}</p>
                      <h3 className="crisis-card-number" style={{ fontSize: '4rem', fontWeight: 900, lineHeight: 1, textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>{item.number}</h3>
                    </div>
                    <span className="material-icons crisis-card-icon">{item.icon}</span>
                 </div>
                 <p className="crisis-card-desc">
                   Immediate response for emergencies. Tappable live link.
                 </p>
                 <a href={`tel:${item.number}`} className={`btn-crisis-action ${item.color}`} style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}>
                   {item.color === 'blue' ? 'Call Now' : 'Request Help'}
                 </a>
              </div>
            ))}

            <div className="sos-card">
               <div className="sos-content-wrapper">
                 <h3 className="sos-title">One-Tap SOS</h3>
                 <p className="sos-desc">Share location & alert duty lawyers instantly.</p>
                 <button className="btn-sos-activate">
                   ACTIVATE SOS
                 </button>
               </div>
               <div className="sos-glow-blob" />
            </div>
          </motion.div>
        </section>

        {/* Immediate Actions - What to do right now PRD 5.16 */}
        <section className="immediate-actions-section">
          <motion.div 
            className="women-container"
            initial={{ opacity: 0, filter: "blur(10px)", y: 50 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1 }}
          >
            <div className="section-header-row" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div className="section-title-group">
                <h2 className="section-main-title">What to do <span>RIGHT NOW</span></h2>
                <p className="section-sub-title">Select your situation for an immediate action protocol.</p>
              </div>
            </div>

            <div className="safety-tabs">
              {Object.keys(safetySections).map(tab => (
                <button 
                  key={tab}
                  className={`safety-tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="safety-action-content">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="safety-card-active"
                >
                  <div className="safety-card-header">
                    <h3>{safetySections[activeTab].title}</h3>
                    <p>{safetySections[activeTab].desc}</p>
                  </div>
                  <div className="actions-step-grid" style={{ marginTop: '2rem' }}>
                    <div className="actions-connecting-line" />
                    {safetySections[activeTab].steps.map((stepStr, idx) => {
                      const stepMatch = stepStr.match(/^(\d+)\.\s(.*)$/);
                      const stepNum = stepMatch ? stepMatch[1] : (idx + 1);
                      const stepText = stepMatch ? stepMatch[2] : stepStr;

                      return (
                        <div key={idx} className="action-step-item">
                          <div className="step-number-bubble" style={{ background: '#ef4444', color: 'white', borderColor: '#b91c1c' }}>
                            0{stepNum}
                          </div>
                          <p className="step-desc" style={{ color: '#e2e8f0', fontSize: '1.05rem', fontWeight: 500, lineHeight: 1.6 }}>{stepText}</p>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
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
                            <p className="ai-subtitle">Completely confidential context generation</p>
                         </div>
                      </div>
                      <div className="ai-promo-examples">
                         <p className="ai-example-quote">
                           "Prepare a situation summary that I can instantly share with a duty lawyer."
                         </p>
                         <div className="ai-chips-group">
                            {['Draft Complaint', 'Find Nearest Station', 'Explain My Rights'].map(chip => (
                              <button key={chip} className="ai-action-chip">
                                {chip}
                              </button>
                            ))}
                         </div>
                      </div>
                      <div className="ai-input-component">
                         <input 
                          type="text" 
                          placeholder="Type your query securely here..." 
                          className="ai-text-input"
                         />
                         <button className="ai-btn-send">
                            <span className="material-icons">send</span>
                         </button>
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
