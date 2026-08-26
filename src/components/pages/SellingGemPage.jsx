import React from 'react';
import {
  CheckCircle2,
  ShoppingCart,
  ShieldCheck,
  Truck,
  Award,
  Leaf,
  Zap,
  Diamond,
  Sparkles,
  Target,
  Clock,
  Heart
} from 'lucide-react';
import '../../styles/pages/SellingGemPage.css';
import { useOutletContext } from 'react-router-dom';
import { GemstoneMaterialize } from '../animations/GemstoneMaterialize.jsx';

const SellingGemPage = ({
  originalPrice = "₹ 16,000",
  price = "₹ 8,000",
  offerPercentage = "50% OFF",
}) => {
  const { report } = useOutletContext() || {};
  if (!report) return null;

  const gem = report?.primaryGemstone?.gemstone;
  const comp = report?.comparison;

  const gemName = gem?.suitableStone;
  const reasonText = gem?.whyThisStone;
  const benefitsList = gem?.benefits || [
    "Unlocks rapid career progression and wealth",
    "Improves focus and mental clarity",
    "Provides protection from negative energies"
  ];

  return (
    <div className="selling-gem-container">
      <div className="selling-gem-content">

        {/* Top Section: Title & Image */}
        <div className="selling-gem-header">
          <p className="selling-gem-subtitle">YOUR RECOMMENDED GEMSTONE</p>
          <h1 className="selling-gem-title">{gemName}</h1>
          <div className="gem-image-container">
            <GemstoneMaterialize gemType={gem?.suitableStone} name={gem?.suitableStone} />
          </div>
        </div>

        {/* Middle Section: Reason & Benefits */}
        <div className="selling-gem-body">
          <div className="reason-section-new">
            <h2 className="section-heading"><Sparkles size={20} className="heading-icon" /> Why {gemName} is suitable for you?</h2>
            {Array.isArray(reasonText) && reasonText.length > 0 ? (
              reasonText.map((reason) => (
                <p key={reason.id} className="reason-text">
                  <strong>{reason.title}: </strong> {reason.text}
                </p>
              ))
            ) : (
              <p className="reason-text">{typeof reasonText === 'string' ? reasonText : "Based on your birth chart, this gemstone is highly favorable."}</p>
            )}
          </div>

          <div className="benefits-section-new">
            <h3 className="section-heading"><Award size={20} className="heading-icon" /> Key Benefits for You</h3>
            <ul className="benefits-list">
              {benefitsList.map((benefit, index) => (
                <li key={index}>
                  <CheckCircle2 className="benefit-icon" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Feature Badges */}
          <div className="feature-badges">
            <div className="feature-badge">
              <div className="badge-icon-wrapper"><Award size={18} /></div>
              <span>100% Natural & Certified</span>
            </div>
            <div className="feature-badge">
              <div className="badge-icon-wrapper"><Target size={18} /></div>
              <span>Right gemstone for you</span>
            </div>
            <div className="feature-badge">
              <div className="badge-icon-wrapper"><Clock size={18} /></div>
              <span>Right timing</span>
            </div>
            <div className="feature-badge">
              <div className="badge-icon-wrapper"><Zap size={18} /></div>
              <span>Purified, Activated & Energized</span>
            </div>
            <div className="feature-badge">
              <div className="badge-icon-wrapper"><Truck size={18} /></div>
              <span>Delivered with Care</span>
            </div>
            <div className="feature-badge">
              <div className="badge-icon-wrapper"><Heart size={18} /></div>
              <span>Trusted by Thousands</span>
            </div>
          </div>
        </div>

        {/* Bottom Section: Offer Card & Action */}
        <div className="selling-gem-footer">
          <div className="offer-card">
            <div className="price-details-split">
              <div className="price-label-row">
                <span className="price-label">Special Price</span>
                <span className="offer-badge">{offerPercentage}</span>
              </div>

              <div className="price-value-row">
                <span className="original-price">{originalPrice}</span>
                <span className="price-value">{price}</span>
              </div>
            </div>

            <button className="buy-now-btn pulse-light-animation">
              <ShoppingCart size={20} />
              <span>Buy Now</span>
            </button>

            {/* Trust Indicators */}
            <div className="trust-indicators">
              <div className="trust-item">
                <ShieldCheck size={14} />
                <span>Secure Payment</span>
              </div>
              <span className="trust-dot">•</span>
              <div className="trust-item">
                <Truck size={14} />
                <span>Free Shipping</span>
              </div>
              <span className="trust-dot">•</span>
              <div className="trust-item">
                <Award size={14} />
                <span>100% Authentic</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SellingGemPage;
