import { CheckCircle2, X } from 'lucide-react';
import '../../styles/ui/InterestModal.css';

export const InterestModal = ({ isOpen, onClose, gemName }) => {
  if (!isOpen) return null;

  return (
    <div className="interest-modal-overlay">
      <div className="interest-modal-content">
        <button
          onClick={onClose}
          className="interest-modal-close-btn"
        >
          <X size={20} color="#666" />
        </button>
        <div className="interest-modal-icon-container">
          <CheckCircle2 size={48} color="#22c55e" />
        </div>
        <h3 className="interest-modal-title">Interest Registered</h3>
        <p className="interest-modal-desc">
          Thanks for showing your interest in the <strong>{gemName}</strong> gemstone.<br />
          We'll get back to you with pricing details shortly.
        </p>
        <button
          onClick={onClose}
          className="interest-modal-btn-okay"
        >
          Okay
        </button>
      </div>
    </div>
  );
};
