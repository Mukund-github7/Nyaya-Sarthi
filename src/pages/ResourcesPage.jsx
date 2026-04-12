import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ResourcesPage.css';

/**
 * ResourcesPage Component
 * 
 * A high-fidelity, comprehensive portal for legal resources (Bare Acts, Articles, Case Summaries).
 * Translated from Tailwind to strict Lex Obsidian Modular CSS.
 * Integrated into StandardLayout to utilize the global Navigation Bar and Footer.
 */
const ResourcesPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCase, setExpandedCase] = useState(null);

  const handleDownload = () => {
    alert('📄 Downloading Landmark Case Summary...');
    // Simulate generic Indian Law PDF
    window.open('https://legislative.gov.in/sites/default/files/COI...pdf', '_blank');
  };

  const resources = [
    {
      title: "Bharatiya Nyaya Sanhita, 2023",
      code: "BNS 2023",
      desc: "The primary penal code of India, replacing the Indian Penal Code of 1860. Modernized for digital legal frameworks.",
      date: "Oct 2023",
      category: "Criminal Law",
      icon: "policy"
    },
    {
      title: "Article 21: Life & Liberty",
      code: "CONSTITUTION",
      desc: "Comprehensive summary of Right to Life and Personal Liberty including landmark judgments from 1950-2024.",
      date: "Jan 2024",
      category: "Constitutional",
      icon: "menu_book"
    },
    {
      title: "Code of Civil Procedure, 1908",
      code: "CIVIL LAW",
      desc: "Consolidated rules and regulations for civil court procedures in India with latest amendment notes.",
      date: "Aug 2023",
      category: "Civil Law",
      icon: "balance"
    },
    {
      title: "Indian Evidence Act, 1872",
      code: "EVIDENCE",
      desc: "Historical framework of judicial evidence rules. Crucial for understanding burden of proof and admissibility.",
      date: "May 2023",
      category: "Criminal Law",
      icon: "fact_check"
    },
    {
      title: "Hindu Marriage Act, 1955",
      code: "FAMILY LAW",
      desc: "Codifies the law relating to marriage among Hindus, detailing conditional prerequisites and divorce grounds.",
      date: "Feb 2024",
      category: "Family Law",
      icon: "family_restroom"
    },
    {
      title: "Special Marriage Act, 1954",
      code: "FAMILY LAW",
      desc: "Provides a special form of marriage applicable to all citizens without regarding specific community mandates.",
      date: "Mar 2024",
      category: "Family Law",
      icon: "group"
    },
    {
      title: "Bharatiya Nagarik Suraksha Sanhita, 2023",
      code: "BNSS 2023",
      desc: "Replaces the CrPC 1973, reforming processes for arrests, bail, and speedy trials. Integrates forensic digitization.",
      date: "Oct 2023",
      category: "Criminal Law",
      icon: "local_police"
    },
    {
      title: "Article 19: Freedom of Speech",
      code: "CONSTITUTION",
      desc: "An exhaustive breakdown of fundamental liberties covering speech, assembly, and association, citing relevant 21st-century cyber restrictions.",
      date: "Nov 2023",
      category: "Constitutional",
      icon: "record_voice_over"
    }
  ];

  // Helper logic to filter results
  const filteredResources = resources.filter(res => {
    const matchesCategory = activeCategory === 'All' ? true : res.category === activeCategory;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || res.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const trending = [
    { title: "Recent amendments to GST Act 2024", meta: "1.2k downloads today" },
    { title: "Supreme Court ruling on Data Privacy", meta: "Updated 2h ago" },
    { title: "Simplified Guide to BNS Section 103", meta: "Trending in Research" }
  ];

  const cases = [
    {
      title: "Kesavananda Bharati v. State of Kerala",
      year: "1973",
      impact: "Basic Structure Doctrine",
      summary: "Established that while Parliament has the power to amend the Constitution, it cannot alter its 'basic structure'.",
      content: "The Kesavananda Bharati case is the cornerstone of Indian Constitutional Law. It established the Basic Structure Doctrine, asserting that the Parliament's power to amend the Constitution under Article 368 is not absolute and cannot alter its 'basic structure'. This monumental 13-Judge Bench decision preserved the democratic fabric of the nation.\n\nHis Holiness Kesavananda Bharati Sripadagalvaru challenged the Kerala land reform legislation in 1970, which imposed restrictions on the management of religious property. The case evolved into a massive constitutional debate that lasted for 68 days.\n\nThe resulting judgment was deeply divided at 7-6, establishing that fundamental rights could be amended, but the 'basic structure' of the Constitution could not. This continues to be the ultimate check on parliamentary power today.",
      tags: ["Constitutional Law", "Judicial Review", "13-Judge Bench"],
      icon: "account_balance"
    },
    {
      title: "Maneka Gandhi v. Union of India",
      year: "1978",
      impact: "Right to Travel Abroad",
      summary: "Expanded Article 21 to include 'the right to travel abroad' and mandated that laws must be 'just, fair and reasonable'.",
      content: "Maneka Gandhi v. Union of India drastically expanded the scope of Article 21. The Court held that the right to 'personal liberty' includes the right to travel abroad, and the procedure depriving a person of this right must be just, fair, and reasonable, incorporating the principles of natural justice.\n\nWhen the petitioner's passport was impounded 'in the public interest' without being provided any specific reasons, it triggered a constitutional crisis regarding natural justice. The Supreme Court established the 'golden triangle' of Articles 14, 19, and 21.\n\nThis landmark ruling prevented arbitrary executive actions and solidified the requirement that substantive and procedural laws must pass the test of reasonableness, forever altering Indian administrative law.",
      tags: ["Article 21", "Natural Justice", "Liberty"],
      icon: "travel_explore"
    },
    {
      title: "Vishaka v. State of Rajasthan",
      year: "1997",
      impact: "Workplace Safety Guidelines",
      summary: "Formulated guidelines to prevent sexual harassment at workplaces, filling a legislative vacuum until the 2013 Act.",
      content: "In the absence of enacted domestic law providing for effective enforcement of the basic human right of gender equality, the Supreme Court laid down the 'Vishaka Guidelines' for the prevention of sexual harassment at workplaces. These guidelines formed the basis for the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013.",
      tags: ["Women's Rights", "Judicial Activism"],
      icon: "security"
    },
    {
      title: "Justice K.S. Puttaswamy v. UOI",
      year: "2017",
      impact: "Fundamental Right to Privacy",
      summary: "Declared the Right to Privacy as a Fundamental Right protected under Articles 14, 19, and 21 of the Constitution.",
      content: "A landmark 9-Judge Bench unanimously recognized that the right to privacy is an intrinsic part of the right to life and personal liberty under Article 21. This ruling laid the groundwork for robust data protection laws and reaffirmed individual autonomy in digital and physical spheres.",
      tags: ["Right to Privacy", "Data Protection"],
      icon: "fingerprint"
    }
  ];

  return (
    <div className="resources-page-wrapper">

      {/* Hero Search Section */}
      <section className="resources-hero-section">
         <div className="resources-hero-glow" />
         <motion.div 
          className="resources-hero-content"
          initial={{ opacity: 0, scale: 0.95, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
         >
            <h2 className="resources-hero-title">
               Legal Resource <span className="text-gradient">Hub</span>
            </h2>
            <p className="resources-hero-desc">
               Access the foundational intelligence of the Indian Judiciary system with high-speed precision and simplified insights.
            </p>
            
            <div className="resources-search-group">
               <input 
                type="text" 
                placeholder="Search Bare Acts, Constitutional Articles, or Case Summaries..." 
                className="resources-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
               />
               <div className="search-actions-right">
                  <button className="btn-search-fetch" onClick={() => console.log('Searching:', searchQuery)}>
                    Fetch Intel
                  </button>
               </div>
            </div>
         </motion.div>
      </section>

      {/* Main Content Area */}
      <motion.div 
        className="resources-main-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
      >
         
         {/* Sub-Nav / Categories */}
         <div className="resources-filter-header">
            <div className="filter-categories-group">
               <span className="filter-label">Filter By</span>
               {['All', 'Criminal Law', 'Civil Law', 'Constitutional', 'Family Law'].map((cat) => (
                  <button 
                    key={cat} 
                    className={`filter-category-btn ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                    <span className="filter-underline" />
                  </button>
               ))}
            </div>
            <div className="filter-sort-group">
               <span className="sort-label">Sort by:</span>
               <button className="btn-sort-dropdown">
                  <span>Relevance</span>
                  <span className="material-icons">expand_more</span>
               </button>
            </div>
         </div>

         <div className="resources-content-grid">
            
            {/* Resources Grid */}
            <div className="resources-feed-column">
               {filteredResources.map((res, idx) => (
                  <div key={idx} className="resource-card">
                     <div className="resource-card-bg-icon">
                        <span className="material-icons">{res.icon}</span>
                     </div>
                     <div className="resource-card-header">
                        <div className="resource-icon-box">
                           <span className="material-icons">{res.icon}</span>
                        </div>
                        <span className="resource-code-badge">{res.code}</span>
                     </div>
                     <h4 className="resource-title">{res.title}</h4>
                     <p className="resource-desc">{res.desc}</p>
                     
                     <div className="resource-card-footer">
                        <span className="resource-date">Last Updated: {res.date}</span>
                        <button className="btn-download" onClick={handleDownload}>
                           <span>Download PDF</span>
                           <span className="material-icons">download</span>
                        </button>
                     </div>
                  </div>
               ))}
            </div>

            {/* Sidebar / Trending */}
            <div className="resources-sidebar-column">
               
               {/* Trending Now */}
               <div className="trending-widget">
                  <div className="trending-glow" />
                  <div className="trending-header">
                     <span className="material-icons">trending_up</span>
                     <h5>Trending Now</h5>
                  </div>
                  <div className="trending-list">
                     {trending.map((item, idx) => (
                        <div key={idx} className="trending-item">
                           <p className="trending-meta-tag">Top Intelligence</p>
                           <h6 className="trending-item-title">{item.title}</h6>
                           <p className="trending-item-meta">{item.meta}</p>
                        </div>
                     ))}
                  </div>
                  <button className="btn-view-trending">
                     View All Trending
                  </button>
               </div>
            </div>
         </div>
      </motion.div>

      {/* Embedded Case Studies Section */}
      <section className="case-studies-section">
        <motion.div 
          className="resources-main-container"
          initial={{ opacity: 0, filter: "blur(10px)", y: 50 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1 }}
        >
          
          <div className="cases-header-row">
            <div>
              <h2 className="cases-main-title">
                Landmark Case Studies <span>Archive</span>
              </h2>
              <p className="cases-subtitle">Foundational judgments that shaped modern Indian jurisprudence.</p>
            </div>
            <button className="btn-view-cases">
              <span>View All Case Studies</span>
              <span className="material-icons text-sm">chevron_right</span>
            </button>
          </div>

          <div className="cases-grid">
            {cases.map((caseItem, idx) => (
              <div key={idx} className="case-card">
                <div className="case-card-bg-icon">
                  <span className="material-icons">{caseItem.icon}</span>
                </div>

                <div className="case-card-top">
                  <div className="case-icon-box">
                    <span className="material-icons">{caseItem.icon}</span>
                  </div>
                  <div>
                    <h4 className="case-title">{caseItem.title}</h4>
                    <p className="case-impact">{caseItem.impact}</p>
                  </div>
                </div>

                <div className="case-middle">
                  <p className="case-label">Why it matters</p>
                  <p className="case-summary">{caseItem.summary}</p>
                </div>

                <div className="case-tags">
                  {caseItem.tags.map(tag => (
                    <span key={tag} className="case-tag-pill">{tag}</span>
                  ))}
                </div>

                {expandedCase === caseItem.title && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    style={{ overflow: 'hidden', marginTop: '1rem', background: 'var(--surface-container-low)', padding: '1rem', borderRadius: '0.5rem', color: 'var(--on-surface)' }}
                  >
                    {caseItem.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} style={{ marginBottom: '0.75rem', lineHeight: '1.6' }}>{paragraph}</p>
                    ))}
                  </motion.div>
                )}

                <div className="case-footer" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="case-year">Judgment Year: {caseItem.year}</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      className="btn-download-brief" 
                      onClick={() => setExpandedCase(expandedCase === caseItem.title ? null : caseItem.title)} 
                      style={{ padding: '0.5rem 1rem', background: 'var(--primary-container)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      <span>{expandedCase === caseItem.title ? 'Read Less' : 'Read More'}</span>
                    </button>
                    <button className="btn-download-brief" onClick={handleDownload} title="Download Case PDF">
                      <span className="material-icons text-sm">description</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ResourcesPage;
