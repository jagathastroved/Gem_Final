import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Card } from '../ui/Card.jsx';
import { XCircle } from 'lucide-react';
import { GemstoneMaterialize } from '../animations/GemstoneMaterialize.jsx';
import '../../styles/pages/GemstoneAvoidPage.css';

const getGemTheme = (name) => {
  const normalized = name?.toLowerCase() || '';
  if (normalized.includes('ruby')) return { color: '#E11D48', bg: '#FFE4E6' };
  if (normalized.includes('emerald')) return { color: '#10B981', bg: '#D1FAE5' };
  if (normalized.includes('pearl')) return { color: '#F59E0B', bg: '#FEF3C7' };
  if (normalized.includes('coral')) return { color: '#EF4444', bg: '#FEE2E2' };
  if (normalized.includes('yellow sapphire')) return { color: '#EAB308', bg: '#FEF9C3' };
  if (normalized.includes('diamond')) return { color: '#94A3B8', bg: '#F1F5F9' };
  if (normalized.includes('blue sapphire')) return { color: '#3B82F6', bg: '#DBEAFE' };
  if (normalized.includes('hessonite')) return { color: '#D97706', bg: '#FEF3C7' };
  if (normalized.includes('cat')) return { color: '#78716C', bg: '#F5F5F4' };
  return { color: '#8B5CF6', bg: '#EDE9FE' }; // default purple
};


export function GemstoneAvoidPage() {
  const { report } = useOutletContext();
  if (!report) return null;
  return (
    <section className="avoid-gems-section">
      <div className="avoid-page-header">
        <div className="avoid-title-row">
          <span className="avoid-title-accent">✦</span>
          <h2>Gemstones You Should Avoid</h2>
          <span className="avoid-title-accent">✦</span>
        </div>
        <p className="avoid-subtitle">These gemstones may create planetary imbalances in your chart<br />and are best avoided.</p>
      </div>

      <div className="avoid-cards-stack">
        {report?.avoidGemstones?.map((gem) => {
          const theme = getGemTheme(gem.name);
          return (
            <Card key={gem.id} className="avoid-gem-card" style={{ background: `linear-gradient(135deg, ${theme.bg}80 0%, #FFFFFF 100%)`, borderLeft: `6px solid ${theme.color}` }}>
              <div className="avoid-card-left">
                <div className="avoid-gem-thumb" style={{ backgroundColor: theme.bg }}>
                  <div className="avoid-gem-inner">
                    <GemstoneMaterialize gemType={gem.id} name={gem.name} disableFloat={true} />
                  </div>
                </div>

                <div className="avoid-card-info">
                  <h4 className="avoid-gem-name">{gem.name}</h4>
                  <div className="planet-badge" style={{ color: theme.color, backgroundColor: theme.bg }}>
                    {gem.planet}
                  </div>
                  <p className="avoid-gem-reason">{gem.reason}</p>
                </div>
              </div>

              <div className="avoid-badge-col">
                <div className="btn-avoid-outline">
                  <XCircle size={14} />
                  <span>AVOID</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
