import React from 'react';
import { Button } from './Button.jsx';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import '../../styles/ui/PricingCard.css';

export function PricingCard({ onGetReport }) {
  return (
    <div className="pricing-card-wrapper">
      <div className="pricing-main-card">
        <div className="pricing-badge">
          <Sparkles className="pricing-sparkle" />
          <span>PREMIUM</span>
        </div>

        <div className="pricing-row">
          <span className="price-old">₹1,499</span>
          <span className="price-current">₹849</span>
        </div>

        <div className="pricing-savings-pill">
          <span>Save ₹650 • Launch Price</span>
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

        <p className="pricing-guarantee-note">
          You already got your reading. This report is the next step, and it's the part most people skip.
        </p>
      </div>

      <div className="pricing-warning-box">
        <h4>Don't buy a gem before you read this.</h4>
        <p>
          A good stone worn the wrong way, on the wrong finger, at the wrong time, doesn't help.
        </p>
      </div>
    </div>
  );
}
