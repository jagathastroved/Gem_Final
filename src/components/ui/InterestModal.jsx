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
        <h3 className="interest-modal-title">Registered Successfully</h3>
        <div className="interest-modal-desc">
          <p className="interest-modal-thank-you">
            Thank you for showing your interest in the <strong>{gemName}</strong> gemstone.
          </p>
          <p className="interest-modal-info">
            Our Customer Support Team will review your request and get back to you shortly with the pricing details and further information.
          </p>
        </div>
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
