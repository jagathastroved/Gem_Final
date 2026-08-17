import React from 'react';
import { SectionHeader } from '../ui/SectionHeader.jsx';
import { StatusBadge } from '../ui/Badge.jsx';
import { Card } from '../ui/Card.jsx';
import { GemstoneMaterialize } from '../animations/GemstoneMaterialize.jsx';
import { useOutletContext } from 'react-router-dom';
import '../../styles/pages/GemstonePage.css';

export function GemstonePage() {
  const { report } = useOutletContext();
  if (!report) return null;

  const gem = report?.primaryGemstone?.gemstone;
  const comp = report?.comparison;

  return (
    <section id="primary-gem-section" className="primary-gem-section">
      {/* Your Primary Gemstone */}
      <SectionHeader
        title="Your Primary Gemstone"
        subtitle="Based on your ascendant and planetary placements"
      />
      <Card className="primary-gem-main-card">
        <div className="gem-section-kicker">
          <span>✨ YOUR PRIMARY GEMSTONE ✨</span>
        </div>

        <GemstoneMaterialize gemType={gem?.suitableStone} name={gem?.suitableStone} />

        <h3 className="gem-title">{gem?.suitableStone}</h3>
        <p className="gem-subtext">{gem?.sanskritName} • {gem?.associatedPlanet}</p>

        <div className="gem-badge-wrap">
          <StatusBadge type="recommended">Recommented for You</StatusBadge>
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
