import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AppStore from './components/AppStore';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import GDPR from './pages/GDPR';
import About from './pages/About';
import Contact from './pages/Contact';
import Help from './pages/Help';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-neu-100">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/marketplace" element={<AppStore />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/gdpr" element={<GDPR />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          {/* Placeholder routes for other footer links */}
          <Route path="/careers" element={<About />} />
          <Route path="/press" element={<About />} />
          <Route path="/community" element={<Help />} />
          <Route path="/status" element={<Help />} />
          <Route path="/bugs" element={<Help />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;