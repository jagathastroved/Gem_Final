import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card.jsx';
import '../../styles/pages/FormPage.css';

export function FormPage({ onSubmitDetails }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: 'Jagath',
    gender: 'Male',
    email: 'jagath@gmail.com',
    dobDay: '15',
    dobMonth: '08',
    dobYear: '1995',
    tobHour: '10',
    tobMinute: '30',
    tobAmPm: 'AM',
    country: 'India',
    city: 'Chennai'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const birthDetails = {
      name: formData.name || 'Seeker',
      gender: formData.gender,
      email: formData.email,
      dob: `${formData.dobDay}/${formData.dobMonth}/${formData.dobYear}`,
      tob: `${formData.tobHour}:${formData.tobMinute} ${formData.tobAmPm}`,
      country: formData.country,
      city: formData.city || 'Chennai'
    };

    onSubmitDetails(birthDetails);
    navigate('/loading');
  };

  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
  const months = [
    { num: '01', name: 'Jan' },
    { num: '02', name: 'Feb' },
    { num: '03', name: 'Mar' },
    { num: '04', name: 'Apr' },
    { num: '05', name: 'May' },
    { num: '06', name: 'Jun' },
    { num: '07', name: 'Jul' },
    { num: '08', name: 'Aug' },
    { num: '09', name: 'Sep' },
    { num: '10', name: 'Oct' },
    { num: '11', name: 'Nov' },
    { num: '12', name: 'Dec' }
  ];
  const years = Array.from({ length: 80 }, (_, i) => String(2010 - i));
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  return (
    <div className="form-page-container">

      <div className="form-content-wrapper">
        {/* Left Column - Headline & Repository Checklist */}
        <div className="form-hero-left">
          <h1 className="hero-repo-headline">
            Unlock Your Gemstones
          </h1>
          <p className="hero-repo-subtitle">
            Discover the hidden power of gemstones aligned with your unique birth chart. Unlock the perfect stones to amplify your strengths, balance your energies, and attract success.
          </p>

          <div className="hero-repo-checklist">
            <div className="repo-check-item">
              <div className="check-circle-icon-wrap">
                <CheckCircle2 className="repo-check-icon" />
              </div>
              <div>
                <strong>Core & Birth Analysis</strong>
                <p>Discover the deep planetary placements behind your birth chart.</p>
              </div>
            </div>

            <div className="repo-check-item">
              <div className="check-circle-icon-wrap">
                <CheckCircle2 className="repo-check-icon" />
              </div>
              <div>
                <strong>Lagna & Planetary Lord</strong>
                <p>Understand how your ascendant shapes your true destiny and strength.</p>
              </div>
            </div>

            <div className="repo-check-item">
              <div className="check-circle-icon-wrap">
                <CheckCircle2 className="repo-check-icon" />
              </div>
              <div>
                <strong>Primary & Supporting Gems</strong>
                <p>Unlock the specific gemstones that bring you harmony and success.</p>
              </div>
            </div>

            <div className="repo-check-item">
              <div className="check-circle-icon-wrap">
                <CheckCircle2 className="repo-check-icon" />
              </div>
              <div>
                <strong>Dasha & Timeline Guidance</strong>
                <p>Get actionable predictions and wearing guidance for upcoming years.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Repository Style Card */}
        <div className="form-card-right">
          <Card className="repo-form-card">
            <div className="repo-card-body">
              <h2 className="repo-card-title">Enter Your Birth Details</h2>
              <p className="repo-card-subtext">
                Get your personalized Gemstone report with accurate Vedic predictions.
              </p>

              <form onSubmit={handleSubmit} className="repo-birth-form">
                {/* Row 1: Name & Gender */}
                <div className="repo-form-row-two">
                  <div className="floating-form-group">
                    <span className="field-floating-label">Full Name</span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                    />
                  </div>

                  <div className="floating-form-group">
                    <span className="field-floating-label">Gender</span>
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Email Address */}
                <div className="floating-form-group">
                  <span className="field-floating-label">Email Address</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                  />
                </div>

                {/* Date of Birth */}
                <div className="repo-form-row-three">
                  <div className="floating-form-group">
                    <span className="field-floating-label">Day</span>
                    <select name="dobDay" value={formData.dobDay} onChange={handleChange}>
                      {days.map((d) => <option key={d} value={d}>{parseInt(d, 10)}</option>)}
                    </select>
                  </div>

                  <div className="floating-form-group">
                    <span className="field-floating-label">Month</span>
                    <select name="dobMonth" value={formData.dobMonth} onChange={handleChange}>
                      {months.map((m) => <option key={m.num} value={m.num}>{m.name}</option>)}
                    </select>
                  </div>

                  <div className="floating-form-group">
                    <span className="field-floating-label">Year</span>
                    <select name="dobYear" value={formData.dobYear} onChange={handleChange}>
                      {years.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>

                {/* Time of Birth */}
                <div className="repo-form-row-three">
                  <div className="floating-form-group">
                    <span className="field-floating-label">Hour</span>
                    <select name="tobHour" value={formData.tobHour} onChange={handleChange}>
                      {hours.map((h) => <option key={h} value={h}>{h}</option>)}
                    </select>
                  </div>

                  <div className="floating-form-group">
                    <span className="field-floating-label">Minute</span>
                    <select name="tobMinute" value={formData.tobMinute} onChange={handleChange}>
                      {minutes.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>

                  <div className="floating-form-group">
                    <span className="field-floating-label">AM / PM</span>
                    <select name="tobAmPm" value={formData.tobAmPm} onChange={handleChange}>
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div className="repo-form-row-two">
                  <div className="floating-form-group">
                    <span className="field-floating-label">Country</span>
                    <select name="country" value={formData.country} onChange={handleChange}>
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="UAE">UAE</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>

                  <div className="floating-form-group">
                    <span className="field-floating-label">City</span>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Type your city"
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="repo-green-submit-btn">
                  Discover Your Gemstone &rarr;
                </button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

