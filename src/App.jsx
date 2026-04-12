import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import './index.css';
import TopNavBar from './components/TopNavBar';
import FooterSection from './components/FooterSection';
import LandingPage from './pages/LandingPage';
import LawsPage from './pages/LawsPage';
import NyayaBotPage from './pages/NyayaBotPage';
import WomensRightsPage from './pages/WomensRightsPage';
import ResourcesPage from './pages/ResourcesPage';
import CaseTrackerPage from './pages/CaseTrackerPage';
import FindLawyerPage from './pages/FindLawyerPage';
import DocumentAnalyzePage from './pages/DocumentAnalyzePage';


const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // Ensure the DOM has painted the new layout before forcing scroll
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 10);
  }, [pathname]);
  return null;
};

// Standard Layout for content pages
const StandardLayout = ({ children }) => {
  return (
    <div className="layer-base" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopNavBar />
      {children}
      <FooterSection />
    </div>
  );
};

// Application Router
function App() {
  return (
    <>
      <ScrollToTop />
      
      {/* Global Floating SOS Button */}
      <Link to="/safety" className="floating-sos-btn" aria-label="Emergency SOS">
        <span className="material-icons">security</span>
        <span>SOS</span>
      </Link>

      <Routes>
        {/* Standard Website Routes with Header/Footer */}
      <Route path="/" element={<StandardLayout><LandingPage /></StandardLayout>} />
      <Route path="/laws" element={<StandardLayout><LawsPage /></StandardLayout>} />
      <Route path="/safety" element={<StandardLayout><WomensRightsPage /></StandardLayout>} />
      <Route path="/resources" element={<StandardLayout><ResourcesPage /></StandardLayout>} />
      <Route path="/casetracker" element={<StandardLayout><CaseTrackerPage /></StandardLayout>} />
      <Route path="/marketplace" element={<StandardLayout><FindLawyerPage /></StandardLayout>} />
      <Route path="/analyze" element={<StandardLayout><DocumentAnalyzePage /></StandardLayout>} />

      {/* Standalone Full-Screen App Routes */}
      <Route path="/chat" element={<NyayaBotPage />} />
    </Routes>
    </>
  );
}

export default App;
