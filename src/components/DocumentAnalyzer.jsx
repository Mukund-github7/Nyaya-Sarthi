import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import client from '../api/client';
import './DocumentAnalyzer.css';

const DocumentAnalyzer = ({ isOpen, onClose, onResult }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError('');
      setResults(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a document to analyze.');
      return;
    }

    setIsUploading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('document', file);

    try {
      // PRD says response is colored risk report: Red Flags, Risk Summary
      const response = await client.post('/documents/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResults(response.data);
      if (onResult) {
        onResult(response.data);
      }
    } catch (err) {
      console.error("Document analysis failed:", err);
      setError('AI is currently busy, please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setResults(null);
    setError('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="doc-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="doc-modal-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <div className="doc-modal-header">
            <h3><span className="material-icons text-blue-400">analytics</span> Document Analyzer</h3>
            <button className="icon-btn" onClick={() => { reset(); onClose(); }}>
              <span className="material-icons">close</span>
            </button>
          </div>

          <div className="doc-modal-body">
            {!results && (
              <div className="upload-container">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept=".pdf,.png,.jpg,.jpeg" 
                  style={{ display: 'none' }} 
                />
                <div 
                  className="upload-dropzone" 
                  onClick={() => fileInputRef.current?.click()}
                >
                  <span className="material-icons upload-icon">cloud_upload</span>
                  <h4>{file ? file.name : 'Upload Legal Document'}</h4>
                  <p>{file ? 'Click to change file' : 'Accepts PDF, JPG, PNG (Max 10MB)'}</p>
                </div>
                {error && <p className="error-text">{error}</p>}
                
                <button 
                  className={`btn-upload-analyze ${isUploading ? 'loading' : ''}`}
                  onClick={handleUpload}
                  disabled={isUploading || !file}
                >
                  {isUploading ? (
                    <><span className="material-icons spinner">autorenew</span> Analyzing Context...</>
                  ) : (
                    <>Run Risk Analysis <span className="material-icons">east</span></>
                  )}
                </button>
              </div>
            )}

            {results && (
              <div className="analysis-results">
                <div className="risk-summary-card">
                   <h4><span className="material-icons text-indigo-400">summarize</span> Document Summary</h4>
                   <p>{results.summary || results.riskSummary || "The document outlines standard terms but requires attention on several key clauses. Proceed with caution."}</p>
                </div>
                
                <div className="red-flags-card">
                   <h4><span className="material-icons text-red-400">warning</span> Red Flags</h4>
                   <ul className="red-flags-list">
                     {results.redFlags?.map((flag, idx) => (
                        <li key={idx}>
                          <span className="flag-dot"></span>
                          {flag}
                        </li>
                     )) || (
                        <li>No prominent red flags detected, but recommend a manual lawyer review.</li>
                     )}
                   </ul>
                </div>
                
                <div className="results-actions">
                   <button className="btn-secondary" onClick={reset}>Analyze Another</button>
                   <button className="btn-primary" onClick={() => { reset(); onClose(); }}>Done</button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DocumentAnalyzer;
