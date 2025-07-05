import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import PainPoints from '../components/PainPoints';
import USP from '../components/USP';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neu-100">
      <Header />
      {/* Add padding-top to prevent content from hiding behind fixed header */}
      <div className="pt-20 lg:pt-24">
        <Hero />
        <PainPoints />
        <USP />
        <Features />
        <Pricing />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;