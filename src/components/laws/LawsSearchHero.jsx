import React from 'react';
import './LawsSearchHero.css';

const LawsSearchHero = () => {
  return (
    <div className="laws-search-hero">
      <h1 className="laws-hero-title">
        <span className="saffron-gradient">Understand Indian Laws</span> &mdash; <span>Simply</span>
      </h1>
      <p className="laws-hero-subtitle">
        Democratizing legal knowledge through digital intelligence. Search statutes, sections, and legal definitions in plain language.
      </p>
      
      <div className="laws-search-bar-wrap">
        <input 
          type="text" 
          placeholder="Search for IPC 420, CrPC sections, or 'Right to Privacy'..." 
          className="laws-search-input"
        />
        <button className="laws-search-btn">Search</button>
      </div>

      <div className="laws-category-chips">
        {['CRIMINAL', 'CIVIL', 'FAMILY', 'PROPERTY', 'LABOUR', 'CYBER'].map((cat, idx) => (
          <button key={cat} className={`law-chip ${idx === 0 ? 'active' : ''}`}>{cat}</button>
        ))}
      </div>
    </div>
  );
};

export default LawsSearchHero;
