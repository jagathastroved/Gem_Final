import React from 'react';
import { Gem, ShieldCheck, Lock, Award, FileCheck } from 'lucide-react';
import './Footer.css';

export function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-brand-header">
              <Gem className="footer-gem" />
              <h3>Jyotish Gemstones</h3>
            </div>
            <p>
              Personalized Vedic Gemstone Analysis based on authentic Jyotish chart calculations, planetary lords, and current Dasha timing.
            </p>
          </div>

          <div className="footer-trust-grid">
            <div className="trust-item">
              <Lock className="trust-icon" />
              <div>
                <strong>100% Confidential</strong>
                <span>Birth details are strictly private</span>
              </div>
            </div>
            <div className="trust-item">
              <Award className="trust-icon" />
              <div>
                <strong>Anukula Method</strong>
                <span>Supportive planet approach</span>
              </div>
            </div>
            <div className="trust-item">
              <FileCheck className="trust-icon" />
              <div>
                <strong>Instant PDF Report</strong>
                <span>Downloadable 16-page guide</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Jyotish Gemstones Report. All rights reserved.</p>
          <p className="disclaimer">
            Disclaimer: Vedic gemstone suggestions are calculated according to traditional Jyotish principles. Always consult certified astrologers and jewelers.
          </p>
        </div>
      </div>
    </footer>
  );
}
