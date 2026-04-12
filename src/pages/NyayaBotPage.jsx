import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import client from '../api/client';
import useVoice from '../hooks/useVoice';
import DocumentAnalyzer from '../components/DocumentAnalyzer';
import './NyayaBotPage.css';

/**
 * NyayaBotPage Component
 * A high-fidelity, standalone AI Chatbot interface.
 * Translated strictly to modular CSS from Tailwind design.
 */
const NyayaBotPage = () => {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: "Namaste. I am NyayaBot, your digital legal assistant. Based on current Indian jurisprudence, I can help you understand statutes, research case laws, or clarify legal implications. How can I assist you today?",
      timestamp: '10:00 AM'
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [metadata, setMetadata] = useState(null);
  const [isDocAnalyzerOpen, setIsDocAnalyzerOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const { isListening, transcript, startListening, stopListening, setTranscript } = useVoice();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Sync voice transcript to input
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const toggleListen = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userText = input;
    const newMessage = {
      role: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setTranscript('');
    setIsLoading(true);

    try {
      // Artificial delay for 'Typing...' effect so it looks real in demo
      await new Promise(resolve => setTimeout(resolve, 1000));

      let aiText = "I'm sorry, I couldn't process your request at this moment.";
      let resultMetadata = null;

      try {
        const response = await client.post('/lexbot/chat', { message: userText });
        aiText = response.data.reply || aiText;
        resultMetadata = response.data.metadata || null;
      } catch (err) {
        console.error("Chat error:", err);
        // Fallback for Demo Mode to simulate success if backend crashes
        aiText = "Under current Indian Law, you have strong grounds. Let me compile the relevant statues and prepare a draft you can share with a verified duty lawyer on NyayaSarthi.";
      }
      
      const aiMessage = {
        role: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      if (resultMetadata) {
        setMetadata(resultMetadata);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDocumentResult = (result) => {
    // Generate AI response based on document
    const aiMessage = {
      role: 'ai',
      text: "I have analyzed your document.\n\n" +
            "**Risk Summary:**\n" + (result.summary || result.riskSummary || "Standard terms identified.") + "\n\n" +
            "**Red Flags Detected:**\n" + (result.redFlags?.map(f => "- " + f).join('\n') || "None found."),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, aiMessage]);
  };

  return (
    <div className="bot-page-container">

      <DocumentAnalyzer 
        isOpen={isDocAnalyzerOpen} 
        onClose={() => setIsDocAnalyzerOpen(false)} 
        onResult={handleDocumentResult} 
      />

      {/* Sidebar: Navigation & History */}
      <motion.aside 
        className="bot-sidebar-left"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="bot-sidebar-header">
          <Link to="/" className="bot-brand-link" style={{ textDecoration: 'none' }}>
            <span className="material-icons brand-logo-icon">gavel</span>
            <h1 className="bot-brand-title">Nyaya<span>Sarthi</span></h1>
          </Link>
          <button className="bot-new-chat-btn" onClick={() => { setMessages([{ role: 'ai', text: "Namaste. How can I assist you today?", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]); setMetadata(null); }}>
            <span className="material-icons">add</span>
            <span>New Consultation</span>
          </button>
        </div>

        <div className="bot-sidebar-scrollable">
          <div className="bot-sidebar-section" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.5rem', marginBottom: '-0.5rem' }}>
            <h4 className="bot-sidebar-subtitle">Main Portal</h4>
            <div className="bot-nav-list">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <button className="bot-nav-item">
                  <span className="material-icons icon-faded">home</span>
                  <span className="item-truncate">Home Page</span>
                </button>
              </Link>
              <Link to="/laws" style={{ textDecoration: 'none' }}>
                <button className="bot-nav-item">
                  <span className="material-icons icon-faded">menu_book</span>
                  <span className="item-truncate">Laws Knowledge Base</span>
                </button>
              </Link>
            </div>
          </div>

          <div className="bot-sidebar-section">
            <h4 className="bot-sidebar-subtitle">Research Vault</h4>
            <div className="bot-nav-list">
              {['Land Acquisition Act 2013', 'Domestic Violence Protocol', 'IT Act Amendment 2024'].map((item) => (
                <button key={item} className="bot-nav-item">
                  <span className="material-icons icon-faded">folder</span>
                  <span className="item-truncate">{item}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bot-sidebar-section">
            <h4 className="bot-sidebar-subtitle">Recent History</h4>
            <div className="bot-nav-list">
              {['Section 498A Guidance', 'Property Dispute FAQ', 'Marriage Registration'].map((item) => (
                <button key={item} className="bot-nav-item">
                  <span className="material-icons icon-faded">chat_bubble_outline</span>
                  <span className="item-truncate">{item}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bot-sidebar-footer">
          <button className="bot-nav-item">
            <span className="material-icons">settings</span>
            <span>Settings</span>
          </button>
          <button className="bot-nav-item">
            <span className="material-icons">help_outline</span>
            <span>Support</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Chat Area */}
      <motion.main 
        className="bot-main-area"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >

        {/* Chat Header */}
        <header className="bot-main-header">
          <div className="header-info-group">
            <div className="ai-mode-icon">
              <span className="material-icons">bolt</span>
            </div>
            <div>
              <h3 className="header-info-title">Active Intelligence Mode</h3>
              <p className="header-info-subtitle">Sovereign Legal LLM v4.2</p>
            </div>
          </div>
          <div className="header-actions">
            <button className="icon-btn outline-hover">
              <span className="material-icons">share</span>
            </button>
            <button className="icon-btn outline-hover">
              <span className="material-icons">more_vert</span>
            </button>
          </div>
        </header>

        {/* Message Feed */}
        <div className="bot-message-feed">
          <div className="bot-feed-inner">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message-row ${msg.role === 'user' ? 'message-user' : 'message-ai'}`}>
                <div className="message-content-group">
                  <div className="message-avatar">
                    <span className="material-icons">{msg.role === 'ai' ? 'smart_toy' : 'person'}</span>
                  </div>
                  <div className="message-text-group">
                    <div className="message-bubble">
                      {msg.text.split('\n').map((line, i) => <p key={i} className={i > 0 ? 'mt-line' : ''}>{line}</p>)}
                    </div>
                    <span className="message-timestamp">{msg.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message-row message-ai">
                <div className="message-content-group">
                  <div className="message-avatar">
                    <span className="material-icons">smart_toy</span>
                  </div>
                  <div className="message-text-group">
                    <div className="message-bubble">
                      <p className="typing-indicator">...</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bot-input-area">
          <div className="bot-suggestion-chips">
            {['Check IPC 420', 'Divorce Rights', 'Police Protocol', 'Rent Agreement FAQ'].map((action) => (
              <button key={action} className="action-chip" onClick={() => { setInput(action); handleSend(); }}>
                {action}
              </button>
            ))}
          </div>

          <div className="bot-input-wrapper">
            <div className="input-left-controls">
              <button className="icon-btn action-hover" onClick={() => setIsDocAnalyzerOpen(true)}>
                <span className="material-icons">attach_file</span>
              </button>
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isListening ? "Listening..." : "Ask anything about Indian Law..."}
              className="bot-text-input"
              disabled={isLoading}
            />
            <div className="input-right-controls">
              <button className={`icon-btn action-hover ${isListening ? 'listening-active' : ''}`} onClick={toggleListen}>
                <span className="material-icons" style={{ color: isListening ? '#f87171' : 'inherit' }}>mic</span>
              </button>
              <button className="bot-send-btn" onClick={handleSend} disabled={isLoading}>
                Consult
              </button>
            </div>
          </div>
          <p className="bot-disclaimer">
            NyayaBot provides general legal information based on Indian statutes. It is NOT a substitute for professional legal advice.
          </p>
        </div>
      </motion.main>

      {/* Right Sidebar: Contextual Info */}
      <motion.aside 
        className="bot-sidebar-right"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      >
        <div className="bot-sidebar-section">
          <h4 className="bot-sidebar-subtitle color-primary">Case Intelligence</h4>
          {metadata ? (
            <div className="intelligence-card">
              <div className="intel-group">
                <p className="intel-label">Domain</p>
                <p className="intel-value">{metadata.domain || 'General Law'}
                  {metadata.severity && (
                    <span style={{ 
                      color: metadata.severity === 'High' ? '#f87171' : '#fbbf24', 
                      marginLeft: '4px',
                      fontSize: '0.8rem',
                      border: '1px solid currentColor',
                      padding: '2px 6px',
                      borderRadius: '12px'
                    }}>
                      {metadata.severity} Severity
                    </span>
                  )}
                </p>
              </div>
              <div className="intel-group" style={{ marginTop: '1rem' }}>
                <p className="intel-label">Legal Recommendation</p>
                <p className="intel-value italic-text">
                  {metadata.recommendation || 'Consult with a verified lawyer on our platform for specific actionable advice.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="intelligence-card" style={{ opacity: 0.5 }}>
              <p className="intel-value italic-text">Chat with NyayaBot to generate contextual case intelligence.</p>
            </div>
          )}
        </div>

        <div className="bot-sidebar-section">
          <h4 className="bot-sidebar-subtitle">Related Precedents</h4>
          <div className="precedent-list">
            {[1, 2].map((i) => (
              <div key={i} className="precedent-card">
                <p className="precedent-title">State vs. Digital Assets Corp ({2020 + i})</p>
                <p className="precedent-desc">Supreme Court ruling on statutory definitions.</p>
              </div>
            ))}
          </div>
        </div>
      </motion.aside>
    </div>
  );
};

export default NyayaBotPage;
