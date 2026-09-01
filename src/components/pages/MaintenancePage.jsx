import { useNavigate } from 'react-router-dom';
import { Gem, RefreshCw } from 'lucide-react';
import '../../styles/pages/MaintenancePage.css';

export function MaintenancePage() {
  const navigate = useNavigate();

  return (
    <div className="maintenance-page-container">
      <div className="maintenance-premium-card">

        {/* Top Floating Gem */}
        <div className="maintenance-gem-showcase">
          <div className="gem-glow-backdrop"></div>
          <div className="gem-orbit orbit-outer"></div>
          <div className="gem-orbit orbit-inner"></div>
          <Gem className="premium-gem-icon" />
          <div className="sparkle-particle p1"></div>
          <div className="sparkle-particle p2"></div>
          <div className="sparkle-particle p3"></div>
        </div>

        <h1 className="maintenance-title-new">System Maintenance</h1>

        <div className="maintenance-divider">
          <span className="divider-line"></span>
          <Gem size={12} className="divider-icon" />
          <span className="divider-line"></span>
        </div>

        <p className="maintenance-desc-new">
          <strong>Sorry for the inconvenience!</strong><br />
          We are currently updating our system to bring you a better experience.
          Please wait a few moments and try again.
        </p>

        <button
          className="maintenance-action-btn"
          onClick={() => navigate('/')}
        >
          <RefreshCw size={18} className="btn-spin-icon" />
          <span>Try Again</span>
        </button>
      </div>
    </div>
  );
}
