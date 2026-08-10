import React from 'react';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';
import { Card } from '../components/ui/Card.jsx';
import { IconBadge } from '../components/ui/IconBadge.jsx';
import { TravelingMarker } from '../components/animations/TravelingMarker.jsx';
import '../styles/pages/DashaTransitPage.css';

export function DashaTransitPage({ report }) {
  if (!report || !report.timeline) return null;

  const { keyInsights, events } = report.timeline;

  return (
    <section id="timeline-section" className="dasha-timeline-section">
      <SectionHeader 
        number="7" 
        title="Dasha & Timeline Insights" 
      />

      <div className="timeline-two-col-grid">
        {/* Left Column: Key Insights */}
        <div className="timeline-left-col">
          <h4 className="col-header-title">Key Timeline Insights</h4>

          <div className="insights-stack">
            {keyInsights?.map((insight) => (
              <Card key={insight.id} className="insight-item-card" hoverable>
                <div className="insight-num-badge">{insight.id}</div>
                <div className="insight-body-text">
                  <p className="insight-title-p">{insight.title}</p>
                  <div className="insight-source-tag">
                    <span>Source</span>
                    <strong>{insight.source}</strong>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Planetary Timeline */}
        <div className="timeline-right-col">
          <h4 className="col-header-title">Planetary Timeline</h4>

          <Card className="planetary-timeline-card">
            <TravelingMarker />

            <div className="timeline-events-list">
              {events?.map((ev) => (
                <div 
                  key={ev.id} 
                  className={`timeline-event-node ${ev.active ? 'active-node' : ''}`}
                >
                  <IconBadge 
                    icon={ev.icon} 
                    theme={ev.active ? 'gold' : 'emerald'} 
                    size="md" 
                  />
                  <div className="event-info-col">
                    <h5 className="event-title">{ev.title}</h5>
                    <p className="event-subtext">{ev.subtext}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="dasha-system-note">
              Timeline based on Vimshottari Dasha system
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
