import React from 'react';
import { XCircle, CheckCircle, Droplets, Zap, Sparkles, Gem, Hourglass, ShieldCheck, Sun, Flame, Waves, Target } from 'lucide-react';
import '../../styles/ui/WhyAstroVed.css';

export function WhyAstroVed() {
  return (
    <div className="why-astroved-section">
      <div className="why-av-header">
        <h2 className="why-av-title">Why AstroVed?</h2>
        <p className="why-av-subtitle">
          Discover why buying a gemstone from AstroVed is vastly different from an ordinary online store or local jeweler.
        </p>
      </div>

      <div className="why-av-comparison">
        <div className="av-comp-card ordinary">
          <div className="av-comp-header-custom">
            <div className="title-icon-wrapper-left">
              <Target size={24} />
            </div>
            <h3 className="av-comp-title">Generic Gemstone</h3>
          </div>
          <ul className="av-comp-list">
            <li><Target size={18} className="list-icon-x" /> Just a mined stone</li>
            <li><Target size={18} className="list-icon-x" /> No astrological analysis</li>
            <li><Target size={18} className="list-icon-x" /> No purification or activation</li>
            <li><Target size={18} className="list-icon-x" /> No spiritual energization</li>
            <li><Target size={18} className="list-icon-x" /> Anyone can wear</li>
            <li><Target size={18} className="list-icon-x" /> Uncertain results</li>
          </ul>
        </div>

        <div className="vs-badge">VS</div>

        <div className="av-comp-card astroved">
          <div className="av-comp-header-custom right-aligned">
            <h3 className="av-comp-title">AstroVed Gemstone</h3>
            <div className="title-icon-wrapper-right">
              <CheckCircle size={24} />
            </div>
          </div>
          <ul className="av-comp-list">
            <li><CheckCircle size={18} className="list-icon-check" /> Personalized for you</li>
            <li><CheckCircle size={18} className="list-icon-check" /> Based on your birth chart</li>
            <li><CheckCircle size={18} className="list-icon-check" /> Purified & activated</li>
            <li><CheckCircle size={18} className="list-icon-check" /> Energized at a power spot</li>
            <li><CheckCircle size={18} className="list-icon-check" /> Perfect fit for you</li>
            <li><CheckCircle size={18} className="list-icon-check" /> Maximum astrological benefits</li>
          </ul>
        </div>
      </div>

      <div className="av-process-section">
        <h3 className="av-process-title">Our 3-Step Spiritual Preparation</h3>

        <div className="av-process-grid">
          <div className="av-process-step">
            <div className="step-number">1</div>
            <div className="step-icon-wrap">
              <Waves size={28} />
            </div>
            <div className="step-content">
              <h4 className="step-title">Purified</h4>
              <p className="step-desc">
                the gemstone is properly cleansed/purified.
              </p>
            </div>
          </div>

          <div className="av-process-step">
            <div className="step-number">2</div>
            <div className="step-icon-wrap">
              <Flame size={28} />
            </div>
            <div className="step-content">
              <h4 className="step-title">Activated</h4>
              <p className="step-desc">
                the gemstone undergoes the appropriate activation process.
              </p>
            </div>
          </div>

          <div className="av-process-step">
            <div className="step-number">3</div>
            <div className="step-icon-wrap">
              <Sun size={28} />
            </div>
            <div className="step-content">
              <h4 className="step-title">Energized and blessed at a power spot</h4>
              <p className="step-desc">
                the stone is spiritually prepared so it is ready for the intended purpose.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="av-advantage-section">
        <h3 className="av-process-title">The AstroVed Advantage</h3>
        <div className="advantage-list-grid">
          <div className="adv-list-item">
            <div className="adv-list-icon"><Gem size={28} /></div>
            <div className="adv-list-content">
              <h4>Right Gemstone</h4>
              <p>Selected based on your unique birth chart.</p>
            </div>
          </div>
          <div className="adv-list-item">
            <div className="adv-list-icon"><Hourglass size={28} /></div>
            <div className="adv-list-content">
              <h4>Right Timing</h4>
              <p>Calculated for maximum planetary benefit.</p>
            </div>
          </div>
          <div className="adv-list-item">
            <div className="adv-list-icon"><ShieldCheck size={28} /></div>
            <div className="adv-list-content">
              <h4>Carefully Handled</h4>
              <p>Treated with the utmost respect and care.</p>
            </div>
          </div>
          <div className="adv-list-item">
            <div className="adv-list-icon"><Waves size={28} /></div>
            <div className="adv-list-content">
              <h4>Purified</h4>
              <p>Cleansed of all prior negative energies.</p>
            </div>
          </div>
          <div className="adv-list-item">
            <div className="adv-list-icon"><Flame size={28} /></div>
            <div className="adv-list-content">
              <h4>Activated</h4>
              <p>Awakened to innate planetary resonance.</p>
            </div>
          </div>
          <div className="adv-list-item">
            <div className="adv-list-icon"><Sun size={28} /></div>
            <div className="adv-list-content">
              <h4>Energized & Blessed</h4>
              <p>Spiritually prepared at a power spot.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
