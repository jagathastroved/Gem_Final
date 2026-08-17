import React from 'react';
import { Card } from '../ui/Card.jsx';
import { IconBadge } from '../ui/IconBadge.jsx';
import { Button } from '../ui/Button.jsx';
import { ConstellationReveal } from '../animations/ConstellationReveal.jsx';
import { ArrowUpRight } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import '../../styles/pages/AstrologyDetailsPage.css';

export function AstrologyDetailsPage() {
  const { report, handleNext: onNextSection } = useOutletContext();
  if (!report) return null;

  const birthChartData = report?.astroBluePrint?.birthChart;
  const dashaTimeLine = report?.astroBluePrint?.dasha;

  return (
    <section id="blueprint-section" className="blueprint-page-section">
      <ConstellationReveal />

      <div className="section-title-center">
        <h2>Your Astrological Blueprint</h2>
        <p>Key highlights from your birth chart</p>
      </div>

      {/* Top Row: Lagna, Moon Sign, Nakshatra */}
      <div className="grid-3-cards">
        <Card className="blueprint-card" hoverable>
          <IconBadge icon="lagna" theme="emerald" size="md" />
          <span className="card-label">Lagna (Ascendant)</span>
          <strong className="card-primary-val">{birthChartData.lagna}</strong>
          <span className="card-sanskrit">({birthChartData.lagnaSanskrit})</span>
        </Card>

        <Card className="blueprint-card" hoverable>
          <IconBadge icon="moon" theme="gold" size="md" />
          <span className="card-label">Moon Sign (Rashi)</span>
          <strong className="card-primary-val">{birthChartData.moonSign}</strong>
          <span className="card-sanskrit">({birthChartData.moonSignSanskrit})</span>
        </Card>

        <Card className="blueprint-card" hoverable>
          <IconBadge icon="star" theme="gold" size="md" />
          <span className="card-label">Nakshatra</span>
          <strong className="card-primary-val">{birthChartData.star}</strong>
          <span className="card-sanskrit">Pada {birthChartData.starPada}</span>
        </Card>
      </div>

      {/* Middle Row: Nakshatra Lord, Lagna Lord */}
      <div className="grid-2-cards margin-top-md">
        <Card className="blueprint-card flex-row-card" hoverable>
          <IconBadge icon="venus" theme="emerald" size="md" />
          <div className="card-text-col">
            <span className="card-label">Nakshatra Lord</span>
            <strong className="card-primary-val">{birthChartData.nakshatraLord}</strong>
          </div>
        </Card>

        <Card className="blueprint-card flex-row-card" hoverable>
          <IconBadge icon="venus" theme="avoid" size="md" />
          <div className="card-text-col">
            <span className="card-label">Lagna Lord</span>
            <strong className="card-primary-val">{birthChartData.lagnaLord}</strong>
          </div>
        </Card>
      </div>

      {/* Banner Header: CURRENT PLANETARY PERIOD */}
      <div className="planetary-period-header">
        <span>CURRENT PLANETARY PERIOD</span>
      </div>

      {/* Bottom Row: Mahadasha, Antardasha */}
      <div className="grid-2-cards">
        <Card className="blueprint-card flex-row-card" hoverable>
          <IconBadge icon="jupiter" theme="gold" size="md" />
          <div className="card-text-col">
            <span className="card-label">Mahadasha</span>
            <strong className="card-primary-val">{dashaTimeLine?.mahadasha}</strong>
            <span className="card-sanskrit">{dashaTimeLine?.mahadashaYears}</span>
          </div>
        </Card>

        <Card className="blueprint-card flex-row-card" hoverable>
          <IconBadge icon="rahu" theme="gold" size="md" />
          <div className="card-text-col">
            <span className="card-label">Antardasha</span>
            <strong className="card-primary-val">{dashaTimeLine?.antardasha}</strong>
            <span className="card-sanskrit">{dashaTimeLine?.antardashaYears}</span>
          </div>
        </Card>
      </div>

      <p className="blueprint-footer-note">
        Your chart has been analyzed across planetary strength, house ownership, Dasha timing and gemstone compatibility.
      </p>

      <div className="blueprint-cta-wrap">
        <Button
          variant="emerald"
          size="md"
          onClick={onNextSection}
          icon={ArrowUpRight}
        >
          See My Gemstone
        </Button>
      </div>
    </section>
  );
}
