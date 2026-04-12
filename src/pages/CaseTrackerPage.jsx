import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './CaseTrackerPage.css';

/**
 * CaseTrackerPage Component
 * 
 * A personalized Case Tracker Dashboard. 
 * Allows a user to input a CNR number to pull specific case details.
 */
const CaseTrackerPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [trackedCase, setTrackedCase] = useState(null);

  // Mock data payload returned when a user searches
  const mockFetchedCase = {
      id: "MH-2024-CV8892",
      title: "Rahul M. Prasad vs. State of Maharashtra Housing Board",
      year: "2024",
      status: "Active - Bench Assigned",
      impact: "Civil Property Dispute - Article 14",
      summary: "A high-profile writ petition challenging the arbitrary reallocation of housing plots under the state slum rehabilitation scheme. The petitioner claims gross violation of Article 14 (Equality before law), citing evidence of administrative negligence and systemic delays.",
      petitioner: "Rahul M. Prasad",
      petitionerAdvocate: "Adv. Mukul Rohatgi (Lead Counsel)",
      respondent: "Maharashtra Housing & Area Development Authority (MHADA)",
      respondentAdvocate: "Adv. Anil Kapoor (State Counsel)",
      tags: ["Civil Law", "Property Rights", "Writ Petition", "Article 14"],
      icon: "gavel",
      hearings: [
        { date: "Jan 12, 2024", note: "Writ Petition Filed (Diary No. 4920/2024)" },
        { date: "Feb 05, 2024", note: "Notice Issued to MHADA by Division Bench" },
        { date: "Mar 18, 2024", note: "Affidavit in Reply Submitted by State over property demarcation." },
        { date: "Apr 22, 2024", note: "Arguments framing commenced. Case adjourned to May." },
        { date: "May 15, 2024", note: "Next Scheduled Hearing - Final Arguments" }
      ],
      aiInsight: "NyayaSarthi predicts a 78% probability of interim relief being granted based on 42 similar slum rehabilitation act violations in the Bombay High Court. The invocation of Article 14 significantly heavily strengthens the petitioner's standing against administrative delays.",
      aiConfidence: 82,
      resources: ["Initial Writ Pleading PFD", "State Reply Affidavit", "Hearing Summons (Feb)", "Annexure - Land Demarcation"]
  };

  const handleTrackCase = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Simulate API fetch delay
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setTrackedCase(mockFetchedCase);
    }, 1200);
  };

  const resetTracker = () => {
    setTrackedCase(null);
    setSearchQuery('');
  };

  return (
    <div className="tracker-page-wrapper">
      
      {/* Dynamic Hero Sector */}
      <section className={`tracker-hero-section ${trackedCase ? 'hero-compact' : ''}`}>
         <div className="tracker-hero-glow" />
         <motion.div 
          className="tracker-hero-container"
          initial={{ opacity: 0, scale: 0.95, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
         >
            <div className="tracker-hero-text">
               <h2 className="tracker-headline">
                  {trackedCase ? 'Case Intelligence' : 'Track Your Active'} <br />
                  <span className="text-gradient">{trackedCase ? 'Dashboard' : 'Litigation'}</span>
               </h2>
               
               {!trackedCase && (
                 <p className="tracker-subhead">
                    Enter your CNR, Case Number, or Party Name to access real-time hearing schedules, NyayaSarthi AI predictions, and encrypted court documents.
                 </p>
               )}

               {/* Search Bar Form */}
               <form className="tracker-search-bar" onSubmit={handleTrackCase}>
                  <input 
                    type="text" 
                    placeholder="Enter CNR No. (e.g. MH-2024-CV8892)..." 
                    className="tracker-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    disabled={isSearching}
                  />
                  {trackedCase ? (
                    <button type="button" onClick={resetTracker} className="tracker-clear-btn">
                      Clear
                    </button>
                  ) : (
                    <div className="search-actions-group">
                       <button type="button" onClick={() => {setSearchQuery('MH-2024-CV8892'); handleTrackCase({preventDefault: () => {}});}} className="tracker-demo-btn" disabled={isSearching}>
                         Load Dummy Case
                       </button>
                       <button type="submit" className="tracker-search-btn" disabled={isSearching}>
                         {isSearching ? 'Tracking...' : 'Track'}
                       </button>
                    </div>
                  )}
               </form>
            </div>

            {/* Right Side Decorative Element (Only visible before tracking) */}
            {!trackedCase && (
              <div className="tracker-hero-decorative">
                 <div className="abstract-glow-sphere"></div>
                 <div className="glass-floating-panel">
                    <span className="material-icons decorative-icon">gavel</span>
                    <div className="pulse-ring"></div>
                 </div>
              </div>
            )}

         </motion.div>
      </section>

      {/* Main Container */}
      <motion.div 
        className="tracker-main-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
      >

         {/* Loading State */}
         {isSearching && (
           <div className="tracker-loading-state">
              <span className="material-icons loading-spinner">autorenew</span>
              <p>Securely fetching case telemetry via CNR...</p>
           </div>
         )}

         {/* Results State: The Personal Case Details */}
         {trackedCase && !isSearching && (
            <div className="expanded-case-card single-case-view">
               
               {/* Card Header (Title & Status) */}
               <div className="case-card-top-row">
                  <div className="case-id-group">
                     <span className="material-icons text-blue-400 text-3xl">{trackedCase.icon}</span>
                     <div>
                        <p className="case-cnr">CNR: {trackedCase.id}</p>
                        <h3 className="case-main-title">{trackedCase.title}</h3>
                     </div>
                  </div>
                  <div className="case-status-badge">
                     <span className="status-dot"></span>
                     {trackedCase.status}
                  </div>
               </div>

               {/* Split Body Layout */}
               <div className="case-card-body-grid">
                  
                  {/* Left Column: Details & Advocates */}
                  <div className="case-details-col">
                     <p className="case-summary-text">{trackedCase.summary}</p>
                     
                     <div className="advocate-vs-grid">
                        <div className="party-block">
                           <p className="party-role">YOUR REPRESENTATION</p>
                           <p className="party-name">{trackedCase.petitioner}</p>
                           <p className="party-counsel"><span className="material-icons">gavel</span> {trackedCase.petitionerAdvocate}</p>
                        </div>
                        <div className="vs-divider">
                           <span>VS</span>
                        </div>
                        <div className="party-block">
                           <p className="party-role">RESPONDENT</p>
                           <p className="party-name">{trackedCase.respondent}</p>
                           <p className="party-counsel"><span className="material-icons">gavel</span> {trackedCase.respondentAdvocate}</p>
                        </div>
                     </div>

                     {/* Hearing Timeline */}
                     <div className="hearing-timeline-box">
                        <p className="timeline-title"><span className="material-icons">schedule</span> Official Court Schedule</p>
                        <div className="timeline-steps">
                           {trackedCase.hearings.map((hearing, hIdx) => (
                              <div key={hIdx} className={`timeline-step-item ${hIdx === trackedCase.hearings.length - 1 ? 'active-step' : ''}`}>
                                 <div className="step-point"></div>
                                 <p className="step-date">{hearing.date}</p>
                                 <p className="step-note">{hearing.note}</p>
                                 {hIdx === trackedCase.hearings.length - 1 && (
                                   <div className="urgent-badge">UPCOMING</div>
                                 )}
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  {/* Right Column: AI Analytics & Resources */}
                  <div className="case-intelligence-col">
                     
                     <div className="ai-analytics-panel">
                        <div className="ai-panel-header">
                           <span className="material-icons text-blue-400">smart_toy</span>
                           <h4>NyayaSarthi Case Intelligence</h4>
                        </div>
                        <p className="ai-insight-text">"{trackedCase.aiInsight}"</p>
                        <div className="ai-confidence-meter">
                           <div className="meter-label">
                              <span>Outcome Probability Mapping</span>
                              <span>{trackedCase.aiConfidence}%</span>
                           </div>
                           <div className="meter-bar-bg">
                              <div className="meter-bar-fill" style={{ width: `${trackedCase.aiConfidence}%` }}></div>
                           </div>
                        </div>
                        <div className="tag-group">
                           {trackedCase.tags.map(tag => (
                             <span key={tag} className="ai-tag">{tag}</span>
                           ))}
                        </div>
                     </div>

                     <div className="resources-vault-panel">
                        <h4><span className="material-icons">folder_open</span> Secure Document Vault</h4>
                        <div className="resource-links-list">
                           {trackedCase.resources.map((res, rIdx) => (
                              <button key={rIdx} className="btn-resource-link">
                                 <span className="material-icons">picture_as_pdf</span>
                                 <span>{res}</span>
                                 <span className="material-icons download-icon">download</span>
                              </button>
                           ))}
                        </div>
                     </div>

                  </div>
               </div>
            </div>
         )}

         {/* Features Block (Always displayed beneath content unless loading) */}
         {!isSearching && (
           <div className="tracker-features-block" style={{ marginTop: trackedCase ? '4rem' : '0' }}>
             <div className="features-header">
                <h3>Why Track With Us?</h3>
                <p>A specialized portal designed exclusively for your active litigation.</p>
             </div>
             
             <div className="features-grid">
                <div className="feature-card">
                   <div className="feature-icon"><span className="material-icons">smart_toy</span></div>
                   <h4>NyayaSarthi AI Predictions</h4>
                   <p>Our deep-learning engine analyzes thousands of precedents to predict the likelihood of interim relief or judgment outcomes specific to your case.</p>
                </div>
                <div className="feature-card">
                   <div className="feature-icon"><span className="material-icons">event_available</span></div>
                   <h4>Live Hearing Trajectories</h4>
                   <p>Instantly track adjournment notices, daily board progress, and exactly when your matter is expected to be called by the bench.</p>
                </div>
                <div className="feature-card">
                   <div className="feature-icon"><span className="material-icons">library_books</span></div>
                   <h4>Encrypted Evidence Vault</h4>
                   <p>All affidavits, writ petitions, and scanned evidences assigned securely to your CNR are immediately retrievable via our legal vault.</p>
                </div>
             </div>
           </div>
         )}

      </motion.div>
    </div>
  );
};

export default CaseTrackerPage;
