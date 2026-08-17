import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { OrbitalRings } from '../animations/OrbitalRings.jsx';
import '../../styles/pages/AnalysisLoadingPage.css';

const STAGES = [
  { id: 1, label: 'Birth details verified' },
  { id: 2, label: 'Ascendant calculated' },
  { id: 3, label: 'Moon sign analyzed' },
  { id: 4, label: 'Nakshatra identified' },
  { id: 5, label: 'Evaluating planetary strengths' },
  { id: 6, label: 'Matching gemstones' },
  { id: 7, label: 'Checking gemstone conflicts' },
  { id: 8, label: 'Calculating Dasha influence' },
  { id: 9, label: 'Preparing your recommendation' }
];

export function AnalysisLoadingPage({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (progress >= 99) return;

    // Slow down loading after 80%
    const delay = progress >= 80 ? 250 : 30;

    const timer = setTimeout(() => {
      setProgress((prev) => {
        const next = prev + 1;
        const stage = Math.min(Math.floor((next / 100) * STAGES.length), STAGES.length - 1);
        setActiveStageIndex(stage);
        return next;
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [progress]);

  // Navigation is now handled by App.jsx when the API call completes

  return (
    <div className="analysis-loading-page">

      <div className="analysis-content-grid">
        {/* Left Orbital Centerpiece */}
        <div className="analysis-left-column">
          <div className="analysis-header-text">
            <h1>Analyzing Your Birth Chart</h1>
            <p className="analysis-subtitle">Calculating your planetary blueprint...</p>
          </div>

          <div className="orbital-centerpiece">
            <OrbitalRings progress={progress} />
            <div className="progress-counter-text">
              <span className="percent-num">{progress}%</span>
            </div>
          </div>

          <p className="analysis-footer-status">
            {STAGES[activeStageIndex]?.label}...
          </p>
        </div>

        {/* Right Checklist Panel */}
        <div className="analysis-right-panel">
          <div className="stage-checklist-card">
            {STAGES.map((stage, idx) => {
              const isDone = idx < activeStageIndex || progress === 100;
              const isActive = idx === activeStageIndex && progress < 100;

              return (
                <div
                  key={stage.id}
                  className={`checklist-item ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}
                >
                  <div className="stage-icon-wrap">
                    {isDone ? (
                      <CheckCircle2 className="stage-check-icon" />
                    ) : isActive ? (
                      <div className="stage-pulsing-dot" />
                    ) : (
                      <Circle className="stage-pending-icon" />
                    )}
                  </div>
                  <span className="stage-label">{stage.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
