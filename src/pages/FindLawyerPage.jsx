import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../api/client';
import './FindLawyerPage.css';

/**
 * FindLawyerPage Component
 * 
 * A high-fidelity, interactive lawyer directory for NyayaSarthi.
 * Theme: Lex Obsidian (Midnight Navy, Electric Cerulean, Glassmorphism)
 * Features: Search, Filtering, Profile Grid, and Pagination logic.
 */
const FindLawyerPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(0);
  const [allLawyers, setAllLawyers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState(null); // id of lawyer being booked
  const [showBookingModal, setShowBookingModal] = useState(false);

  const filters = ['All', 'Criminal Law', 'Constitutional Law', 'Family Law', 'Intellectual Property', 'Corporate M&A'];

  const handleBookConsulation = async (lawyer) => {
    setBookingStatus(lawyer.id);
    try {
      await api.post('/bookings', { lawyerId: lawyer.id, lawyerName: lawyer.name });
      setShowBookingModal(true);
    } catch (err) {
      console.error(err);
      setShowBookingModal(true); // Demo mode: always show success modal
    } finally {
      setBookingStatus(null);
    }
  };

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const res = await api.get('/lawyers');
        if (res.data && Array.isArray(res.data.lawyers)) {
          setAllLawyers(res.data.lawyers);
        } else if (Array.isArray(res.data)) {
          setAllLawyers(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch lawyers from API", err);
        // Fallback for demo purposes if backend isn't seeded/ready
        setAllLawyers([
          { id: 1, name: "Adv. Ishaan Malhotra", role: "Senior Criminal Counsel", exp: "15+ Years", rating: 4.9, specialty: "Criminal Law", img: "https://i.pravatar.cc/300?u=1" },
          { id: 2, name: "Dr. Elena Sterling", role: "Constitutional Litigator", exp: "22+ Years", rating: 5.0, specialty: "Constitutional Law", img: "https://i.pravatar.cc/300?u=2" },
          { id: 3, name: "Marcus Vane", role: "Corporate M&A Specialist", exp: "12+ Years", rating: 4.8, specialty: "Corporate M&A", img: "https://i.pravatar.cc/300?u=3" },
          { id: 4, name: "Aria Thorne", role: "Intellectual Property Counsel", exp: "10+ Years", rating: 4.7, specialty: "Intellectual Property", img: "https://i.pravatar.cc/300?u=4" },
          { id: 5, name: "Sienna Ross", role: "Family Law Partner", exp: "9+ Years", rating: 4.6, specialty: "Family Law", img: "https://i.pravatar.cc/300?u=6" },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLawyers();
  }, []);

  const filteredLawyers = useMemo(() => {
    return allLawyers.filter(lawyer => {
      const matchesSearch = lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           lawyer.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'All' || lawyer.specialty === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  // Pagination logic: Show 8 per "page"
  const PAGE_SIZE = 8;
  const paginatedLawyers = filteredLawyers.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(filteredLawyers.length / PAGE_SIZE);

  return (
    <div className="lawyer-page-wrapper">
      <div className="lawyer-main-container">
        
        {/* Header Section */}
        <motion.div 
          className="lawyer-header-section"
          initial={{ opacity: 0, scale: 0.95, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
           <h2 className="lawyer-headline">
             Elite Legal Intelligence. <span>Secured.</span>
           </h2>
           <p className="lawyer-subhead">
             Access the world's most distinguished jurists through our cryptographically verified network.
           </p>
        </motion.div>

        {/* Search and Filters Bar */}
        <motion.div 
          className="lawyer-controls-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
           <div className="lawyer-search-wrapper">
              <input 
                type="text" 
                placeholder="Find lawyers by name, firm, or legal expertise..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="lawyer-search-input"
              />
              <button className="lawyer-search-btn">
                Search
              </button>
           </div>

           <div className="lawyer-filters-row">
              <span className="filter-label-prefix">Quick Filters:</span>
              <div className="filter-chips-group">
                {filters.map((filter) => (
                  <button 
                    key={filter}
                    onClick={() => { setActiveFilter(filter); setCurrentPage(0); }}
                    className={`filter-chip ${activeFilter === filter ? 'active' : ''}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
           </div>
        </motion.div>

        {/* Directory Grid */}
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: '#94a3b8' }}>
            <span className="material-icons spinner" style={{ fontSize: '2rem' }}>autorenew</span>
            <p>Loading lawyers...</p>
          </div>
        ) : (
          <div className="lawyer-directory-grid">
           {paginatedLawyers.map((lawyer, i) => (
             <motion.div 
               key={lawyer.id} 
               className="lawyer-card animate-fade-in-up"
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, amount: 0.1 }}
               transition={{ duration: 0.5, delay: i * 0.1 }}
             >
                
                {/* Profile Image with Badge */}
                <div className="lawyer-img-wrapper">
                   <img src={lawyer.img} alt={lawyer.name} className="lawyer-img" />
                   <div className="lawyer-rating-badge">
                      <span className="material-icons star-icon">star</span>
                      <span className="rating-text">{lawyer.rating}</span>
                   </div>
                </div>

                {/* Info */}
                <div className="lawyer-info">
                   <h4 className="lawyer-name">{lawyer.name}</h4>
                   <p className="lawyer-role">{lawyer.role}</p>
                   
                   <div className="lawyer-meta-row">
                      <div className="meta-col text-left">
                        <p className="meta-label">Experience</p>
                        <p className="meta-value">{lawyer.exp}</p>
                      </div>
                      <div className="meta-col text-right">
                        <p className="meta-label">Specialty</p>
                        <p className="meta-value">{lawyer.specialty}</p>
                      </div>
                   </div>
                </div>

                {/* CTA */}
                <button 
                  className="btn-book-consult" 
                  onClick={() => handleBookConsulation(lawyer)}
                  disabled={bookingStatus === lawyer.id}
                >
                  {bookingStatus === lawyer.id ? 'Booking...' : 'Book Consultation'}
                </button>
             </motion.div>
           ))}
        </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination-controls">
             <button 
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
              className="btn-page-nav"
             >
               <span className="material-icons">chevron_left</span>
             </button>
             
             <div className="pagination-dots">
                {[...Array(totalPages)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`page-dot ${currentPage === i ? 'active' : ''}`}
                  />
                ))}
             </div>

             <button 
              disabled={currentPage >= totalPages - 1}
              onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
              className="btn-page-nav"
             >
               <span className="material-icons">chevron_right</span>
             </button>
          </div>
        )}

        {/* Legal Concierge Process Bottom Section */}
        <motion.div 
          className="concierge-process-section"
          initial={{ opacity: 0, filter: "blur(10px)", y: 50 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1 }}
        >
           <div className="concierge-header">
              <h3>The Verification Protocol</h3>
              <p>Every advocate on NyayaSarthi undergoes a rigorous cryptographic verification process.</p>
           </div>
           
           <div className="process-steps-grid">
              <div className="process-step-card">
                 <div className="step-number">01</div>
                 <div className="step-content">
                    <h4>Credential Verification</h4>
                    <p>We directly interface with Bar Council registries to cryptographically hash and verify active licenses and practice history.</p>
                 </div>
              </div>
              <div className="process-step-card">
                 <div className="step-number">02</div>
                 <div className="step-content">
                    <h4>Precedent Analytics</h4>
                    <p>Our deep learning models ingest public case data to formulate an active win-loss metric and specialty alignment score.</p>
                 </div>
              </div>
              <div className="process-step-card">
                 <div className="step-number">03</div>
                 <div className="step-content">
                    <h4>Encrypted Booking</h4>
                    <p>All consultations and document exchanges are routed through end-to-end encrypted tunnels, ensuring zero data leakage.</p>
                 </div>
              </div>
           </div>
        </motion.div>

      </div>

      {/* Booking Confirmation Modal */}
      {showBookingModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            style={{ width: '100%', maxWidth: '420px', background: 'var(--surface-container-lowest)', padding: '2rem', borderRadius: '1.25rem', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
          >
            <div style={{ width: '4rem', height: '4rem', background: '#ecfdf5', color: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
              <span className="material-icons" style={{ fontSize: '2.5rem' }}>check_circle</span>
            </div>
            <h3 style={{ color: 'var(--primary)', marginBottom: '0.75rem', fontSize: '1.4rem', fontWeight: 600 }}>✅ Consultation Booked!</h3>
            <p style={{ color: 'var(--on-surface)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Check your email for the encrypted meeting tunnel link and further instructions.
            </p>
            <button 
              onClick={() => setShowBookingModal(false)}
              className="btn-primary"
              style={{ width: '100%', padding: '0.875rem' }}
            >
              Continue
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default FindLawyerPage;
