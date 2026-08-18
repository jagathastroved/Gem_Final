import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Sun, Moon, Sparkles, Gem, ArrowLeft, ArrowRight, Compass } from 'lucide-react';
import { ReportSidebar } from '../report/ReportSidebar.jsx';
import '../../styles/pages/ReportContainerPage.css';
import { useTheme } from '../../context/ThemeContext.jsx';

export function ReportLayout({ report }) {
  const navigate = useNavigate();
  const location = useLocation();


  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const sections = [
    { id: 'welcome', title: 'Welcome', badgeText: 'WELCOME' },
    { id: 'lagna', title: 'Chart & Lagna Math', badgeText: 'JYOTISH CHART MATH' },
    { id: 'primary-gem', title: 'Primary Gemstone', badgeText: 'PRIMARY GEMSTONE' },
    { id: 'gems-avoid', title: 'Gems to Avoid', badgeText: 'GEMS TO AVOID' },
    { id: 'dasha-transit', title: 'Dasha & Transit', badgeText: 'DASHA & TRANSIT' },
    // { id: 'why-report', title: 'Why This Gemstone', badgeText: 'ASTROLOGICAL PROOF' },
    // { id: 'premium', title: 'Premium Deliverables', badgeText: 'UNLOCK FULL REPORT', isPro: true },
  ];

  // Extract the current path ID from the URL (e.g. "/lagna" -> "lagna")
  const currentPathId = location.pathname.split('/')[1] || '';

  let activeSectionIndex = sections.findIndex(s => s.id === currentPathId);
  if (activeSectionIndex === -1) {
    activeSectionIndex = 0;
  }

  useEffect(() => {
    // If the path doesn't match any section, redirect to welcome
    if (!currentPathId || !sections.some(s => s.id === currentPathId)) {
      navigate(`/${sections[0].id}${location.search}`, { replace: true });
    }
  }, [currentPathId, navigate, location.search]);

  const handleNext = () => {
    if (activeSectionIndex < sections.length - 1) {
      navigate(`/${sections[activeSectionIndex + 1].id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (activeSectionIndex > 0) {
      navigate(`/${sections[activeSectionIndex - 1].id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDownload = () => {
    window.print();
  };

  const currentSection = sections[activeSectionIndex];

  return (
    <div className={`report-view-layout ${isDarkMode ? 'theme-dark' : 'theme-light'}`}>

      <ReportSidebar
        sections={sections}
        activeSectionIndex={activeSectionIndex}
        onSelectSection={(idx) => {
          navigate(`/${sections[idx].id}`);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          if (window.innerWidth <= 900) {
            setSidebarCollapsed(true);
          }
        }}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onDownloadReport={handleDownload}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      <main className="report-main-stage">
        {/* Central AstroVed Styled Card Canvas */}
        <div className="report-central-canvas-card">
          <div
            className="card-top-progress-line"
            style={{ width: `${((activeSectionIndex + 1) / sections.length) * 100}%` }}
          />

          {/* AstroVed Header Badge Inside Card */}
          <div className="card-astroved-header-row">
            <div
              className="astroved-logo-brand"
              onClick={() => {
                navigate(`/${sections[0].id}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{ cursor: 'pointer' }}
            >
              <img
                src="https://cdn.astroved.com/images/images-av/AstroVed-Logo.svg"
                alt="AstroVed Logo"
                style={{ height: '36px', width: 'auto' }}
              />
            </div>

            <div className="section-badge-center">
              <Compass className="badge-compass-icon" />
              <span>{currentSection.badgeText}</span>
            </div>
          </div>

          {/* Content Rendering via React Router Outlet */}
          <div className="card-section-body-wrapper">
            <Outlet context={{ report, handleNext }} />
          </div>

          {/* Bottom Card Footer - Back & Next Buttons */}
          <div className="card-navigation-bottom-bar">
            {activeSectionIndex > 0 ? (
              <button className="nav-btn-back" onClick={handleBack}>
                <ArrowLeft className="nav-btn-icon" />
                <span>Back</span>
              </button>
            ) : <div />}

            {activeSectionIndex < sections.length - 1 && (
              <button className="nav-btn-next-green" onClick={handleNext}>
                <span>Next</span>
                <ArrowRight className="nav-btn-icon" />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
