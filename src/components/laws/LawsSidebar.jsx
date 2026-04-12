import React from 'react';
import './LawsSidebar.css';

const domains = [
  { name: 'Constitutional', icon: 'account_balance', active: true },
  { name: 'Criminal (IPC/CrPC)', icon: 'gavel', active: false },
  { name: 'Consumer Protection', icon: 'shopping_bag', active: false },
  { name: 'Women Safety', icon: 'shield', active: false },
  { name: 'Corporate & Labour', icon: 'business_center', active: false },
  { name: 'Property Law', icon: 'home_work', active: false },
];

const LawsSidebar = () => {
  return (
    <div className="laws-sidebar">
      <div className="sidebar-header">
        <h3>Legal Domains</h3>
        <p>NyayaSarthi Intelligence</p>
      </div>

      <nav className="domain-nav">
        {domains.map(d => (
          <button key={d.name} className={`domain-link ${d.active ? 'active' : ''}`}>
            <span className="material-icons">{d.icon}</span>
            {d.name}
          </button>
        ))}
      </nav>

      <div className="sidebar-cta">
        <h4>Need a Specialist?</h4>
        <p>Connect with top lawyers for professional consultation.</p>
        <button className="cta-btn">Submit Inquiry</button>
      </div>
    </div>
  );
};

export default LawsSidebar;
