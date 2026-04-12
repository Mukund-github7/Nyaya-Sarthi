import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './FAQSection.css';

/**
 * FAQSection Component
 * 
 * A clean, minimalist accordion-style FAQ section for LawAssist India.
 * Intentionally designed flat and structural (no glassmorphism/shadows)
 * per user request to maintain document texture.
 */
const FAQSection = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is LawAssist India?",
      answer: "LawAssist India is a premium legal intelligence platform designed to bridge the gap between complex Indian statutes and the common citizen. By leveraging advanced AI, we provide instant legal guidance, document summaries, and rights education in a digital-first sanctuary."
    },
    {
      question: "Is the AI Chatbot's advice legally binding?",
      answer: "No. While NyayaBot is trained on extensive Indian legal databases (IPC, BNS, CrPC, etc.), its responses are for informational purposes only. It is designed to help you understand the law, not to replace the professional judgment of a qualified legal practitioner."
    },
    {
      question: "How can I track my case status?",
      answer: "You can use our 'Track Your Case' widget on the landing page or the dedicated Case Intelligence dashboard. Simply enter your CNR number or Case ID to receive real-time updates and AI-driven analysis of your case's progress."
    },
    {
      question: "Is my data secure on this platform?",
      answer: "Absolutely. We employ strict security protocols, including military-grade encryption and isolated storage for sensitive client documentation. Your privacy and data integrity are our highest institutional priorities."
    },
    {
      question: "Can I connect with lawyers directly?",
      answer: "Yes. Our 'Lawyer Connect' directory allows you to search for verified legal professionals by specialization and location. You can view their experience, ratings, and book a consultation directly through the platform."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        
        {/* Section Header */}
        <motion.div 
          className="faq-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="faq-badge">
            <span className="faq-badge-dot" />
            <span className="faq-badge-text">
              Support Intelligence
            </span>
          </div>
          <h2 className="faq-title">
            Common <span className="faq-highlight">Inquiries</span>
          </h2>
          <p className="faq-desc">
            Navigate the complexities of the legal landscape with clarity. Everything you need to know about LawAssist India's digital legal assistance.
          </p>
        </motion.div>

        {/* FAQ Accordion List - Minimalist Flat Look */}
        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index} 
                className="faq-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`faq-question-btn ${isOpen ? 'open' : ''}`}
                >
                  <span className="faq-question-text">
                    {faq.question}
                  </span>
                  <span className="material-icons faq-icon">
                    expand_more
                  </span>
                </button>

                <div 
                  className={`faq-answer-wrapper ${isOpen ? 'open' : ''}`}
                >
                  <p className="faq-answer-text">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA - Minimalist */}
        <motion.div 
          className="faq-cta-minimal"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="faq-cta-content">
            <h3>Still have questions?</h3>
            <p>Our support team is available 24/7 to help you.</p>
          </div>

          <div className="faq-cta-actions">
            <button className="faq-cta-btn-primary" onClick={() => window.scrollTo(0, 0)}>
              Contact Support →
            </button>
            <button className="faq-cta-btn-secondary" onClick={() => navigate('/laws')}>
              Read Docs
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default FAQSection;
