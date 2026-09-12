import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CheckCircle2,
  ShoppingCart,
  ShieldCheck,
  Truck,
  Award,
  Zap,
  Sparkles,
  Target,
  Clock,
  Heart
} from 'lucide-react';
import '../../styles/pages/SellingGemPage.css';
import { useOutletContext } from 'react-router-dom';
import { GemstoneMaterialize } from '../animations/GemstoneMaterialize.jsx';
import { InterestModal } from '../ui/InterestModal.jsx';
import { ConfirmModal } from '../ui/ConfirmModal.jsx';

const SellingGemPage = () => {
  const { report } = useOutletContext() || {};
  const [isInterested, setIsInterested] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const gem = report?.primaryGemstone?.gemstone;
  console.log('gem', gem)

  const gemName = gem?.suitableStone;
  // const gemName = "cat's EYe";

  const reasonText = gem?.whySuitableText || `This planet exerts a favorable influence in your chart, making ${gemName} an excellent choice for you. As the gemstone linked to this planet, ${gemName} enhances its powerful effects in your life. Wearing it can amplify the positive attributes associated with the areas governed by this radiant planet.`;

  const benefitsList = gem?.keyBenefits || [
    "Unlocks rapid career progression and wealth",
    "Improves focus and mental clarity",
    "Provides protection from negative energies"
  ];

  const isSpecialGem = ['Diamond', 'diamond'].includes(gemName);

  useEffect(() => {
    if (isSpecialGem) {
      const savedInterest = localStorage.getItem(`gem_interest_${gemName}`);
      if (savedInterest === 'true') {
        setIsInterested(true);
      }
    }
  }, [gemName, isSpecialGem]);

  if (!report) return null;


  const handleInterestChange = (e) => {
    // Do not allow unchecking once checked
    if (isInterested) return;

    if (e.target.checked) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmInterest = async (mobileNumber) => {
    setIsInterested(true);
    if (isSpecialGem) {
      localStorage.setItem(`gem_interest_${gemName}`, 'true');
    }
    setShowModal(true);

    try {
      const savedDetails = localStorage.getItem('gemstoneBirthDetails');
      const details = savedDetails ? JSON.parse(savedDetails) : {};

      const payload = {
        fullName: details.fullName || '',
        gender: details.gender || '',
        email: details.email || '',
        phoneNumber: mobileNumber || '',
        city: details.birthCity || '',
        country: details.country || 'India',
        gemstoneName: gemName || ''
      };

      // console.log("Sending data to backend:", payload);

      const interestApiUrl = import.meta.env.VITE_INTEREST_API;
      if (interestApiUrl) {
        try {
          await axios.post(interestApiUrl, payload);
          // console.log("Data successfully posted to", interestApiUrl);
        } catch (apiError) {
          console.error("Failed to post interest data", apiError);
        }
      }
    } catch (e) {
      console.error("Error retrieving user details", e);
    }
  };

  const GEMSTONE_PRODUCT_IDS = {
    "blue_sapphire": 88722,
    "yellow_sapphire": 88723,
    "red_coral": 88724,
    "cats_eye": 88725,
    "emerald": 88726,
    "ruby": 88727,
    "pearl": 88728,
    "hessonite": 88730,
  };

  const normalizedGemName = gemName ? gemName.toLowerCase().replace(/[']/g, '').replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') : '';
  const productId = GEMSTONE_PRODUCT_IDS[normalizedGemName];
  const astrovedLink = productId ? `https://www.astroved.com/-p${productId}.aspx` : '#';

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
            <div className="astrologer-insight-card">
              <div className="insight-content">
                <h4>Astrological Insight</h4>
                <p className="reason-desc">{reasonText}</p>
              </div>
            </div>
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
            {/* <div className="price-details-split">
              <div className="price-label-row">
                <span className="price-label">Special Price</span>
                <span className="offer-badge">{offerPercentage}</span>
              </div>

              <div className="price-value-row">
                <span className="original-price">{originalPrice}</span>
                <span className="price-value">{price}</span>
              </div>
            </div> */}

            {isSpecialGem && (
              <div className="interest-checkbox-container">
                <label className="interest-checkbox-label">
                  <input
                    type="checkbox"
                    checked={isInterested}
                    onChange={handleInterestChange}
                    className="interest-checkbox-input"
                  />
                  Are you interested to buy that product?
                </label>
              </div>
            )}

            {!isSpecialGem && (
              <a
                href={astrovedLink}
                target="_blank"
                className="buy-now-btn pulse-light-animation"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                onClick={(e) => {
                  if (!productId) {
                    e.preventDefault();
                    console.warn(`No product ID found for gemstone: ${gemName}`);
                  }
                }}
              >
                <ShoppingCart size={20} />
                <span>Buy Now</span>
              </a>
            )}

            {/* Trust Indicators */}
            <div className="trust-indicators">
              <div className="trust-item">
                <ShieldCheck size={14} />
                <span>Secure Payment</span>
              </div>
              <span className="trust-dot">•</span>
              <div className="trust-item">
                <Sparkles size={14} />
                <span>Premium Quality</span>
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

      <InterestModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        gemName={gemName}
      />
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmInterest}
        gemName={gemName}
      />
    </div>
  );
};

export default SellingGemPage;
