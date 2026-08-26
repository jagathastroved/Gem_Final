import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Target, Globe, Gem, AlertCircle, Sparkles, Lock, Compass, ShieldAlert, Shield, Hourglass, Users, Moon, User, FileSearch, ArrowDown, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card.jsx';
import { SearchableDropdown } from '../ui/SearchableDropdown.jsx';
import gemstoneOgImage from '../../assets/gemStone_images/gemstone_og_image.jpg';
import '../../styles/pages/FormPage.css';
import '../../styles/pages/GemstoneLp.css';
import { cityList, countryList } from '@/src/services/astrologyApi.js';

const ErrorIcon = ({ message }) => {
  return (
    <div className="error-icon-wrapper">
      <AlertCircle color="#ef4444" size={20} />
      <div className="error-tooltip">
        {message}
      </div>
    </div>
  );
}


export function GemstoneLp({ onSubmitDetails }) {
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

  const getDaysInMonth = (month, year) => {
    return new Date(year, parseInt(month), 0).getDate();
  };

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
    let updatedFormData = { ...formData };
    let changed = false;

    if (selectedYear === currentYear && parseInt(formData.dobMonth) > currentMonth) {
      updatedFormData.dobMonth = String(currentMonth).padStart(2, '0');
      changed = true;
    }

    const newMaxDays = getDaysInMonth(updatedFormData.dobMonth, updatedFormData.dobYear);
    const finalMaxDays = (parseInt(updatedFormData.dobYear) === currentYear && parseInt(updatedFormData.dobMonth) === currentMonth)
      ? Math.min(newMaxDays, currentDay)
      : newMaxDays;

    if (parseInt(formData.dobDay) > finalMaxDays) {
      updatedFormData.dobDay = String(finalMaxDays).padStart(2, '0');
      changed = true;
    }

    if (changed) {
      setFormData(updatedFormData);
    }
  }, [formData.dobYear, formData.dobMonth]);
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  return (
    <>
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

            <div>
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

      {/* NEW SECTIONS */}
      < div className="gemstone-lp-section" >

        {/* WHY ASTROVED GOES DEEPER */}
        <section className="lp-section-pad lp-bg-navy" id="how-it-works">
          <div className="container">
            <div className="how-it-works-top-row">
              <div className="how-it-works-left">
                <div className="lp-section-head custom-astro-header left">
                  <p className="premium-eyebrow custom-astro-eyebrow">Why AstroVed's Recommendation Goes Deeper</p>
                  <h2>Not Just Your Moon Sign.<br />Your Deeper Birth-Chart Logic.</h2>
                  <p>
                    Generic gemstone advice may match one gemstone to a Moon sign. AstroVed goes deeper by using
                    your Ascendant [Lagna] as the starting point and considering planetary house rulership,
                    supportive planetary influences, and current planetary periods before identifying the
                    gemstone to explore.
                  </p>
                </div>
              </div>

              <div className="how-it-works-right">
                <div className="lp-compare-grid">
                  <div className="lp-compare-card generic">
                    <p className="lp-compare-label">Generic Approach</p>
                    <div className="lp-flow vertical-flow">
                      <span className="node"><Moon size={18} /> Moon Sign</span>
                      <span className="arrow"><ArrowDown size={18} /></span>
                      <span className="node"><Globe size={18} /> Planet</span>
                      <span className="arrow"><ArrowDown size={18} /></span>
                      <span className="node"><Gem size={18} /> Gemstone</span>
                    </div>
                  </div>
                  <div className="vs-badge">VS</div>
                  <div className="lp-compare-card chart">
                    <p className="lp-compare-label">AstroVed Chart-Based Approach</p>
                    <div className="lp-flow vertical-flow">
                      <span className="node"><Compass size={18} /> Birth Chart</span>
                      <span className="arrow"><ArrowDown size={18} /></span>
                      <span className="node"><Sparkles size={18} /> Supportive Planet</span>
                      <span className="arrow"><ArrowDown size={18} /></span>
                      <span className="node"><Hourglass size={18} /> Planetary Timing</span>
                      <span className="arrow"><ArrowDown size={18} /></span>
                      <span className="node"><Gem size={18} /> Gemstone</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lp-note-block-banner">
              <div className="note-banner-icon">
                <Users size={36} color="#064e3b" />
              </div>
              <div className="note-banner-text">
                <p>
                  Two people with the same Moon sign may therefore receive different gemstone guidance.<br />
                  An Especially Supportive Planet [Yogakaraka], for example, can take priority over a simple
                  sign-based gemstone association.
                </p>
              </div>
              <div className="note-banner-cta">
                <a href="#gemstone-form" className="lp-btn lp-btn-gold" onClick={(e) => { e.preventDefault(); document.getElementById('gemstone-form').scrollIntoView({ behavior: 'smooth' }); }}>
                  SEE WHAT MY CHART RECOMMENDS
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 3 SIMPLE STEPS */}
        <section className="lp-section-pad steps-section" id="steps">
          <div className="container">
            <div className="steps-header-row">
              <span className="steps-line left"></span>
              <h2 className="steps-title">GET YOUR GEMSTONE REPORT IN 3 SIMPLE STEPS</h2>
              <span className="steps-line right"></span>
            </div>

            <div className="lp-steps-grid-modern">
              <div className="lp-step-card-modern">
                <div className="lp-step-badge">01</div>
                <div className="lp-step-icon"><User size={48} /></div>
                <h3>ENTER YOUR<br />BIRTH DETAILS</h3>
                <p>Provide your date, time, and place of birth.</p>
                <div className="lp-step-arrow"><ArrowRight size={24} /></div>
              </div>
              <div className="lp-step-card-modern">
                <div className="lp-step-badge">02</div>
                <div className="lp-step-icon"><FileSearch size={48} /></div>
                <h3>LET YOUR CHART GUIDE<br />THE ANALYSIS</h3>
                <p>Review Ascendant [Lagna], supportive influences, and planetary timing.</p>
                <div className="lp-step-arrow"><ArrowRight size={24} /></div>
              </div>
              <div className="lp-step-card-modern">
                <div className="lp-step-badge">03</div>
                <div className="lp-step-icon"><Gem size={48} /></div>
                <h3>GET YOUR GEMSTONE<br />REPORT</h3>
                <p>See your gemstone, why it is suggested, and stones to approach with caution.</p>
              </div>
            </div>

            <div className="lp-cta-row">
              <a href="#gemstone-form" className="lp-btn lp-btn-gold" onClick={(e) => { e.preventDefault(); document.getElementById('gemstone-form').scrollIntoView({ behavior: 'smooth' }); }}>START MY GEMSTONE REPORT</a>
            </div>
          </div>
        </section>

        {/* WHAT ARE GEMSTONES [MANI] */}
        <section className="lp-section-pad mani-section" id="mani">
          <div className="container">
            <div className="lp-mani-card">
              <div className="lp-split">
                <div className="lp-split-media">
                  <img src={gemstoneOgImage} alt="Gemstones" className="mani-gemstone-image" />
                </div>
                <div className="lp-split-body">
                  <h2 className="mani-title">WHAT ARE GEMSTONES [MANI]?</h2>
                  <p className="mani-text">
                    The Sanskrit word Mani [Mani] means a gem or jewel. In Vedic Astrology [Jyotish], gemstones
                    are traditionally connected with the 9 planetary influences, with different stones used for
                    different planetary qualities.
                  </p>
                  <p className="mani-text">
                    From a gemology perspective, gemstones interact with visible light in different ways. Their
                    crystal structure and trace elements absorb some wavelengths of light and transmit others,
                    creating the colors we see. This explains a gemstone's physical color and light behavior.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW DO GEMSTONES WORK */}
        <section className="lp-section-pad how-works-section">
          <div className="container">
            <div className="how-works-split">
              <div className="how-works-body">
                <p className="premium-eyebrow">A Traditional Planetary Remedy</p>
                <h2>How Do Gemstones Work in Vedic Astrology?</h2>
                <p>
                  Vedic Astrology gives gemstones a traditional spiritual role as planetary remedies. The idea
                  is not to choose a stone by color alone, but to strengthen a planetary influence only when
                  that planet is supportive in your birth chart.
                </p>
                <p>
                  Because the same planet can play a different role from one chart to another, the right
                  gemstone can vary from person to person. AstroVed therefore begins with your birth chart
                  rather than a one-size-fits-all sign rule.
                </p>
                <div className="lp-cta-row left" style={{ marginTop: '30px' }}>
                  <a href="#gemstone-form" className="lp-btn lp-btn-gold uppercase" onClick={(e) => { e.preventDefault(); document.getElementById('gemstone-form').scrollIntoView({ behavior: 'smooth' }); }}>FIND MY CHART ALIGNED GEMSTONE</a>
                </div>
              </div>
              <div className="how-works-media">
                <img src="https://phplexus.astroved.com/wp-content/uploads/2026/08/gemstones.png" alt="Gemstone" className="gemstone-showcase-img" />
              </div>
            </div>
          </div>
        </section>

        {/* AREAS OF LIFE */}
        <section className="lp-areas-light-section" id="areas">
          <div className="container">
            <div className="lp-section-head">
              <p className="premium-eyebrow">Traditional Support, By Area of Life</p>
              <h2>What Areas of Life Can the Right Gemstone Support?</h2>
              <p>Depending on the gemstone and your individual chart, planetary gemstones are traditionally used to seek support in important areas of life such as:</p>
            </div>

            <div className="lp-areas-grid">
              <div className="lp-area-card">
                <div className="lp-area-icon-wrap wealth">
                  <Gem size={28} />
                </div>
                <h3>Wealth &amp; Prosperity</h3>
                <p>Financial stability, opportunity, abundance.</p>
              </div>
              <div className="lp-area-card">
                <div className="lp-area-icon-wrap relationships">
                  <Sparkles size={28} />
                </div>
                <h3>Relationships &amp;<br />Family Harmony</h3>
                <p>Connection, understanding, comfort, harmony.</p>
              </div>
              <div className="lp-area-card">
                <div className="lp-area-icon-wrap career">
                  <Target size={28} />
                </div>
                <h3>Career &amp; Success</h3>
                <p>Confidence, recognition, decision-making, steady progress.</p>
              </div>
              <div className="lp-area-card">
                <div className="lp-area-icon-wrap wellbeing">
                  <Lock size={28} />
                </div>
                <h3>Well-Being &amp;<br />Inner Balance</h3>
                <p>Resilience, calm, vitality, spiritual reflection.</p>
              </div>
            </div>

            <div className="lp-disclaimer">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              These are traditional astrological associations and are not guaranteed outcomes.
            </div>

            <div className="lp-cta-row" style={{ marginTop: '20px' }}>
              <a href="#gemstone-form" className="lp-btn lp-btn-gold uppercase" onClick={(e) => { e.preventDefault(); document.getElementById('gemstone-form').scrollIntoView({ behavior: 'smooth' }); }}>EXPLORE WHAT MY CHART SUPPORTS</a>
            </div>
          </div>
        </section>

        {/* WHY CHOOSING THE RIGHT GEMSTONE MATTERS */}
        <section className="lp-why-matters-section">
          <div className="container">
            <p className="premium-eyebrow">Why Choosing the Right Gemstone Matters</p>
            <h2>Not Every Planet Should Be<br />Strengthened in Every Chart</h2>

            <p>
              In Vedic Astrology, wearing a gemstone is intended to strengthen the influence associated
              with its planet. If that planet is not favorable to strengthen in your individual chart,
              its gemstone may be a poor fit.
            </p>
            <p>
              This is why AstroVed's report does more than recommend a Primary Gemstone.
              It also identifies gemstones to approach with caution, helping you avoid choosing only
              from Moon-sign advice, birth-month lists, color preference, or generic recommendations.
            </p>

            <div className="lp-why-matters-quote">
              <p>The goal is not to wear more gemstones.<br />It is to choose more carefully.</p>
            </div>

            <a href="#gemstone-form" className="lp-btn lp-btn-gold" onClick={(e) => { e.preventDefault(); document.getElementById('gemstone-form').scrollIntoView({ behavior: 'smooth' }); }}>
              <Shield size={20} /> CHECK MY CHART BEFORE I CHOOSE
            </a>
          </div>
        </section>

        {/* THE ASTROVED GEMSTONE ADVANTAGE */}
        <section className="lp-advantage-light-section" id="advantage">
          <div className="container">
            <div className="lp-section-head">
              <p className="premium-eyebrow">Selected for Your Chart. Prepared With Care.</p>
              <h2>The AstroVed Gemstone Advantage</h2>
              <p>
                Choosing the right gemstone is only the first step. Many gemstones sold online or through jewelers are offered primarily as jewelry or loose stones and may not include traditional Vedic preparation. AstroVed adds a three-step devotional process so the gemstone is selected for your chart and carefully prepared for traditional spiritual use.
              </p>
            </div>

            <div className="lp-advantage-grid">
              <div className="lp-adv-card">
                <div className="lp-adv-icon">
                  <Sparkles size={16} />
                </div>
                <div className="lp-adv-num">01</div>
                <h3>Cleanse &amp; Purify</h3>
                <p>The gemstone is carefully cleansed and purified before ritual preparation.</p>
              </div>
              <div className="lp-adv-card">
                <div className="lp-adv-icon">
                  <Sparkles size={16} />
                </div>
                <div className="lp-adv-num">02</div>
                <h3>Activate With Vedic Ritual</h3>
                <p>Prayers, mantras, and traditional ritual intention prepare the gemstone for its planetary purpose.</p>
              </div>
              <div className="lp-adv-card">
                <div className="lp-adv-icon">
                  <Sparkles size={16} />
                </div>
                <div className="lp-adv-num">03</div>
                <h3>Energize &amp; Bless<br />at a Powerspot</h3>
                <p>The gemstone is blessed and energized at a Powerspot before it is provided for use.</p>
              </div>
            </div>

            <div className="lp-advantage-close">
              <div className="lp-advantage-close-banner">
                <p>The AstroVed difference is not only which gemstone you receive, but the care taken to purify, activate, and energize it to act as a powerful remedy for you as per Vedic astrology principles.</p>
              </div>
              <div className="lp-cta-row" style={{ marginTop: '25px', textAlign: 'left' }}>
                <a href="#gemstone-form" className="lp-btn lp-btn-gold uppercase" onClick={(e) => { e.preventDefault(); document.getElementById('gemstone-form').scrollIntoView({ behavior: 'smooth' }); }}>DISCOVER THE ASTROVED GEMSTONE ADVANTAGE</a>
              </div>
            </div>
          </div>

          {/* FINAL CTA */}
          <div className="container">
            <div className="lp-final-cta-box">
              <div className="lp-final-cta-left">
                <p className="premium-eyebrow cta-eyebrow">YOUR GEMSTONE SHOULD NOT BE A GUESS</p>
                <h2 className="final-cta-title">Your Birth Chart Is Personal.<br />Your Gemstone Guidance Should Be Too.</h2>
                <p>
                  Use AstroVed's Free AI-Powered Expert Gemstone Report to discover the gemstone
                  your chart points to, understand why it has been identified, see which gemstones may
                  require caution, and choose with greater confidence.
                </p>
              </div>
              <div className="lp-final-cta-right">
                <a href="#gemstone-form" className="lp-btn lp-btn-gold" onClick={(e) => { e.preventDefault(); document.getElementById('gemstone-form').scrollIntoView({ behavior: 'smooth' }); }}>GET MY FREE GEMSTONE REPORT &rarr;</a>
              </div>
            </div>
          </div>
        </section>

      </div >
    </>
  );
}


