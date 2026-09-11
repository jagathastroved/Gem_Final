import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ShoppingCart, Info, Quote, FileText, CheckCircle2,
  Sparkles, Leaf, Zap, Diamond, Award, ShieldCheck,
  Compass, Shield
} from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { GemstoneMaterialize } from '../animations/GemstoneMaterialize.jsx';
import { InterestModal } from '../ui/InterestModal.jsx';
import { ConfirmModal } from '../ui/ConfirmModal.jsx';
import '../../styles/pages/AstrologyDetailsPage.css';
import '../../styles/pages/GemstonePage.css';

export function GemstonePage() {
  const { report } = useOutletContext();
  const [isInterested, setIsInterested] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const gem = report?.primaryGemstone?.gemstone;
  const comp = report?.comparison;
  const gemName = gem?.suitableStone;
  // const gemName = 'Diamond';

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
        gemstoneName: gemName || '',
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
    "pearl": 88728
  };

  const normalizedGemName = gemName ? gemName.toLowerCase().replace(/[']/g, '').replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') : '';
  const productId = GEMSTONE_PRODUCT_IDS[normalizedGemName];
  const astrovedLink = productId ? `https://www.astroved.com/-p${productId}.aspx` : '#';

  return (
    <>
      <section id="primary-gem-section" className="primary-gem-section">

        {/* Header */}
        <div className="section-title-center">
          <h2>Your Primary <span className="text-emerald">Gemstone</span></h2>
          <div className="blueprint-subtitle-row">
            <div className="diamond-icon">✦</div>
            <p>Based on your ascendant and planetary placements</p>
            <div className="diamond-icon">✦</div>
          </div>
        </div>

        {/* Grid: 2 Columns for Hero */}
        <div className="gem-hero-grid">

          {/* Left Column: Gemstone Showcase */}
          <div className="gem-showcase-card">
            <div className="gem-showcase-kicker">
              <span>✦</span> YOUR PRIMARY GEMSTONE <span>✦</span>
            </div>

            {/* <div className="gem-image-container">
              <GemstoneMaterialize gemType={gem?.suitableStone} name={gem?.suitableStone} />
            </div> */}
            <div className="gem-image-container">
              <GemstoneMaterialize gemType={gem?.suitableStone} name={gem?.suitableStone} />
            </div>

            <h3 className="gem-title">{gem?.suitableStone}</h3>
            <p className="gem-subtext">{gem?.sanskritName} • {gem?.associatedPlanet}</p>

            <div className="recommended-badge">
              <CheckCircle2 className="rec-icon" />
              <span>RECOMMENDED FOR YOU</span>
            </div>

            <p className="gem-description">
              {gem?.description}
            </p>

            <div className="hero-features-grid-new">
              <div className="hf-item-new">
                <div className="hf-icon-new"><Leaf size={14} /></div>
                <span>100% Natural</span>
              </div>
              <div className="hf-item-new">
                <div className="hf-icon-new"><Zap size={14} /></div>
                <span>Energized</span>
              </div>
              <div className="hf-item-new">
                <div className="hf-icon-new"><Diamond size={14} /></div>
                <span>Excellent Cut</span>
              </div>
              <div className="hf-item-new">
                <div className="hf-icon-new"><Award size={14} /></div>
                <span>Lab Certified</span>
              </div>
            </div>

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
                className="gem-buy-btn"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                onClick={(e) => {
                  if (!productId) {
                    e.preventDefault();
                    console.warn(`No product ID found for gemstone: ${gemName}`);
                  }
                }}
              >
                <ShoppingCart className="btn-icon" />
                <span>Buy Now</span>
              </a>
            )}

            <div className="hero-guarantees-compact">
              <div className="hg-item">
                <ShieldCheck size={14} /> <span>Secure Payment</span>
              </div>
              <span className="hg-dot">•</span>
              <div className="hg-item">
                <Sparkles size={14} /> <span>Premium Quality</span>
              </div>
              <span className="hg-dot">•</span>
              <div className="hg-item">
                <Award size={14} /> <span>100% Authentic</span>
              </div>
            </div>
          </div>

          {/* Right Column: Why This Stone? */}
          <div className="why-stone-container">
            <div className="why-stone-header">
              <div className="dash-line-small"></div>
              <span>WHY THIS STONE?</span>
              <div className="dash-line-small"></div>
            </div>

            <div className="why-timeline">
              {gem?.whyThisStone?.map((item, index) => {
                const Icon = index === 0 ? Compass : index === 1 ? Shield : Zap;
                return (
                  <div key={item.id} className="timeline-item">
                    <div className="timeline-icon-wrap">
                      <div className="timeline-circle">
                        <Icon className="timeline-zodiac-icon" size={24} />
                      </div>
                      <div className="timeline-number">{String(index + 1).padStart(2, '0')}</div>
                    </div>
                    <div className="timeline-content">
                      <h4>{item.title}</h4>
                      <p>{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Info Banner */}
        <div className="gem-info-banner">
          <Info className="info-icon" />
          <p>This recommendation is based on in-depth celestial and astrological methods used in this report.</p>
        </div>

        {/* Why Your Recommendation Is Different */}
        <div className="comparison-section">
          <div className="section-title-center">
            <div className="blueprint-subtitle-row">
              <div className="diamond-icon">✦</div>
              <h2>Why Your Recommendation Is Different</h2>
              <div className="diamond-icon">✦</div>
            </div>
          </div>

          <div className="comparison-grid">
            {/* Left Card: Generic */}
            <div className="comp-card generic-card">
              <div className="comp-header-red">WHAT A GENERIC READER BASED TOOL WOULD SAY</div>
              <div className="quote-circle">
                <Quote className="quote-icon" />
              </div>
              <h3 className="generic-quote">{comp?.genericSaying}</h3>
              <p className="generic-basis">{comp?.genericSubtext}</p>
            </div>

            {/* Right Card: Actual Chart */}
            <div className="comp-card actual-card">
              <div className="comp-header-green">
                <FileText className="file-icon" />
                <span>WHAT YOUR ACTUAL CHART SAYS</span>
              </div>
              <h3 className="actual-title">{comp?.actualChartSaying}</h3>
              <p className="actual-desc">{comp?.actualChartText}</p>

              <div className="recommendation-highlight-box">
                <div className="rec-box-left">
                  <div className="small-gem-wrap">
                    <GemstoneMaterialize gemType={gem?.suitableStone} name={gem?.suitableStone} disableFloat={true} />
                  </div>
                </div>
                <div className="rec-box-right">
                  <strong>{comp?.recommendationLabel}</strong>
                  <span>{comp?.recommendationMethod}</span>
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
      </section>
    </>
  );
}
