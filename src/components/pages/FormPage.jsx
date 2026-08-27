import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AlertCircle, Sparkles, ShieldAlert, Hourglass } from 'lucide-react';
import { Card } from '../ui/Card.jsx';
import { SearchableDropdown } from '../ui/SearchableDropdown.jsx';
import '../../styles/pages/FormPage.css';
import { cityList, countryList } from '@/src/services/astrologyApi.js';

const ErrorIcon = ({ message }) => {
  return (
    <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, pointerEvents: 'none' }}>
      <AlertCircle color="#ef4444" size={20} />
      <div className="error-tooltip" style={{ position: 'absolute', bottom: '100%', right: '-10px', marginBottom: '8px', backgroundColor: '#1f2937', color: 'white', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', whiteSpace: 'nowrap', fontFamily: 'sans-serif', zIndex: 20, pointerEvents: 'none' }}>
        {message}
        <div style={{ position: 'absolute', top: '100%', right: '15px', borderWidth: '6px', borderStyle: 'solid', borderColor: '#1f2937 transparent transparent transparent' }}></div>
      </div>
      <style>{`
        .error-tooltip { opacity: 0; visibility: hidden; transition: opacity 0.2s; }
        .floating-form-group:hover .error-tooltip,
        .floating-form-group:focus-within .error-tooltip { opacity: 1; visibility: visible; }
      `}</style>
    </div>
  );
}


const getDaysInMonth = (month, year) => {
  return new Date(year, parseInt(month), 0).getDate();
};

export function FormPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const promoCode = searchParams.get('promo') || "";
  const [country, setCountry] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    email: '',
    dobDay: '01',
    dobMonth: '01',
    dobYear: '2000',
    tobHour: '12',
    tobMinute: '00',
    tobAmPm: 'AM',
    country: 'India',
    city: '',
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await countryList();
      const countryName = countries.map((item) => item.CountryName1);
      setCountry(countryName);
    };
    fetchCountries();
  }, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      // Remove any character that is not a letter or a space
      const sanitizedValue = value.replace(/[^a-zA-Z\s]/g, '');
      setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 3) {
      newErrors.name = "Minimum 3 letters required";
    }
    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.country) {
      newErrors.country = "Please select a valid country";
    }
    if (!formData.city) {
      newErrors.city = "Please select a valid city from the suggested list.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    // Format Day
    const finalDay = formData.dobDay ? String(formData.dobDay).trim().padStart(2, '0') : '01';

    // Format Month
    let finalMonth = '01';
    if (formData.dobMonth) {
      const isNumeric = !isNaN(parseInt(formData.dobMonth, 10));
      if (isNumeric) {
        finalMonth = String(parseInt(formData.dobMonth, 10)).padStart(2, '0');
      } else {
        const matched = allMonths.find(m => m.name.toLowerCase().startsWith(formData.dobMonth.trim().toLowerCase()));
        if (matched) finalMonth = matched.num;
      }
    }

    // Format Year
    const finalYear = formData.dobYear ? String(formData.dobYear).trim() : '2000';

    // Format Minute
    const finalMinute = formData.tobMinute ? String(formData.tobMinute).trim().padStart(2, '0') : '00';

    // Format Hour (24-hour format)
    let hour24 = parseInt(formData.tobHour, 10) || 12;
    const ampm = formData.tobAmPm ? formData.tobAmPm.trim().toUpperCase() : 'AM';
    if (ampm === 'PM' && hour24 !== 12) {
      hour24 += 12;
    } else if (ampm === 'AM' && hour24 === 12) {
      hour24 = 0;
    }
    const finalHour = String(hour24).padStart(2, '0');

    const birthDetails = {
      fullName: formData.name,
      email: formData.email,
      gender: formData.gender,
      birthDay: finalDay,
      birthMonth: finalMonth,
      birthYear: finalYear,
      birthHour: finalHour,
      birthMinute: finalMinute,
      birthSecond: "00",
      birthCountry: formData.country,
      birthCity: formData.city,
      latitude: formData.latitude,
      longitude: formData.longitude,
      promo: promoCode
    };
    // console.log('API PayLoad', birthDetails)

    // Go to loading immediately and pass birthDetails
    navigate('/loading', { state: { birthDetails } });
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  const selectedYear = parseInt(formData.dobYear) || currentYear;
  const selectedMonth = parseInt(formData.dobMonth) || currentMonth;

  let maxDays = getDaysInMonth(selectedMonth, selectedYear);
  if (selectedYear === currentYear && selectedMonth === currentMonth) {
    maxDays = Math.min(maxDays, currentDay);
  }

  const days = Array.from({ length: maxDays }, (_, i) => String(i + 1).padStart(2, '0'));

  const allMonths = [
    { num: '01', name: 'Jan' }, { num: '02', name: 'Feb' }, { num: '03', name: 'Mar' },
    { num: '04', name: 'Apr' }, { num: '05', name: 'May' }, { num: '06', name: 'Jun' },
    { num: '07', name: 'Jul' }, { num: '08', name: 'Aug' }, { num: '09', name: 'Sep' },
    { num: '10', name: 'Oct' }, { num: '11', name: 'Nov' }, { num: '12', name: 'Dec' }
  ];

  const months = selectedYear === currentYear
    ? allMonths.filter(m => parseInt(m.num) <= currentMonth)
    : allMonths;

  const years = Array.from({ length: 100 }, (_, i) => String(currentYear - i));

  useEffect(() => {
    // Reset day/month if they become invalid due to year/month change
    setFormData(prevFormData => {
      let updatedFormData = { ...prevFormData };
      let changed = false;

      const currentSelectedYear = parseInt(prevFormData.dobYear) || currentYear;

      if (currentSelectedYear === currentYear && parseInt(prevFormData.dobMonth) > currentMonth) {
        updatedFormData.dobMonth = String(currentMonth).padStart(2, '0');
        changed = true;
      }

      const newMaxDays = getDaysInMonth(updatedFormData.dobMonth, updatedFormData.dobYear);
      const finalMaxDays = (parseInt(updatedFormData.dobYear) === currentYear && parseInt(updatedFormData.dobMonth) === currentMonth)
        ? Math.min(newMaxDays, currentDay)
        : newMaxDays;

      if (parseInt(prevFormData.dobDay) > finalMaxDays) {
        updatedFormData.dobDay = String(finalMaxDays).padStart(2, '0');
        changed = true;
      }

      return changed ? updatedFormData : prevFormData;
    });
  }, [formData.dobYear, formData.dobMonth, currentYear, currentMonth, currentDay]);
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  return (
    <div className="form-page-container">

      <div className="form-content-wrapper">
        {/* Left Column - Headline & Repository Checklist */}
        <div className="form-hero-left form-hero-left-relative">
          <svg width="0" height="0" className="form-hero-left-svg">
            <defs>
              <linearGradient id="premiumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f6d365" />
                <stop offset="100%" stopColor="#fda085" />
              </linearGradient>
            </defs>
          </svg>

          <span className="premium-eyebrow">
            YOUR BIRTH CHART HOLDS THE CLUE TO YOUR GEMSTONE
          </span>
          <h1 className="hero-repo-headline hero-repo-headline-styled">
            Discover the <span className="premium-gradient-text">Gemstone</span> Your Chart Points To
          </h1>
          <p className="hero-repo-subtitle hero-repo-subtitle-styled">
            Go beyond generic zodiac or Moon-sign recommendations. Enter your birth details to receive AstroVed's Free AI-Powered Expert Gemstone Report, which considers your Ascendant [Lagna], supportive planetary influences, house rulership, and current planetary timing before identifying the gemstone for you to explore.
          </p>

          <span className="premium-eyebrow">
            YOUR PERSONALIZED REPORT HELPS YOU UNDERSTAND
          </span>

          <ul className="premium-benefits-list">
            <li className="premium-list-item premium-list-item-styled">
              <div className="premium-icon-wrap premium-icon-wrap-styled">
                <Sparkles stroke="url(#premiumGradient)" />
              </div>
              <span className="premium-benefit-text"><strong className="premium-benefit-title">Your Primary Gemstone</strong> - see the gemstone identified through your chart and understand the astrological reason it may suit you.</span>
            </li>
            <li className="premium-list-item premium-list-item-styled">
              <div className="premium-icon-wrap premium-icon-wrap-styled">
                <ShieldAlert stroke="url(#premiumGradient)" />
              </div>
              <span className="premium-benefit-text"><strong className="premium-benefit-title">Gemstones to Approach With Caution</strong> - know which stones may not align well with the planetary patterns in your chart.</span>
            </li>
            <li className="premium-list-item premium-list-item-styled">
              <div className="premium-icon-wrap premium-icon-wrap-styled">
                <Hourglass stroke="url(#premiumGradient)" />
              </div>
              <span className="premium-benefit-text"><strong className="premium-benefit-title">Your Planetary Timing</strong> - understand your Major Planetary Period [Mahadasha], Sub-Period [Antardasha], and relevant timing context.</span>
            </li>
          </ul>

          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <a href="#gemstone-form" className="premium-btn" onClick={(e) => { e.preventDefault(); document.getElementById('gemstone-form').scrollIntoView({ behavior: 'smooth' }); }}>
              GET MY FREE GEMSTONE REPORT
            </a>
          </div>
        </div>

        {/* Right Column - Repository Style Card */}
        <div className="form-card-right" id="gemstone-form">
          <Card className="repo-form-card">
            <div className="form-top-banner">
              ASTROVED'S FREE AI-POWERED EXPERT GEMSTONE REPORT
            </div>
            <div className="repo-card-body">
              <h2 className="repo-card-title">Enter Your Birth Details</h2>
              <p className="repo-card-subtext">
                Get your personalized Gemstone report with accurate Vedic predictions.
              </p>

              <form onSubmit={handleSubmit} className="repo-birth-form">
                {/* Row 1: Name & Gender */}
                <div className="repo-form-row-two">
                  <div className={`floating-form-group floating-form-group-relative ${errors.name ? 'has-error' : ''}`}>
                    <span className="field-floating-label">Full Name</span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) => { handleChange(e); setErrors(prev => ({ ...prev, name: null })); }}
                      placeholder="Your Name"
                    />
                    {errors.name && <ErrorIcon message={errors.name} />}
                  </div>

                  <div className={`floating-form-group floating-form-group-relative ${errors.gender ? 'has-error' : ''}`}>
                    <span className="field-floating-label">Gender</span>
                    <div className="dropdown-wrapper">
                      <SearchableDropdown
                        value={formData.gender}
                        onChange={(val) => { setFormData((prev) => ({ ...prev, gender: val })); setErrors(prev => ({ ...prev, gender: null })); }}
                        options={["Male", "Female", "Other"]}
                        placeholder="Select Gender"
                        disableTyping={true}
                      />
                    </div>
                    {errors.gender && <ErrorIcon message={errors.gender} />}
                  </div>
                </div>

                {/* Email Address */}
                <div className={`floating-form-group floating-form-group-relative ${errors.email ? 'has-error' : ''}`}>
                  <span className="field-floating-label">Email Address</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => {
                      handleChange(e);
                      const val = e.target.value;
                      if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
                        setErrors(prev => ({ ...prev, email: "Please enter a valid email address." }));
                      } else {
                        setErrors(prev => ({ ...prev, email: null }));
                      }
                    }}
                    placeholder="Enter Your Email"
                  />
                  {errors.email && <ErrorIcon message={errors.email} />}
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
                      disableTyping={true}
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
                      disableTyping={true}
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
                      disableTyping={true}
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
                      disableTyping={true}
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
                      disableTyping={true}
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
                      disableTyping={true}
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="repo-form-row-two">
                  <div className={`floating-form-group floating-form-group-relative ${errors.country ? 'has-error' : ''}`}>
                    <span className="field-floating-label">Country</span>
                    <div className="dropdown-wrapper">
                      <SearchableDropdown
                        value={formData.country}
                        onChange={(val) => { setFormData((prev) => ({ ...prev, country: val, city: '' })); setErrors(prev => ({ ...prev, country: null })); }}
                        options={country}
                        placeholder="Select Country"
                        openUpwards={true}
                        preventNumbers={true}
                        emptyMessage={<span>No countries found. Please<br />check spelling.</span>}
                      />
                    </div>
                    {errors.country && <ErrorIcon message={errors.country} />}
                  </div>

                  <div className={`floating-form-group floating-form-group-relative ${errors.city ? 'has-error' : ''}`}>
                    <span className="field-floating-label">City</span>
                    <div className="floating-form-group-relative">
                      {!formData.country && (
                        <div
                          className="city-overlay-blocker"
                          onClick={() => setErrors(prev => ({ ...prev, city: "Please select a country first" }))}
                        />
                      )}
                      <div className="dropdown-wrapper">
                        <SearchableDropdown
                          value={formData.city}
                          onChange={(val, opt) => {
                            setFormData((prev) => ({
                              ...prev,
                              city: val,
                              latitude: opt?.latitude || 0,
                              longitude: opt?.longitude || 0
                            }));
                            setErrors(prev => ({ ...prev, city: null }));
                          }}
                          placeholder="Type your city"
                          disabled={!formData.country}
                          preventNumbers={true}
                          fetchOptions={async (search) => {
                            if (!formData.country || search.length < 3) return [];
                            const cities = await cityList(formData.country, search);
                            if (!cities || !cities.data) return [];
                            return cities.data.map(c => ({
                              title: c.City,
                              subtitle: `${c.StateorProvince}, ${c.Country}`,
                              latitude: parseFloat(c.Latitude),
                              longitude: parseFloat(c.Longitude)
                            }));
                          }}
                          renderItem={(opt) => (
                            <>
                              <span className="searchable-item-title">{opt.title}</span>
                              <span className="searchable-item-subtitle">{opt.subtitle}</span>
                            </>
                          )}
                          openUpwards={true}
                          emptyMessage={<span>No cities found. Please<br />check spelling.</span>}
                          minSearchLength={3}
                        />
                      </div>
                    </div>
                    {errors.city && <ErrorIcon message={errors.city} />}
                  </div>
                </div>
                <button type="submit" className="repo-green-submit-btn">
                  Get My Free Gemstone Report &rarr;
                </button>
                <p className="repo-form-footer-text">
                  For the most personalized result, enter the most accurate birth details available.
                </p>
              </form>
            </div>
          </Card>
        </div>
      </div >
    </div >
  );
}

