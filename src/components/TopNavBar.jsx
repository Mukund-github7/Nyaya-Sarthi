import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './TopNavBar.css';

const TopNavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Laws', href: '/laws' },
    { name: 'NyayaBot AI', href: '/chat' },
    { name: 'Document Check', href: '/analyze' },
    { name: 'Lawyer Marketplace', href: '/marketplace' },
    { name: 'Women Safety & SOS', href: '/safety' },
    { name: 'Resources', href: '/resources' },
    { name: 'Case Tracker', href: '/casetracker' },
  ];

  return (
    <nav style={{ position: 'sticky', top: '1.5rem', margin: '1.5rem 2rem', zIndex: 50}}>
      {/* Desktop & Mobile Top Bar */}
      <div className="nav-glass-panel">
        
        {/* Logo Section */}
        <div>
          <Link to="/" className="nav-logo-text" onClick={() => window.scrollTo(0, 0)}>
            <span className="material-icons nav-logo-icon">account_balance</span>
            NyayaSarthi
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => window.scrollTo(0, 0)}
              className={`nav-link ${location.pathname === link.href ? 'active-page' : ''}`.trim()}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Search and Auth Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }} className="desktop-actions">
          <div className="nav-search-bar">
            <input
              type="text"
              placeholder="Search laws, rights..."
              className="nav-search-input"
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', borderLeft: '1px solid rgba(14, 165, 233, 0.2)', paddingLeft: '1.25rem' }}>
            <button className="nav-btn-text">
              Login
            </button>
            <button className="nav-btn-primary">
              Register
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-toggle" style={{ display: 'none' }}>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#010e24', padding: '0.5rem' }}
          >
            <span className="material-icons">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="ambient-mobile-card" style={{ marginTop: '0.5rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => { window.scrollTo(0, 0); setIsMobileMenuOpen(false); }}
              className={`nav-link ${location.pathname === link.href ? 'active-page' : ''}`.trim()}
              style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(249, 115, 22, 0.1)'}}
            >
              {link.name}
            </Link>
          ))}
          <div style={{ paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button className="nav-btn-text" style={{ padding: '0.75rem', width: '100%', textAlign: 'left' }}>Login</button>
            <button className="nav-btn-primary" style={{ width: '100%' }}>Register</button>
          </div>
        </div>
      )}
      
      {/* Media Queries handling desktop/mobile view */}
      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav, .desktop-actions { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default TopNavBar;
