import React from 'react';
import { Sparkles, FileText, Diamond, Shield, Clock, CheckCircle2 } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import '../../styles/pages/ReportContainerPage.css';
import '../../styles/pages/WelcomePage.css';

export function WelcomePage() {
  const { report } = useOutletContext();
  const userName = report?.astroBluePrint?.full_name || 'Jagath';

  return (
    <div className="welcome-section-view">
      {/* Hero Section */}
      <div className="welcome-hero-banner">
        <div className="hero-right-col">
          <div className="journey-purple-pill">
            <Sparkles className="pill-sparkle-icon" />
            <span>YOUR GEMSTONE JOURNEY BEGINS</span>
          </div>

          <h1 className="welcome-user-headline">
            Hey <span className="highlight-user-name" style={{ textTransform: 'capitalize' }}>{userName}</span>
          </h1>

          <p className="welcome-intro-p">
            Your birth chart carries a unique energetic planetary blueprint that influences your personality, strengths, talents, and life direction. Discover the deeper gemstone alignment that amplifies your potential.
          </p>

          <p className="welcome-subintro-p">
            This personalized Gemstone & Jyotish Report reveals valuable astrological insights into your lagna lord, dasha remedies, and authentic wearing guidelines.
          </p>
        </div>
      </div>

      <div className="welcome-includes-container">
        <div className="welcome-divider-row">
          <div className="divider-line" />
          <div className="divider-icon">✧</div>
          <h3 className="includes-box-title">
            Your personalized Gemstone Report includes:
          </h3>
          <div className="divider-icon">✧</div>
          <div className="divider-line" />
        </div>

        <div className="includes-grid-two">
          {/* Card 1 */}
          <div className="include-card-item">
            <div className="include-icon-wrapper">
              <div className="icon-circle">
                <FileText className="main-feature-icon" />
              </div>
              <div className="check-badge-overlay"><CheckCircle2 className="check-icon" /></div>
            </div>
            <div className="include-text-col">
              <strong>Astrology Blueprint</strong>
              <p>In-depth analysis of your Lagna, Moon Sign, and Nakshatra.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="include-card-item">
            <div className="include-icon-wrapper">
              <div className="icon-circle">
                <Diamond className="main-feature-icon" />
              </div>
              <div className="check-badge-overlay"><CheckCircle2 className="check-icon" /></div>
            </div>
            <div className="include-text-col">
              <strong>Primary Gemstone</strong>
              <p>The most beneficial gemstone aligned with your planetary strength.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="include-card-item">
            <div className="include-icon-wrapper">
              <div className="icon-circle">
                <Shield className="main-feature-icon" />
              </div>
              <div className="check-badge-overlay"><CheckCircle2 className="check-icon" /></div>
            </div>
            <div className="include-text-col">
              <strong>Avoid Gemstone</strong>
              <p>Protecting you from conflicting planetary energies.</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="include-card-item">
            <div className="include-icon-wrapper">
              <div className="icon-circle">
                <Clock className="main-feature-icon" />
              </div>
              <div className="check-badge-overlay"><CheckCircle2 className="check-icon" /></div>
            </div>
            <div className="include-text-col">
              <strong>Dasha and Transits</strong>
              <p>Actionable timeline guidance for your planetary periods.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
