import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './FooterSection.css';

/**
 * FooterSection Component
 * 
 * A comprehensive, high-fidelity footer for NyayaSarthi.
 * Translated from Tailwind to pure CSS for "The Modern Institutionalist" consistency.
 */
const FooterSection = () => {
  return (
    <footer className="footer-section">
      {/* Background Glow */}
      <div className="footer-glow" />

      <div className="footer-container">
        <motion.div 
          className="footer-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          
          {/* Brand Identity */}
          <div className="footer-brand">
            <h2 className="footer-logo">
              Nyaya<span>Sarthi</span>
            </h2>
            <p className="footer-desc">
              Empowering Indian citizens through digital legal intelligence. We simplify complex statutes to make justice accessible to every household.
            </p>
            <div className="footer-socials">
              {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                <a key={social} href="#" className="social-circle">
                   <i className={`fab fa-${social}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              {[
                { name: 'Home', path: '/' },
                { name: 'Laws', path: '/laws' },
                { name: 'AI Chatbot', path: '/chat' },
                { name: "Women's Rights", path: '/women' },
                { name: 'Lawyer Connect', path: '/lawyers' },
                { name: 'Student Hub', path: '/resources' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} onClick={() => window.scrollTo(0, 0)}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-links">
              {['Contact Us', 'Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security Protocol'].map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="footer-newsletter">
            <h4>Stay Updated</h4>
            <p>Get weekly insights into Indian legal updates and AI intelligence.</p>
            <div className="footer-input-group">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="footer-input"
              />
              <button className="footer-btn">
                Subscribe
              </button>
            </div>
          </div>

        </motion.div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Legal Disclaimer Section */}
        <div className="footer-disclaimer">
           <h5>Institutional Disclaimer</h5>
           <p>
              NyayaSarthi is an AI-driven legal awareness platform and is NOT a substitute for professional legal advice from a qualified advocate. We do not provide legal representation. While we strive for absolute accuracy based on Indian Statutes (IPC, CrPC, Constitution), the information provided is for educational and guidance purposes only. Consult a verified legal professional for specific case matters.
           </p>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© 2026 NYAYASARTHI INTELLIGENCE SYSTEMS</p>
          <p>BUILDING A JUST AND AWARE INDIA</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
