import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';
import { ShieldCheck, Lock, CheckCircle2, ArrowLeft, Download, Sparkles, Gem, CreditCard, Smartphone } from 'lucide-react';
import '../styles/pages/PaymentPage.css';

export function PaymentPage({ report }) {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('user@upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayNow = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2200);
  };

  return (
    <div className="payment-page-container">
      <button className="back-btn" onClick={() => navigate('/premium')}>
        <ArrowLeft className="back-icon" />
        <span>Back to Report Overview</span>
      </button>

      <div className="payment-grid-layout">
        {/* Left Column: Order Summary */}
        <div className="order-summary-col">
          <Card className="summary-card">
            <h3 className="summary-title">Order Summary</h3>

            <div className="item-row">
              <div className="item-details">
                <div className="item-icon-box">
                  <Gem className="item-gem-icon" />
                </div>
                <div>
                  <strong>Personalized Gemstone Suggestion Report</strong>
                  <p>Comprehensive 16-page Jyotish Analysis PDF</p>
                </div>
              </div>
              <span className="item-price">₹849</span>
            </div>

            <div className="summary-divider" />

            <div className="birth-summary-mini">
              <h4>Calculated Chart Specs</h4>
              <p><strong>Name:</strong> {report?.user?.name || 'Aravind Sharma'}</p>
              <p><strong>Ascendant:</strong> {report?.lagna} ({report?.lagnaSanskrit})</p>
              <p><strong>Moon Sign:</strong> {report?.moonSign}</p>
              <p><strong>Primary Gemstone:</strong> {report?.gemstone?.suitableStone} (Panna)</p>
            </div>

            <div className="summary-divider" />

            <div className="price-breakdown">
              <div className="price-row">
                <span>Original Price</span>
                <span className="strikethrough">₹1,499</span>
              </div>
              <div className="price-row green-text">
                <span>Launch Price Discount</span>
                <span>-₹650</span>
              </div>
              <div className="price-row total-row">
                <strong>Total Amount Payable</strong>
                <strong className="total-amount">₹849</strong>
              </div>
            </div>

            <div className="security-guarantee-note">
              <Lock className="lock-icon" />
              <span>256-Bit SSL Encrypted & 100% Secure Checkout</span>
            </div>
          </Card>
        </div>

        {/* Right Column: Payment Form */}
        <div className="payment-form-col">
          <Card className="payment-method-card">
            <h3 className="form-card-title">Select Payment Method</h3>

            <form onSubmit={handlePayNow} className="checkout-form">
              {/* Payment Tabs */}
              <div className="payment-tabs-row">
                <button
                  type="button"
                  className={`payment-tab ${paymentMethod === 'upi' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <Smartphone className="tab-icon" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  className={`payment-tab ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <CreditCard className="tab-icon" />
                  <span>Card</span>
                </button>
              </div>

              {paymentMethod === 'upi' ? (
                <div className="upi-input-group">
                  <label htmlFor="upiId">Enter VPA / UPI ID</label>
                  <input
                    type="text"
                    id="upiId"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. mobile@upi, gpay@okaxis"
                    required
                  />
                  <span className="helper-text">Supports Google Pay, PhonePe, Paytm, BHIM & all major UPI apps.</span>
                </div>
              ) : (
                <div className="card-input-group">
                  <div className="form-group">
                    <label>Card Number</label>
                    <input type="text" placeholder="4532 •••• •••• 8892" required />
                  </div>
                  <div className="form-row-two">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input type="text" placeholder="MM / YY" required />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input type="password" placeholder="•••" maxLength={4} required />
                    </div>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                variant="emerald"
                size="lg"
                fullWidth
                disabled={isProcessing}
                pulse={!isProcessing}
              >
                {isProcessing ? 'Processing Payment...' : 'Pay ₹849 & Unlock Report'}
              </Button>
            </form>
          </Card>
        </div>
      </div>

      {/* Success Modal */}
      {isSuccess && (
        <div className="success-modal-overlay">
          <Card className="success-modal-card">
            <div className="success-header">
              <CheckCircle2 className="success-icon" />
              <h3>Payment Successful!</h3>
              <p>Order ID: #JYOTISH-{Math.floor(100000 + Math.random() * 900000)}</p>
            </div>

            <div className="report-unlocked-box">
              <Sparkles className="unlocked-sparkle" />
              <h4>Your Premium Gemstone Report is Ready</h4>
              <p>
                Calculated for {report?.user?.name || 'Aravind Sharma'} • {report?.gemstone?.suitableStone} (Panna) Protocol
              </p>

              <div className="download-cta-row">
                <Button 
                  variant="emerald" 
                  size="md"
                  icon={Download}
                  onClick={() => alert("Downloading your 16-Page High-Res Gemstone Suggestion Report PDF...")}
                >
                  Download PDF Report (16 Pages)
                </Button>
              </div>
            </div>

            <button className="close-modal-link" onClick={() => setIsSuccess(false)}>
              Close & View Full Interactive Screen
            </button>
          </Card>
        </div>
      )}
    </div>
  );
}
