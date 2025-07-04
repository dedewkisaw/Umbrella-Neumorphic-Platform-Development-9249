import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AppStore from './components/AppStore';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-neu-100">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/marketplace" element={<AppStore />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;