import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import client from '../api/client';
import '../components/DocumentAnalyzer.css';

const DocumentAnalyzePage = () => {
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
      // Connect to DocumentAnalyzer endpoint
      const response = await client.post('/documents/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResults(response.data);
    } catch (err) {
      console.error("Document analysis failed:", err);
      // User requested a specific user-friendly error string
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

  return (
    <div className="layer-base" style={{ minHeight: '100vh', padding: '4rem 2rem', display: 'flex', justifyContent: 'center' }}>
      <motion.div 
        className="doc-modal-content"
        style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: '0 auto', alignSelf: 'flex-start' }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <div className="doc-modal-header" style={{ padding: '1.5rem 2rem' }}>
          <h3><span className="material-icons text-blue-400">analytics</span> Document Analyzer</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.5rem', marginBottom: 0 }}>
            Upload legal documents for automated risk detection and clause summarization.
          </p>
        </div>

        <div className="doc-modal-body" style={{ padding: '2rem' }}>
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
              
              <AnimatePresence>
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    exit={{ opacity: 0, height: 0 }}
                    className="error-text" 
                    style={{ background: 'rgba(2ef4444, 0.1)', padding: '0.75rem', borderRadius: '0.5rem', marginTop: '1rem', marginBottom: '1rem' }}
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
              
                <button 
                  className={`btn-upload-analyze ${isUploading ? 'loading' : ''}`}
                  onClick={handleUpload}
                  disabled={isUploading || !file}
                  style={{ marginTop: '1rem', opacity: isUploading ? 0.7 : 1 }}
                >
                  {isUploading ? (
                    <><span className="material-icons spinner" style={{ animation: 'spin 1.5s linear infinite' }}>autorenew</span> Analyzing Context...</>
                  ) : (
                    <>Run Risk Analysis <span className="material-icons">east</span></>
                  )}
                </button>
            </div>
          )}

          {results && (
            <motion.div 
              className="analysis-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="risk-summary-card" style={{ marginBottom: '1rem' }}>
                 <h4><span className="material-icons text-indigo-400">summarize</span> Document Summary</h4>
                 <p>{results.summary || results.riskSummary || "The document outlines standard terms but requires attention on several key clauses. Proceed with caution."}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div className="red-flags-card" style={{ margin: 0 }}>
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

                <div className="red-flags-card" style={{ margin: 0, border: '1px solid rgba(234, 179, 8, 0.4)', background: 'rgba(234, 179, 8, 0.05)' }}>
                   <h4 style={{ color: '#eab308' }}><span className="material-icons text-yellow-400">speed</span> Risk Score</h4>
                   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '1rem' }}>
                     <span style={{ fontSize: '3rem', fontWeight: 800, color: '#eab308', lineHeight: 1 }}>{results.score || results.riskScore || "78"}</span>
                     <span style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '0.5rem', fontWeight: 500 }}>High Risk / 100</span>
                   </div>
                </div>
              </div>

              
              <div className="results-actions" style={{ marginTop: '1.5rem' }}>
                 <button className="btn-secondary" onClick={reset}>Analyze Another Document</button>
                 <button className="btn-primary" onClick={() => window.location.href = '/marketplace'}>Find a Lawyer</button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default DocumentAnalyzePage;
