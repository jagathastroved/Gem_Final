import React from 'react';
import { ArrowUpRight, Compass, Moon, Star, Orbit, Sun, Sparkles } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import '../../styles/pages/AstrologyDetailsPage.css';

export function AstrologyDetailsPage() {
  const { report, handleNext } = useOutletContext();
  if (!report) return null;

  const birthChartData = report?.astroBluePrint?.birthChart;
  const dashaTimeLine = report?.astroBluePrint?.dasha;

  return (
    <section id="blueprint-section" className="blueprint-page-section">

      {/* Header */}
      <div className="section-title-center">
        <h2>Your Astrological <span className="text-emerald">Blueprint</span></h2>
        <div className="blueprint-subtitle-row">
          <div className="diamond-icon">✦</div>
          <p>Key highlights from your birth chart</p>
          <div className="diamond-icon">✦</div>
        </div>
      </div>

      {/* Top Row: Lagna, Moon Sign, Nakshatra */}
      <div className="blueprint-grid-3">
        {/* Lagna Card */}
        <div className="bp-card card-lagna">
          <div className="card-top-border lagna-border"></div>
          <div className="icon-ring lagna-ring">
            <Compass className="bp-icon" />
          </div>
          <span className="bp-label">Lagna (Ascendant)</span>
          <strong className="bp-value lagna-value">{birthChartData.lagna}</strong>
          <span className="bp-subtext">({birthChartData.lagnaSanskrit})</span>
        </div>

        {/* Moon Sign Card */}
        <div className="bp-card card-moon">
          <div className="card-top-border moon-border"></div>
          <div className="icon-ring moon-ring">
            <Moon className="bp-icon" />
          </div>
          <span className="bp-label">Moon Sign (Rashi)</span>
          <strong className="bp-value moon-value">{birthChartData.moonSign}</strong>
          <span className="bp-subtext">({birthChartData.moonSignSanskrit})</span>
        </div>

        {/* Nakshatra Card */}
        <div className="bp-card card-star">
          <div className="card-top-border star-border"></div>
          <div className="icon-ring star-ring">
            <Star className="bp-icon" />
          </div>
          <span className="bp-label">Nakshatra</span>
          <strong className="bp-value star-value">{birthChartData.star}</strong>
          <span className="bp-subtext">Pada {birthChartData.starPada}</span>
        </div>
      </div>

      {/* Middle Row: Nakshatra Lord, Lagna Lord */}
      <div className="blueprint-grid-2">
        <div className="bp-card-horizontal card-lord-nakshatra">
          <div className="bg-network-overlay nakshatra-network"></div>
          <div className="icon-circle nakshatra-circle">
            <Orbit className="bp-icon" />
          </div>
          <div className="bp-text-col">
            <span className="bp-label">Nakshatra Lord</span>
            <strong className="bp-value nakshatra-value">{birthChartData.nakshatraLord}</strong>
          </div>
        </div>

        <div className="bp-card-horizontal card-lord-lagna">
          <div className="bg-network-overlay lagna-network"></div>
          <div className="icon-circle lagna-circle">
            <Orbit className="bp-icon" />
          </div>
          <div className="bp-text-col">
            <span className="bp-label">Lagna Lord</span>
            <strong className="bp-value lagna-value">{birthChartData.lagnaLord}</strong>
          </div>
        </div>
      </div>

      {/* Planetary Period Divider */}
      <div className="planetary-period-divider">
        <div className="dash-line"></div>
        <div className="diamond-icon">✦</div>
        <span>CURRENT PLANETARY PERIOD</span>
        <div className="diamond-icon">✦</div>
        <div className="dash-line"></div>
      </div>

      {/* Bottom Row: Mahadasha, Antardasha */}
      <div className="blueprint-grid-2">
        <div className="bp-card-horizontal card-dasha-maha">
          <div className="icon-wrapper">
            <div className="dotted-ring-bg maha-ring"></div>
            <div className="icon-circle maha-circle">
              <Sun className="bp-icon" />
            </div>
          </div>
          <div className="bp-text-col">
            <span className="bp-label">Mahadasha</span>
            <strong className="bp-value maha-value">{dashaTimeLine?.mahadasha}</strong>
            <div className="bp-subtext date-text">
              From: {dashaTimeLine?.mahadashaFrom} <br />
              To: {dashaTimeLine?.mahadashaTo}
            </div>
          </div>
        </div>

        <div className="bp-card-horizontal card-dasha-antar">
          <div className="icon-wrapper">
            <div className="dotted-ring-bg antar-ring"></div>
            <div className="icon-circle antar-circle">
              <Moon className="bp-icon" />
            </div>
          </div>
          <div className="bp-text-col">
            <span className="bp-label">Antardasha</span>
            <strong className="bp-value antar-value">{dashaTimeLine?.antardasha}</strong>
            <div className="bp-subtext date-text">
              From: {dashaTimeLine?.antardashaFrom} <br />
              To: {dashaTimeLine?.antardashaTo}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="blueprint-cta-banner">
        <div className="cta-graphics-left">
          <div className="orbit-rings">
            <div className="orbit-1"></div>
            <div className="orbit-2"></div>
            <div className="orbit-3"></div>
            <div className="center-star">
              <Sparkles className="sparkle-icon" />
            </div>
            <div className="floating-dot dot-1"></div>
            <div className="floating-dot dot-2"></div>
            <div className="floating-dot dot-3"></div>
          </div>
        </div>

        <div className="cta-content-right">
          <p className="cta-note">
            {report?.astroBluePrint?.dashaExplainerText || "Your chart has been analyzed across planetary strength, house ownership, Dasha timing and gemstone compatibility."}
          </p>
          <button className="cta-btn-emerald" onClick={handleNext}>
            <span>See Your Gemstone</span>
            <ArrowUpRight className="btn-arrow-icon" />
          </button>
        </div>
      </div>
    </section>
  );
}
