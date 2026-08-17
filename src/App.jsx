import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes.jsx';
import './styles/base/App.css';
import { ThemeProvider } from './context/ThemeContext.jsx';

function AppContent() {
  const [report, setReport] = useState(null);
  const [userBirthDetails, setUserBirthDetails] = useState(null);

  const handleSubmitBirthDetails = (details, fetchedReport) => {
    setUserBirthDetails(details);
    if (fetchedReport) {
      setReport(fetchedReport);
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
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}
