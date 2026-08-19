import React from 'react';
import { Compass, Gem, ShieldAlert, Hourglass } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import '../../styles/pages/ReportContainerPage.css';
import '../../styles/pages/AstrologyDetailsPage.css';
import '../../styles/pages/WelcomePage.css';

export function WelcomePage() {
  const { report } = useOutletContext();
  const userName = report?.astroBluePrint?.full_name || '';

  return (
    <div className="welcome-section-view blueprint-page-section">
      {/* Header */}
      <div className="section-title-center">
        <h2>Welcome, <span className="text-emerald" style={{ textTransform: 'capitalize' }}>{userName}</span></h2>
        <div className="blueprint-subtitle-row">
          <div className="diamond-icon">✦</div>
          <p>Your gemstone journey begins</p>
          <div className="diamond-icon">✦</div>
        </div>
      </div>

      <div className="welcome-intro-card bp-card-horizontal">
        <div className="bg-network-overlay nakshatra-network"></div>
        <div className="bp-text-col welcome-intro-text-col">
          <p className="welcome-intro-p">
            Your birth chart carries a unique energetic planetary blueprint that influences your personality, strengths, talents, and life direction. Discover the deeper gemstone alignment that amplifies your potential.
          </p>
          <p className="welcome-subintro-p">
            This personalized Gemstone & Jyotish Report reveals valuable astrological insights into your lagna lord, dasha remedies, and authentic wearing guidelines.
          </p>
        </div>
      </div>

      <div className="welcome-includes-container">
        <div className="planetary-period-divider">
          <div className="dash-line"></div>
          <div className="diamond-icon">✦</div>
          <span>YOUR PERSONALIZED REPORT INCLUDES</span>
          <div className="diamond-icon">✦</div>
          <div className="dash-line"></div>
        </div>

        <div className="blueprint-grid-2">
          {/* Card 1 */}
          <div className="bp-card-horizontal">
            <div className="bg-network-overlay lagna-network"></div>
            <div className="icon-wrapper">
              <div className="dotted-ring-bg"></div>
              <div className="icon-circle lagna-circle">
                <Compass className="bp-icon" />
              </div>
            </div>
            <div className="bp-text-col">
              <span className="bp-label">Astrology Blueprint</span>
              <p className="bp-subtext" style={{ margin: 0 }}>In-depth analysis of your Lagna, Moon Sign, and Nakshatra.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bp-card-horizontal">
            <div className="bg-network-overlay nakshatra-network"></div>
            <div className="icon-wrapper">
              <div className="dotted-ring-bg maha-ring"></div>
              <div className="icon-circle nakshatra-circle">
                <Gem className="bp-icon" />
              </div>
            </div>
            <div className="bp-text-col">
              <span className="bp-label">Primary Gemstone</span>
              <p className="bp-subtext" style={{ margin: 0 }}>The most beneficial gemstone aligned with your planetary strength.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bp-card-horizontal">
            <div className="bg-network-overlay lagna-network"></div>
            <div className="icon-wrapper">
              <div className="dotted-ring-bg antar-ring"></div>
              <div className="icon-circle lagna-circle">
                <ShieldAlert className="bp-icon" />
              </div>
            </div>
            <div className="bp-text-col">
              <span className="bp-label">Avoid Gemstone</span>
              <p className="bp-subtext" style={{ margin: 0 }}>Protecting you from conflicting planetary energies.</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bp-card-horizontal">
            <div className="bg-network-overlay nakshatra-network"></div>
            <div className="icon-wrapper">
              <div className="dotted-ring-bg"></div>
              <div className="icon-circle maha-circle">
                <Hourglass className="bp-icon" />
              </div>
            </div>
            <div className="bp-text-col">
              <span className="bp-label">Dasha and Transits</span>
              <p className="bp-subtext" style={{ margin: 0 }}>Actionable timeline guidance for your planetary periods.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
