import React from 'react';
import { Sparkles } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import '../../styles/pages/ReportContainerPage.css';

export function WelcomePage() {
  const { report } = useOutletContext();
  const userName = report?.astroBluePrint?.full_name;

  return (
    <div className="welcome-section-view">
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

      <div className="welcome-includes-box">
        <h3 className="includes-box-title">
          <span className="purple-dash-line" />
          Your personalized Gemstone Report includes:
        </h3>

        <div className="includes-grid-two">
          <div className="include-card-item">
            <div className="include-check-badge">✓</div>
            <div>
              <strong>Astrology Blueprint</strong>
              <p>In-depth analysis of your Lagna, Moon Sign, and Nakshatra.</p>
            </div>
          </div>

          <div className="include-card-item">
            <div className="include-check-badge">✓</div>
            <div>
              <strong>Primary Gemstone</strong>
              <p>The most beneficial gemstone aligned with your planetary strength.</p>
            </div>
          </div>

          <div className="include-card-item">
            <div className="include-check-badge">✓</div>
            <div>
              <strong>Avoid Gemstone</strong>
              <p>Protecting you from conflicting planetary energies.</p>
            </div>
          </div>

          <div className="include-card-item">
            <div className="include-check-badge">✓</div>
            <div>
              <strong>Dasha and Transits</strong>
              <p>Actionable timeline guidance for your planetary periods.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
