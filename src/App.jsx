import { useState, useEffect } from 'react';
import { BrowserRouter, useLocation, Navigate } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes.jsx';
import './styles/base/App.css';
import { ThemeProvider } from './context/ThemeContext.jsx';

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    };

    const currency = getCookie('currentcurrency');

    if (currency) {
      const currentcurrency = currency.toUpperCase();
      if (currentcurrency === 'USD' || currentcurrency === 'MYR') {
        window.location.href = 'https://www.astroved.com/';
      }
    }
  }, []);

  const [report, setReport] = useState(() => {
    try {
      const saved = localStorage.getItem('gemstoneReport');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.log('Error Msg: ', e);
      return null;
    }
  });

  const [userBirthDetails, setUserBirthDetails] = useState(() => {
    try {
      const saved = localStorage.getItem('gemstoneBirthDetails');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error('Error Msg: ', e);
      return null;
    }
  });

  const isAuthRoute = location.pathname === '/' || location.pathname === '/loading';

  if (!isAuthRoute && (!userBirthDetails || !report)) {
    return <Navigate to="/" replace />;
  }

  const handleSubmitBirthDetails = (details, fetchedReport) => {
    setUserBirthDetails(details);
    localStorage.setItem('gemstoneBirthDetails', JSON.stringify(details));

    if (fetchedReport) {
      setReport(fetchedReport);
      localStorage.setItem('gemstoneReport', JSON.stringify(fetchedReport));
    }
  };

  return (
    <div className="app-root">
      <div className="app-main-content">
        <AppRoutes
          report={report}
          onSubmitDetails={handleSubmitBirthDetails}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename='gemstone-report'>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}
