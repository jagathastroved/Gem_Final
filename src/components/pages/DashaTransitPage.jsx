import React from 'react';
import { Card } from '../ui/Card.jsx';
import { FileText, Sparkles, Sun, Moon, Flame, Zap, BookOpen, Heart, Anchor, Wind, Compass } from 'lucide-react';
import { TravelingMarker } from '../animations/TravelingMarker.jsx';
import { useOutletContext } from 'react-router-dom';
import '../../styles/pages/AstrologyDetailsPage.css';
import '../../styles/pages/DashaTransitPage.css';

const getNodeTheme = (title) => {
  const t = title?.toLowerCase() || '';
  if (t.includes('jupiter')) return { icon: BookOpen, color: '#10B981', border: '#D1FAE5' };
  if (t.includes('rahu')) return { icon: Wind, color: '#D97706', border: '#FEF3C7' };
  if (t.includes('saturn')) return { icon: Anchor, color: '#3B82F6', border: '#DBEAFE' };
  if (t.includes('mercury')) return { icon: Zap, color: '#8B5CF6', border: '#EDE9FE' };
  if (t.includes('venus')) return { icon: Heart, color: '#EC4899', border: '#FCE7F3' };
  if (t.includes('mars')) return { icon: Flame, color: '#EF4444', border: '#FEE2E2' };
  if (t.includes('sun')) return { icon: Sun, color: '#F59E0B', border: '#FEF3C7' };
  if (t.includes('moon')) return { icon: Moon, color: '#64748B', border: '#F1F5F9' };
  if (t.includes('ketu')) return { icon: Compass, color: '#6B7280', border: '#F3F4F6' };
  return { icon: Sparkles, color: '#6358F7', border: '#EDE9FE' };
};

export function DashaTransitPage() {
  const { report } = useOutletContext();
  if (!report || !report.timeline) return null;

  const { keyInsights, events } = report?.timeline;

  return (
    <section id="timeline-section" className="dasha-timeline-section">
      <div className="section-title-center">
        <h2>Dasha & Timeline <span className="text-emerald">Insights</span></h2>
        <div className="blueprint-subtitle-row">
          <div className="diamond-icon">✦</div>
          <p>Understand the flow of time and planetary influences in your life.</p>
          <div className="diamond-icon">✦</div>
        </div>
      </div>

      <div className="timeline-two-col-grid">
        {/* Left Column: Key Insights */}
        <div className="timeline-col-wrapper">
          <div className="floating-pill-badge">
            <Sparkles size={14} /> KEY TIMELINE INSIGHTS <Sparkles size={14} />
          </div>
          <Card className="insights-outer-card">
            <div className="insights-stack">
              {keyInsights?.map((insight, idx) => {
                const numStr = (idx + 1).toString().padStart(2, '0');
                return (
                  <div key={insight.id} className="insight-card-modern">
                    <div className="insight-num-circle">{numStr}</div>
                    <div className="insight-body-content">
                      <p className="insight-text-modern">{insight.title}</p>
                      <div className="insight-source-modern">
                        <FileText size={14} />
                        <span>Source: <strong>{insight.source}</strong></span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Right Column: Planetary Timeline */}
        <div className="timeline-col-wrapper">
          <div className="floating-pill-badge">
            <Sparkles size={14} /> PLANETARY TIMELINE <Sparkles size={14} />
          </div>
          <Card className="timeline-gradient-card">
            <TravelingMarker />

            <div className="timeline-events-list">
              {events?.map((ev) => {
                const theme = getNodeTheme(ev.title);
                const IconComponent = theme.icon;
                return (
                  <div key={ev.id} className={`timeline-event-node ${ev.active ? 'active-node' : ''}`}>
                    <div className="dasha-node-circle" style={{ backgroundColor: '#FFFFFF', borderColor: theme.border, color: theme.color }}>
                      <IconComponent size={22} strokeWidth={2.5} />
                    </div>
                    <div className="event-info-col">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '8px' }}>
                        <h5 className="event-title-modern" style={{ margin: 0 }}>{ev.title}</h5>
                        {ev.active && (
                          <div className="active-status-tag">
                            <span className="pulse-dot"></span> Active Phase
                          </div>
                        )}
                      </div>
                      <div className="date-range-pill">
                        {ev.subtext.replace(' - ', ' \u2013 ')}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="dasha-system-banner">
              <Sparkles size={16} color="#8B5CF6" />
              <span>Timeline based on Vedic astrological<br />Dasha system.</span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
