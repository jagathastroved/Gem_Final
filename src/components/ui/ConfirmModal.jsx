import { HelpCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import '../../styles/ui/ConfirmModal.css';

export const ConfirmModal = ({ isOpen, onClose, onConfirm, gemName }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setMobileNumber('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validateMobile = (num) => {
    return /^[6-9]\d{9}$/.test(num);
  };

  const handleConfirm = () => {
    if (!validateMobile(mobileNumber)) {
      setError('Invalid mobile number');
      return;
    }
    setError('');
    onConfirm(mobileNumber);
    onClose();
  };

  const handleMobileChange = (e) => {
    const val = e.target.value;
    // Allow only numbers, max length 10
    if (val === '' || /^\d+$/.test(val)) {
      if (val.length <= 10) {
        setMobileNumber(val);
        if (val.length === 10) {
          if (!validateMobile(val)) {
            setError('Invalid mobile number');
          } else {
            setError('');
          }
        } else {
          setError('');
        }
      }
    }
  };

  const handleBlur = () => {
    if (mobileNumber.length > 0 && !validateMobile(mobileNumber)) {
      setError('Invalid mobile number');
    }
  };

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal-content">
        <button
          onClick={onClose}
          className="confirm-modal-close-btn"
        >
          <X size={20} color="#666" />
        </button>
        <div className="confirm-modal-icon-container">
          <HelpCircle size={48} color="#10b981" />
        </div>
        <h3 className="confirm-modal-title">Confirm Interest</h3>
        <p className="confirm-modal-desc">
          Are you sure you want to register your interest in the <strong>{gemName}</strong>?
        </p>

        <div className="confirm-modal-form-group">
          <label className="confirm-modal-label">
            Mobile Number *
          </label>
          <input
            type="text"
            value={mobileNumber}
            onChange={handleMobileChange}
            onBlur={handleBlur}
            placeholder="Enter 10 digit number"
            className={`confirm-modal-input ${error ? 'error' : 'valid'}`}
          />
          {error && <div className="confirm-modal-error-msg">{error}</div>}
        </div>

        <div className="confirm-modal-actions">
          <button
            onClick={onClose}
            className="confirm-modal-btn confirm-modal-btn-cancel"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="confirm-modal-btn confirm-modal-btn-confirm"
          >
            Yes, I'm sure
          </button>
        </div>
      </div>
    </div>
  );
};
