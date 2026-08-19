import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Compass, Moon, Star, Orbit, Sun, Sparkles, Calendar, Clock, MapPin, User } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import '../../styles/pages/AstrologyDetailsPage.css';

export function AstrologyDetailsPage() {
  const { report, handleNext } = useOutletContext();
  const [userBirthDetails, setUserBirthDetails] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('gemstoneBirthDetails');
      if (saved) setUserBirthDetails(JSON.parse(saved));
    } catch (e) {
      console.error(e);
    }
  }, []);

  if (!report) return null;

  const birthChartData = report?.astroBluePrint?.birthChart;
  const dashaTimeLine = report?.astroBluePrint?.dasha;

  const formatTime = (hour, min) => {
    if (!hour || !min) return "N/A";
    let h = parseInt(hour, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12;
    return `${h.toString().padStart(2, '0')}:${min.padStart(2, '0')} ${ampm}`;
  };

  const getMonthName = (monthNum) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[parseInt(monthNum, 10) - 1] || monthNum;
  };

  const formattedDate = userBirthDetails
    ? `${userBirthDetails.birthDay} ${getMonthName(userBirthDetails.birthMonth)} ${userBirthDetails.birthYear}`
    : 'N/A';

  const formattedTime = userBirthDetails
    ? formatTime(userBirthDetails.birthHour, userBirthDetails.birthMinute)
    : 'N/A';

  const placeOfBirth = userBirthDetails
    ? `${userBirthDetails.birthCity}, ${userBirthDetails.birthCountry}`
    : 'N/A';

  return (
    <section id="blueprint-section" className="blueprint-page-section">

      {/* Header */}
      <div className="section-title-center">
        <h2>Your Astrological <span className="text-emerald">Blueprint</span></h2>
        <div className="blueprint-subtitle-row">
          <div className="diamond-icon">✦</div>
          <p>Key highlights from your birth chart</p>
          <div className="diamond-icon">✦</div>
        </div>
      </div>

      {/* User Details Bar */}
      {userBirthDetails && (
        <div className="user-details-wrapper">
          <h3 className="ud-section-title">Birth Details</h3>
          <div className="user-details-bar">
            <div className="ud-info-item">
              <User className="ud-icon" />
              <div className="ud-info-text">
                <span className="ud-label">Name</span>
                <span className="ud-name">{userBirthDetails.fullName} {userBirthDetails.gender ? `(${userBirthDetails.gender})` : ''}</span>
              </div>
            </div>
            <div className="ud-divider"></div>
            <div className="ud-info-grid">
              <div className="ud-info-item">
                <Calendar className="ud-icon" />
                <div className="ud-info-text">
                  <span className="ud-label">Date of Birth</span>
                  <span className="ud-value">{formattedDate}</span>
                </div>
              </div>
              <div className="ud-info-item">
                <Clock className="ud-icon" />
                <div className="ud-info-text">
                  <span className="ud-label">Time of Birth</span>
                  <span className="ud-value">{formattedTime}</span>
                </div>
              </div>
              <div className="ud-info-item">
                <MapPin className="ud-icon" />
                <div className="ud-info-text">
                  <span className="ud-label">Place of Birth</span>
                  <span className="ud-value">{placeOfBirth}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Row: Lagna, Moon Sign, Nakshatra */}
      <div className="blueprint-grid-3">
        {/* Lagna Card */}
        <div className="bp-card card-lagna">
          <div className="card-top-border lagna-border"></div>
          <div className="icon-ring lagna-ring">
            <Compass className="bp-icon" />
          </div>
          <span className="bp-label">Lagna (Ascendant)</span>
          <strong className="bp-value lagna-value">{birthChartData.lagna}</strong>
          <span className="bp-subtext">({birthChartData.lagnaSanskrit})</span>
        </div>

        {/* Moon Sign Card */}
        <div className="bp-card card-moon">
          <div className="card-top-border moon-border"></div>
          <div className="icon-ring moon-ring">
            <Moon className="bp-icon" />
          </div>
          <span className="bp-label">Moon Sign (Rashi)</span>
          <strong className="bp-value moon-value">{birthChartData.moonSign}</strong>
          <span className="bp-subtext">({birthChartData.moonSignSanskrit})</span>
        </div>

        {/* Nakshatra Card */}
        <div className="bp-card card-star">
          <div className="card-top-border star-border"></div>
          <div className="icon-ring star-ring">
            <Star className="bp-icon" />
          </div>
          <span className="bp-label">Nakshatra</span>
          <strong className="bp-value star-value">{birthChartData.star}</strong>
          <span className="bp-subtext">Pada {birthChartData.starPada}</span>
        </div>
      </div>

      {/* Middle Row: Nakshatra Lord, Lagna Lord */}
      <div className="blueprint-grid-2">
        <div className="bp-card-horizontal card-lord-nakshatra">
          <div className="bg-network-overlay nakshatra-network"></div>
          <div className="icon-circle nakshatra-circle">
            <Orbit className="bp-icon" />
          </div>
          <div className="bp-text-col">
            <span className="bp-label">Nakshatra Lord</span>
            <strong className="bp-value nakshatra-value">{birthChartData.nakshatraLord}</strong>
          </div>
        </div>

        <div className="bp-card-horizontal card-lord-lagna">
          <div className="bg-network-overlay lagna-network"></div>
          <div className="icon-circle lagna-circle">
            <Orbit className="bp-icon" />
          </div>
          <div className="bp-text-col">
            <span className="bp-label">Lagna Lord</span>
            <strong className="bp-value lagna-value">{birthChartData.lagnaLord}</strong>
          </div>
        </div>
      </div>

      {/* Planetary Period Divider */}
      <div className="planetary-period-divider">
        <div className="dash-line"></div>
        <div className="diamond-icon">✦</div>
        <span>CURRENT PLANETARY PERIOD</span>
        <div className="diamond-icon">✦</div>
        <div className="dash-line"></div>
      </div>

      {/* Bottom Row: Mahadasha, Antardasha */}
      <div className="blueprint-grid-2">
        <div className="bp-card-horizontal card-dasha-maha">
          <div className="icon-wrapper">
            <div className="dotted-ring-bg maha-ring"></div>
            <div className="icon-circle maha-circle">
              <Sun className="bp-icon" />
            </div>
          </div>
          <div className="bp-text-col">
            <span className="bp-label">Mahadasha</span>
            <strong className="bp-value maha-value">{dashaTimeLine?.mahadasha}</strong>
            <div className="bp-subtext date-text">
              From: {dashaTimeLine?.mahadashaFrom} <br />
              To: {dashaTimeLine?.mahadashaTo}
            </div>
          </div>
        </div>

        <div className="bp-card-horizontal card-dasha-antar">
          <div className="icon-wrapper">
            <div className="dotted-ring-bg antar-ring"></div>
            <div className="icon-circle antar-circle">
              <Moon className="bp-icon" />
            </div>
          </div>
          <div className="bp-text-col">
            <span className="bp-label">Antardasha</span>
            <strong className="bp-value antar-value">{dashaTimeLine?.antardasha}</strong>
            <div className="bp-subtext date-text">
              From: {dashaTimeLine?.antardashaFrom} <br />
              To: {dashaTimeLine?.antardashaTo}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="blueprint-cta-banner">
        <div className="cta-graphics-left">
          <div className="orbit-rings">
            <div className="orbit-1"></div>
            <div className="orbit-2"></div>
            <div className="orbit-3"></div>
            <div className="center-star">
              <Sparkles className="sparkle-icon" />
            </div>
            <div className="floating-dot dot-1"></div>
            <div className="floating-dot dot-2"></div>
            <div className="floating-dot dot-3"></div>
          </div>
        </div>

        <div className="cta-content-right">
          <p className="cta-note">
            {report?.astroBluePrint?.dashaExplainerText || "Your chart has been analyzed across planetary strength, house ownership, Dasha timing and gemstone compatibility."}
          </p>
          <button className="cta-btn-emerald" onClick={handleNext}>
            <span>See Your Gemstone</span>
            <ArrowUpRight className="btn-arrow-icon" />
          </button>
        </div>
      </div>
    </section>
  );
}
