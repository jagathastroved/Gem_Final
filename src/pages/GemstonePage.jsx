import React from 'react';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';
import { StatusBadge } from '../components/ui/Badge.jsx';
import { Card } from '../components/ui/Card.jsx';
import { GemstoneMaterialize } from '../components/animations/GemstoneMaterialize.jsx';
import '../styles/pages/GemstonePage.css';

export function GemstonePage({ report }) {
  if (!report) return null;

  const gem = report.gemstone;
  const comp = report.comparison;

  return (
    <section id="primary-gem-section" className="primary-gem-section">
      {/* Section 4: Your Primary Gemstone */}
      <SectionHeader 
        number="4" 
        title="Your Primary Gemstone" 
      />

      <Card className="primary-gem-main-card">
        <div className="gem-section-kicker">
          <span>✨ YOUR PRIMARY GEMSTONE ✨</span>
        </div>

        <GemstoneMaterialize gemType="emerald" name={gem?.suitableStone} />

        <h3 className="gem-title">{gem?.suitableStone}</h3>
        <p className="gem-subtext">{gem?.sanskritName} • {gem?.associatedPlanet}</p>

        <div className="gem-badge-wrap">
          <StatusBadge type="recommended">{gem?.badgeText}</StatusBadge>
        </div>

        <p className="gem-description">
          {gem?.description}
        </p>

        {/* Inner Box: Why This Stone? */}
        <div className="why-this-stone-box">
          <div className="why-box-title">
            <span>WHY THIS STONE?</span>
          </div>

          <div className="why-items-list">
            {gem?.whyThisStone?.map((item) => (
              <div key={item.id} className="why-item-row">
                <div className="why-num-badge">{item.id}</div>
                <div className="why-item-text">
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="primary-gem-footer-note">
          This recommendation is based on the birth details and astrological method used in this report.
        </p>
      </Card>

      {/* Section 5: Why Your Recommendation Is Different */}
      <div className="margin-top-xl">
        <SectionHeader 
          number="5" 
          title="Why Your Recommendation Is Different" 
        />

        <div className="comparison-stack">
          {/* Top Generic Card */}
          <Card variant="avoid" className="generic-tool-card">
            <span className="comp-kicker comp-kicker-avoid">
              WHAT A GENERIC RASHI-BASED TOOL WOULD SAY
            </span>
            <h4 className="generic-saying-title">{comp?.genericSaying}</h4>
            <span className="generic-subtext-label">{comp?.genericSubtext}</span>
          </Card>

          {/* Bottom Actual Chart Card */}
          <Card variant="emerald" className="actual-chart-card">
            <span className="comp-kicker comp-kicker-emerald">
              WHAT YOUR ACTUAL CHART SAYS
            </span>
            <h4 className="actual-chart-title">{comp?.actualChartSaying}</h4>
            <p className="actual-chart-text">{comp?.actualChartText}</p>

            <div className="our-recommendation-highlight">
              <strong>{comp?.recommendationLabel}</strong>
              <span>{comp?.recommendationMethod}</span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
