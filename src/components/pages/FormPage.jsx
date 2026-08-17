import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card.jsx';
import { SearchableDropdown } from '../ui/SearchableDropdown.jsx';
import '../../styles/pages/FormPage.css';
import { cityList, countryList } from '@/src/services/astrologyApi.js';


export function FormPage({ onSubmitDetails }) {
  const navigate = useNavigate();
  const [country, setCountry] = useState([]);
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

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await countryList();
      const countryName = countries.map((item) => item.CountryName1);
      setCountry(countryName);
      console.log(countryName);
    };
    fetchCountries();
  }, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const birthDetails = {
      name: formData.name,
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
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 80 }, (_, i) => String(currentYear - i));
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
                    <SearchableDropdown
                      value={formData.gender}
                      onChange={(val) => setFormData((prev) => ({ ...prev, gender: val }))}
                      options={["Male", "Female", "Other"]}
                      placeholder="Gender"
                    />
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
                    <SearchableDropdown
                      value={formData.dobDay}
                      onChange={(val) => setFormData((prev) => ({ ...prev, dobDay: val }))}
                      options={days}
                      placeholder="Day"
                      openUpwards={true}
                    />
                  </div>

                  <div className="floating-form-group">
                    <span className="field-floating-label">Month</span>
                    <SearchableDropdown
                      value={months.find(m => m.num === formData.dobMonth)?.name || formData.dobMonth}
                      onChange={(text, opt) => setFormData((prev) => ({ ...prev, dobMonth: opt ? opt.value : text }))}
                      options={months.map(m => ({ title: m.name, value: m.num }))}
                      placeholder="Month"
                      openUpwards={true}
                    />
                  </div>

                  <div className="floating-form-group">
                    <span className="field-floating-label">Year</span>
                    <SearchableDropdown
                      value={formData.dobYear}
                      onChange={(val) => setFormData((prev) => ({ ...prev, dobYear: val }))}
                      options={years}
                      placeholder="Year"
                      openUpwards={true}
                    />
                  </div>
                </div>

                {/* Time of Birth */}
                <div className="repo-form-row-three">
                  <div className="floating-form-group">
                    <span className="field-floating-label">Hour</span>
                    <SearchableDropdown
                      value={formData.tobHour}
                      onChange={(val) => setFormData((prev) => ({ ...prev, tobHour: val }))}
                      options={hours}
                      placeholder="Hour"
                      openUpwards={true}
                    />
                  </div>

                  <div className="floating-form-group">
                    <span className="field-floating-label">Minute</span>
                    <SearchableDropdown
                      value={formData.tobMinute}
                      onChange={(val) => setFormData((prev) => ({ ...prev, tobMinute: val }))}
                      options={minutes}
                      placeholder="Minute"
                      openUpwards={true}
                    />
                  </div>

                  <div className="floating-form-group">
                    <span className="field-floating-label">AM / PM</span>
                    <SearchableDropdown
                      value={formData.tobAmPm}
                      onChange={(val) => setFormData((prev) => ({ ...prev, tobAmPm: val }))}
                      options={["AM", "PM"]}
                      placeholder="AM/PM"
                      openUpwards={true}
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="repo-form-row-two">
                  <div className="floating-form-group">
                    <span className="field-floating-label">Country</span>
                    <SearchableDropdown
                      value={formData.country}
                      onChange={(val) => setFormData((prev) => ({ ...prev, country: val, city: '' }))}
                      options={country}
                      placeholder="Select a Country"
                      openUpwards={true}
                    />
                  </div>

                  <div className="floating-form-group">
                    <span className="field-floating-label">City</span>
                    <SearchableDropdown
                      value={formData.city}
                      onChange={(val) => setFormData((prev) => ({ ...prev, city: val }))}
                      placeholder="Type your city"
                      disabled={!formData.country}
                      fetchOptions={async (search) => {
                        if (!formData.country || search.length < 3) return [];
                        const cities = await cityList(formData.country, search);
                        if (!cities || !cities.data) return [];
                        return cities.data.map(c => ({
                          title: c.City,
                          subtitle: `${c.StateorProvince}, ${c.Country}`
                        }));
                      }}
                      renderItem={(opt) => (
                        <>
                          <span className="searchable-item-title">{opt.title}</span>
                          <span className="searchable-item-subtitle">{opt.subtitle}</span>
                        </>
                      )}
                      openUpwards={true}
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

