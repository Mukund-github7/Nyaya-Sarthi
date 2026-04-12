import React from 'react';
import { motion } from 'framer-motion';
import './LawsPage.css';
import LawsSearchHero from '../components/laws/LawsSearchHero';
import LawsContentFeed from '../components/laws/LawsContentFeed';

function LawsPage() {
  return (
    <div className="laws-page-container">
      {/* Background ambient lighting */}
      /*<div className="laws-glow-top" />*/
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10 pt-32 pb-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 40 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <LawsSearchHero />
        </motion.div>
        
        <motion.div 
          className="laws-grid"
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <main className="laws-content-wrap">
            <LawsContentFeed />
          </main>
        </motion.div>
      </div>
    </div>
  );
}

export default LawsPage;
