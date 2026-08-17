import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { SectionHeader } from '../ui/SectionHeader.jsx';
import { Card } from '../ui/Card.jsx';
import { StatusBadge } from '../ui/Badge.jsx';
import { GemstoneMaterialize } from '../animations/GemstoneMaterialize.jsx';
import '../../styles/pages/GemstoneAvoidPage.css';

export function GemstoneAvoidPage() {
  const { report } = useOutletContext();
  if (!report) return null;
  return (
    <section className="avoid-gems-section">
      <SectionHeader
        title="Gemstones You Should Avoid"
      />

      <div className="avoid-cards-stack">
        {report?.avoidGemstones?.map((gem) => (
          <Card key={gem.id} className="avoid-gem-card" hoverable>
            <div className="avoid-card-left">
              <div className="avoid-gem-thumb">
                <GemstoneMaterialize gemType={gem.id} name={gem.name} disableFloat={true} />
              </div>

              <div className="avoid-card-info">
                <h4 className="avoid-gem-name">{gem.name}</h4>
                <p className="avoid-gem-reason">{gem.planet} • {gem.reason}</p>
              </div>
            </div>

            <div className="avoid-badge-col">
              <StatusBadge type="avoid">AVOID</StatusBadge>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
