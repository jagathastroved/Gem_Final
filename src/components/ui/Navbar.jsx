import React, { useState } from 'react';
import { Gem, Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './Button.jsx';
import './Navbar.css';

export function Navbar({ onGetReportClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isFormPage = location.pathname === '/';
  const isLoadingPage = location.pathname === '/loading';

  if (isLoadingPage) return null; // Dark loading screen has no standard navbar

  const handleNav = (path) => {
    setMobileOpen(false);
    navigate(path);
  };

  const scrollToSection = (id) => {
    setMobileOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="app-navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => handleNav('/')}>
          <div className="brand-icon-wrap">
            <Gem className="brand-gem-icon" />
            <Sparkles className="brand-sparkle-icon" />
          </div>
          <div className="brand-text">
            <span className="brand-title">Jyotish Gemstones</span>
            <span className="brand-subtitle">Vedic Astrology Analysis</span>
          </div>
        </div>

        <nav className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
          <button className="nav-link" onClick={() => handleNav('/')}>Birth Details</button>
          {!isFormPage && (
            <>
              <button className="nav-link" onClick={() => scrollToSection('blueprint-section')}>Blueprint</button>
              <button className="nav-link" onClick={() => scrollToSection('primary-gem-section')}>Primary Gem</button>
              <button className="nav-link" onClick={() => scrollToSection('timeline-section')}>Timeline</button>
              <button className="nav-link" onClick={() => scrollToSection('report-section')}>Premium Report</button>
            </>
          )}
        </nav>

        <div className="navbar-actions">
          <Button 
            variant="emerald" 
            size="sm" 
            onClick={onGetReportClick}
            icon={ArrowRight}
          >
            Get Report
          </Button>

          <button 
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
