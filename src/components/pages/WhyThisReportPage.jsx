import React from 'react';
import { SectionHeader } from '../ui/SectionHeader.jsx';
import { Card } from '../ui/Card.jsx';
import { IconBadge } from '../ui/IconBadge.jsx';
import { Check } from 'lucide-react';
import '../../styles/pages/WhyThisReportPage.css';

export function WhyThisReportPage() {
  const features = [
    {
      id: 1,
      icon: 'globe',
      title: 'Complete 9-planet analysis',
      desc: 'See exactly which 3 gems are recommended and why.'
    },
    {
      id: 2,
      icon: 'award',
      title: 'Wearing instructions',
      desc: 'Weight (Ratti), metal, finger, day and mantra for each gem.'
    },
    {
      id: 3,
      icon: 'calendar',
      title: 'Dasha wearing timeline',
      desc: 'When to wear each gem and when to temporarily remove it.'
    },
    {
      id: 4,
      icon: 'layers',
      title: 'Gem compatibility chart',
      desc: 'Which gems conflict and which work together.'
    },
    {
      id: 5,
      icon: 'gem',
      title: 'Budget alternatives (Upratna)',
      desc: 'Substitute gems at a lower cost while preserving the intended planetary association.'
    },
    {
      id: 6,
      icon: 'shukra',
      title: 'Seva - free remedies',
      desc: 'What to do for each planet without buying any gem.'
    }
  ];

  return (
    <section className="why-report-section">
      <SectionHeader
        title="Why This Report Goes Beyond a Gemstone Name"
      />

      {/* 3-Column Feature Grid */}
      <div className="features-3col-grid">
        {features.map((feat) => (
          <Card key={feat.id} className="feature-card" hoverable>
            <div className="feature-icon-row">
              <IconBadge icon={feat.icon} theme="gold" size="md" />
            </div>

            <div className="feature-title-row">
              <Check className="check-green-icon" />
              <h4>{feat.title}</h4>
            </div>

            <p className="feature-desc">{feat.desc}</p>
          </Card>
        ))}
      </div>

      {/* Full Width Bottom PDF Card */}
      <Card className="pdf-feature-full-card" hoverable>
        <div className="pdf-card-content">
          <IconBadge icon="pdf" theme="emerald" size="lg" />
          <div className="pdf-text-col">
            <h4 className="pdf-title">Downloadable PDF report</h4>
            <p className="pdf-desc">Professional 16-page document for your jeweler.</p>
          </div>
        </div>
      </Card>
    </section>
  );
}
