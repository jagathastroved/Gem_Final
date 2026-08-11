import React from 'react';
import { SectionHeader } from '../ui/SectionHeader.jsx';
import { PricingCard } from '../ui/PricingCard.jsx';
import { Card } from '../ui/Card.jsx';
import { Button } from '../ui/Button.jsx';
import { IconBadge } from '../ui/IconBadge.jsx';
import { ShieldCheck, Zap, FileText, ArrowRight, Gem } from 'lucide-react';
import '../../styles/pages/PremiumPage.css';

export function PremiumPage({ onGetReport }) {
  const reportFeatures = [
    {
      id: 1,
      icon: 'gem',
      title: 'Which gems to wear',
      desc: 'Based on your Lagna, Moon sign, and current Dasha lord.'
    },
    {
      id: 2,
      icon: 'avoid',
      title: 'Gems to avoid',
      desc: 'With full reasoning. Not just a list — you’ll know why each one is off-limits for you.'
    },
    {
      id: 3,
      icon: 'award',
      title: 'Ratti weight',
      desc: 'Calculated for your body weight so the gem is recommended at the appropriate strength.'
    },
    {
      id: 4,
      icon: 'layers',
      title: 'Upratna options',
      desc: 'Affordable substitutes that carry the same planetary association if primary stone is out of budget.'
    },
    {
      id: 5,
      icon: 'calendar',
      title: 'Dasha timeline',
      desc: 'When to start wearing each gem, and when to stop or switch.'
    },
    {
      id: 6,
      icon: 'globe',
      title: 'Full 9-planet read',
      desc: 'Strength, placement, and gem relevance for all nine planets in your chart.'
    },
    {
      id: 7,
      icon: 'layers',
      title: 'Compatibility matrix',
      desc: 'Which gems can be worn together and which create planetary conflict.'
    },
    {
      id: 8,
      icon: 'shukra',
      title: 'Energisation ritual',
      desc: 'Step-by-step instructions to activate the gem before you wear it.'
    }
  ];

  return (
    <section id="report-section" className="premium-report-section">
      {/* Section 9 Pricing Card */}
      <div className="pricing-section-wrap">
        <PricingCard onGetReport={onGetReport} />
      </div>

      {/* Section 10: What's In Your Gemstone Suggestion Report */}
      <div className="whats-in-report-wrap margin-top-2xl">
        <SectionHeader 
          number="10" 
          title="What's In Your Gemstone Suggestion Report" 
          subtitle="This isn't a general guide. Everything below is calculated from your birth chart."
        />

        <div className="whats-in-grid-layout">
          {/* Left Grid: 8 Feature Cards */}
          <div className="features-2col-grid">
            {reportFeatures.map((feat) => (
              <Card key={feat.id} className="grid-feature-card" hoverable>
                <div className="feature-head-row">
                  <IconBadge icon={feat.icon} theme="emerald" size="sm" />
                  <h4>{feat.title}</h4>
                </div>
                <p>{feat.desc}</p>
              </Card>
            ))}
          </div>

          {/* Right Product Image & Value Card */}
          <div className="product-value-card-col">
            <Card className="product-ringbox-card">
              <div className="ringbox-illustration">
                <div className="ringbox-3d">
                  <div className="ringbox-lid" />
                  <div className="ringbox-base">
                    <div className="ringbox-cushion">
                      <div className="emerald-ring-item">
                        <Gem className="emerald-ring-gem" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="value-copy-box">
                <p className="value-paragraph">
                  A genuine ruby or emerald can cost anywhere from <strong>₹3,000 to ₹50,000+</strong>.
                </p>
                <p className="value-paragraph">
                  If you pick the wrong one, or the right one in the wrong weight, that money is gone.
                </p>

                <div className="cost-callout-highlight">
                  <span>This report costs</span>
                  <strong className="final-price-tag">₹849.</strong>
                  <span className="math-subtext">The math isn't complicated.</span>
                </div>

                <Button 
                  variant="emerald" 
                  size="lg" 
                  fullWidth 
                  onClick={onGetReport}
                  icon={ArrowRight}
                  pulse
                >
                  Get Your Gemstone Report
                </Button>

                <div className="trust-micro-icons">
                  <div className="trust-micro-item">
                    <ShieldCheck className="trust-micro-icon" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="trust-micro-item">
                    <Zap className="trust-micro-icon" />
                    <span>Instant Access</span>
                  </div>
                  <div className="trust-micro-item">
                    <FileText className="trust-micro-icon" />
                    <span>PDF Download</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
