import React from 'react';
import { SectionHeader } from '../ui/SectionHeader.jsx';
import { Card } from '../ui/Card.jsx';
import { IconBadge } from '../ui/IconBadge.jsx';
import { Sparkles, ShieldAlert, Award } from 'lucide-react';
import '../../styles/pages/WearingGuidePage.css';

export function WearingGuidePage({ report, onGetReport }) {
  if (!report) return null;
  const guide = report.wearingGuide;

  return (
    <section className="wearing-guide-section">
      <SectionHeader 
        title="Your Premium Report" 
      />

      {/* Warning Alert Callout */}
      <div className="alert-callout-box">
        <ShieldAlert className="alert-icon" />
        <div className="alert-text">
          <strong>Wearing the wrong gem doesn't just waste money.</strong>
          <p>
            In Jyotish, an incompatible stone can amplify the very planet you're trying to balance. Your report shows which gems to avoid, and exactly why.
          </p>
        </div>
      </div>

      <div className="guide-hero-text">
        <h3>You Know Your Gem. Here's How to Actually Wear It Right.</h3>
        <p>
          Knowing the stone is the easy part. Weight, finger, day, mantra, what to combine it with, what to avoid. That's where most people go wrong, and that's what your full report covers.
        </p>
      </div>

      {/* Quick Preview Specs Card */}
      <Card className="wearing-specs-card">
        <div className="specs-header">
          <Sparkles className="specs-sparkle" />
          <span>PERSONALIZED WEARING PROTOCOL</span>
        </div>

        <div className="specs-grid">
          <div className="spec-item">
            <IconBadge icon="award" theme="gold" size="sm" />
            <div>
              <span className="spec-label">Ratti Weight</span>
              <strong className="spec-val">{guide?.rattiWeight}</strong>
            </div>
          </div>

          <div className="spec-item">
            <IconBadge icon="award" theme="emerald" size="sm" />
            <div>
              <span className="spec-label">Wearing Finger</span>
              <strong className="spec-val">{guide?.finger}</strong>
            </div>
          </div>

          <div className="spec-item">
            <IconBadge icon="calendar" theme="gold" size="sm" />
            <div>
              <span className="spec-label">Day & Timing</span>
              <strong className="spec-val">{guide?.dayAndTime}</strong>
            </div>
          </div>

          <div className="spec-item">
            <IconBadge icon="shukra" theme="gold" size="sm" />
            <div>
              <span className="spec-label">Activation Mantra</span>
              <strong className="spec-val">{guide?.mantra}</strong>
            </div>
          </div>

          <div className="spec-item">
            <IconBadge icon="shield" theme="emerald" size="sm" />
            <div>
              <span className="spec-label">Recommended Metal</span>
              <strong className="spec-val">{guide?.metal}</strong>
            </div>
          </div>

          <div className="spec-item">
            <IconBadge icon="avoid" theme="avoid" size="sm" />
            <div>
              <span className="spec-label">Combinations to Avoid</span>
              <strong className="spec-val">{guide?.combinationsToAvoid}</strong>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
