import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes.jsx';
import { mockGemstoneReportData, getMockReportByDetails } from './data/mockGemstoneReport.js';
import './styles/base/App.css';
import { ThemeProvider } from './context/ThemeContext.jsx';

function AppContent() {
  const [report, setReport] = useState(() => {
    try {
      const saved = localStorage.getItem('gemstone_app_report');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved report', e);
    }
    return mockGemstoneReportData;
  });
  
  const [userBirthDetails, setUserBirthDetails] = useState(() => {
    try {
      const saved = localStorage.getItem('gemstone_app_user_details');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved user details', e);
    }
    return null;
  });

  const handleSubmitBirthDetails = (details) => {
    setUserBirthDetails(details);
    localStorage.setItem('gemstone_app_user_details', JSON.stringify(details));
  };

  const handleLoadingComplete = () => {
    if (userBirthDetails) {
      const updatedReport = getMockReportByDetails(userBirthDetails);
      setReport(updatedReport);
      localStorage.setItem('gemstone_app_report', JSON.stringify(updatedReport));
    }
  };

  return (
    <div className="app-root">
      <div className="app-main-content">
      <AppRoutes 
        report={report} 
        onSubmitDetails={handleSubmitBirthDetails} 
        onLoadingComplete={handleLoadingComplete} 
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
