import React from 'react';
import {
  ShoppingCart, Info, Quote, FileText, CheckCircle2,
  Sparkles, Leaf, Zap, Diamond, Award, ShieldCheck, Truck, RotateCcw,
  Compass, Shield
} from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { GemstoneMaterialize } from '../animations/GemstoneMaterialize.jsx';
import '../../styles/pages/AstrologyDetailsPage.css';
import '../../styles/pages/GemstonePage.css';

export function GemstonePage() {
  const { report } = useOutletContext();
  if (!report) return null;

  const gem = report?.primaryGemstone?.gemstone;
  const comp = report?.comparison;

  return (
    <section id="primary-gem-section" className="primary-gem-section">

      {/* Header */}
      <div className="section-title-center">
        <h2>Your Primary <span className="text-emerald">Gemstone</span></h2>
        <div className="blueprint-subtitle-row">
          <div className="diamond-icon">✦</div>
          <p>Based on your ascendant and planetary placements</p>
          <div className="diamond-icon">✦</div>
        </div>
      </div>

      {/* Grid: 2 Columns for Hero */}
      <div className="gem-hero-grid">

        {/* Left Column: Gemstone Showcase */}
        <div className="gem-showcase-card">
          <div className="gem-showcase-kicker">
            <span>✦</span> YOUR PRIMARY GEMSTONE <span>✦</span>
          </div>

          <div className="gem-image-container">
            <GemstoneMaterialize gemType={gem?.suitableStone} name={gem?.suitableStone} />
          </div>

          <h3 className="gem-title">{gem?.suitableStone}</h3>
          <p className="gem-subtext">{gem?.sanskritName} • {gem?.associatedPlanet}</p>

          <div className="recommended-badge">
            <CheckCircle2 className="rec-icon" />
            <span>RECOMMENDED FOR YOU</span>
          </div>

          <p className="gem-description">
            {gem?.description}
          </p>

          <div className="hero-features-grid-new">
            <div className="hf-item-new">
              <div className="hf-icon-new"><Leaf size={14} /></div>
              <span>100% Natural</span>
            </div>
            <div className="hf-item-new">
              <div className="hf-icon-new"><Zap size={14} /></div>
              <span>Energized</span>
            </div>
            <div className="hf-item-new">
              <div className="hf-icon-new"><Diamond size={14} /></div>
              <span>Excellent Cut</span>
            </div>
            <div className="hf-item-new">
              <div className="hf-icon-new"><Award size={14} /></div>
              <span>Lab Certified</span>
            </div>
          </div>

          <button className="gem-buy-btn">
            <ShoppingCart className="btn-icon" />
            <span>Buy Now</span>
          </button>

          <div className="hero-guarantees-compact">
            <div className="hg-item">
              <ShieldCheck size={14} /> <span>Secure Payment</span>
            </div>
            <span className="hg-dot">•</span>
            <div className="hg-item">
              <Truck size={14} /> <span>Free Shipping</span>
            </div>
            <span className="hg-dot">•</span>
            <div className="hg-item">
              <RotateCcw size={14} /> <span>7 Days Return</span>
            </div>
          </div>
        </div>

        {/* Right Column: Why This Stone? */}
        <div className="why-stone-container">
          <div className="why-stone-header">
            <div className="dash-line-small"></div>
            <span>WHY THIS STONE?</span>
            <div className="dash-line-small"></div>
          </div>

          <div className="why-timeline">
            {gem?.whyThisStone?.map((item, index) => {
              const Icon = index === 0 ? Compass : index === 1 ? Shield : Zap;
              return (
                <div key={item.id} className="timeline-item">
                  <div className="timeline-icon-wrap">
                    <div className="timeline-circle">
                      <Icon className="timeline-zodiac-icon" size={24} />
                    </div>
                    <div className="timeline-number">{String(index + 1).padStart(2, '0')}</div>
                  </div>
                  <div className="timeline-content">
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Info Banner */}
      <div className="gem-info-banner">
        <Info className="info-icon" />
        <p>This recommendation is based on in-depth celestial and astrological methods used in this report.</p>
      </div>

      {/* Why Your Recommendation Is Different */}
      <div className="comparison-section">
        <div className="section-title-center">
          <div className="blueprint-subtitle-row">
            <div className="diamond-icon">✦</div>
            <h2>Why Your Recommendation Is Different</h2>
            <div className="diamond-icon">✦</div>
          </div>
        </div>

        <div className="comparison-grid">
          {/* Left Card: Generic */}
          <div className="comp-card generic-card">
            <div className="comp-header-red">WHAT A GENERIC READER BASED TOOL WOULD SAY</div>
            <div className="quote-circle">
              <Quote className="quote-icon" />
            </div>
            <h3 className="generic-quote">{comp?.genericSaying}</h3>
            <p className="generic-basis">{comp?.genericSubtext}</p>
          </div>

          {/* Right Card: Actual Chart */}
          <div className="comp-card actual-card">
            <div className="comp-header-green">
              <FileText className="file-icon" />
              <span>WHAT YOUR ACTUAL CHART SAYS</span>
            </div>
            <h3 className="actual-title">{comp?.actualChartSaying}</h3>
            <p className="actual-desc">{comp?.actualChartText}</p>

            <div className="recommendation-highlight-box">
              <div className="rec-box-left">
                <div className="small-gem-wrap">
                  <GemstoneMaterialize gemType={gem?.suitableStone} name={gem?.suitableStone} disableFloat={true} />
                </div>
              </div>
              <div className="rec-box-right">
                <strong>{comp?.recommendationLabel}</strong>
                <span>{comp?.recommendationMethod}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
