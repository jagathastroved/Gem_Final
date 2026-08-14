import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Sun, Moon, Sparkles, Gem, ArrowLeft, ArrowRight, Compass } from 'lucide-react';
import { ReportSidebar } from '../report/ReportSidebar.jsx';
import { AstrologyDetailsPage } from './AstrologyDetailsPage.jsx';
import { GemstonePage } from './GemstonePage.jsx';
import { GemstoneAvoidPage } from './GemstoneAvoidPage.jsx';
import { DashaTransitPage } from './DashaTransitPage.jsx';
import { WhyThisReportPage } from './WhyThisReportPage.jsx';
import { WearingGuidePage } from './WearingGuidePage.jsx';
import { PremiumPage } from './PremiumPage.jsx';
import '../../styles/pages/ReportContainerPage.css';
import { useTheme } from '../../context/ThemeContext.jsx';

export function ReportContainerPage({ report }) {
  const navigate = useNavigate();
  const { sectionId } = useParams();
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const sections = [
    { id: 'welcome', title: 'Welcome', badgeText: 'WELCOME' },
    { id: 'lagna', title: 'Chart & Lagna Math', badgeText: 'JYOTISH CHART MATH' },
    { id: 'primary-gem', title: 'Primary Gemstone', badgeText: 'PRIMARY GEMSTONE' },
    { id: 'gems-avoid', title: 'Gems to Avoid', badgeText: 'GEMS TO AVOID' },
    { id: 'dasha-transit', title: 'Dasha & Transit', badgeText: 'DASHA & TRANSIT' },
    { id: 'why-report', title: 'Why This Gemstone', badgeText: 'ASTROLOGICAL PROOF' },
    { id: 'premium', title: 'Premium Deliverables', badgeText: 'UNLOCK FULL REPORT', isPro: true },
  ];

  let activeSectionIndex = sections.findIndex(s => s.id === sectionId);
  if (activeSectionIndex === -1) {
    activeSectionIndex = 0;
  }

  useEffect(() => {
    if (!sectionId || !sections.some(s => s.id === sectionId)) {
      navigate(`/${sections[0].id}`, { replace: true });
    }
  }, [sectionId, navigate]);

  const handleNext = () => {
    if (activeSectionIndex < sections.length - 1) {
      navigate(`/${sections[activeSectionIndex + 1].id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/checkout');
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
          <div className="card-top-orange-accent-line" />

          {/* AstroVed Header Badge Inside Card */}
          <div className="card-astroved-header-row">
            <div className="astroved-logo-brand">
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

          {/* Content Rendering Based on Active Index */}
          <div className="card-section-body-wrapper">
            {activeSectionIndex === 0 && (
              <div className="welcome-section-view">
                <div className="journey-purple-pill">
                  <Sparkles className="pill-sparkle-icon" />
                  <span>YOUR GEMSTONE JOURNEY BEGINS</span>
                </div>

                <h1 className="welcome-user-headline">
                  Hey <span className="highlight-user-name">{report.seekerName || 'Seeker'}</span>
                </h1>

                <p className="welcome-intro-p">
                  Your birth chart carries a unique energetic planetary blueprint that influences your personality, strengths, talents, and life direction. Discover the deeper gemstone alignment that amplifies your potential.
                </p>

                <p className="welcome-subintro-p">
                  This personalized Gemstone & Jyotish Report reveals valuable astrological insights into your lagna lord, dasha remedies, and authentic wearing guidelines.
                </p>

                <div className="welcome-includes-box">
                  <h3 className="includes-box-title">
                    <span className="purple-dash-line" />
                    Your personalized Gemstone Report includes:
                  </h3>

                  <div className="includes-grid-two">
                    <div className="include-card-item">
                      <div className="include-check-badge">✓</div>
                      <div>
                        <strong>Your Primary Gemstone</strong>
                        <p>Aligned with Lagna Lord & planetary strength.</p>
                      </div>
                    </div>

                    <div className="include-card-item">
                      <div className="include-check-badge">✓</div>
                      <div>
                        <strong>Gems to Strictly Avoid</strong>
                        <p>Protecting you from conflicting planetary energies.</p>
                      </div>
                    </div>

                    <div className="include-card-item">
                      <div className="include-check-badge">✓</div>
                      <div>
                        <strong>In-depth Birth Chart Math</strong>
                        <p>Lagni, Moon Sign, Nakshatra, and current Dasha.</p>
                      </div>
                    </div>

                    <div className="include-card-item">
                      <div className="include-check-badge">✓</div>
                      <div>
                        <strong>Authentic Wearing Guidelines</strong>
                        <p>Exact metal, finger, day, time, and activation mantra.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSectionIndex === 1 && (
              <AstrologyDetailsPage report={report} onNextSection={handleNext} />
            )}

            {activeSectionIndex === 2 && (
              <GemstonePage report={report} />
            )}

            {activeSectionIndex === 3 && (
              <GemstoneAvoidPage report={report} />
            )}

            {activeSectionIndex === 4 && (
              <DashaTransitPage report={report} />
            )}

            {activeSectionIndex === 5 && (
              <WhyThisReportPage />
            )}

            {activeSectionIndex === 6 && (
              <PremiumPage onGetReport={() => navigate('/checkout')} />
            )}
          </div>

          {/* Bottom Card Footer - Back & Next Buttons */}
          <div className="card-navigation-bottom-bar">
            {activeSectionIndex > 0 ? (
              <button className="nav-btn-back" onClick={handleBack}>
                <ArrowLeft className="nav-btn-icon" />
                <span>Back</span>
              </button>
            ) : <div />}

            <button className="nav-btn-next-green" onClick={handleNext}>
              <span>{activeSectionIndex === sections.length - 1 ? 'Get Full Report Now' : 'Next'}</span>
              <ArrowRight className="nav-btn-icon" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
