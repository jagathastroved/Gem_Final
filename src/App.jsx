import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes.jsx';
import { mockGemstoneReportData, getMockReportByDetails } from './data/mockGemstoneReport.js';
import './styles/base/App.css';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { MainLayout } from './components/layout/MainLayout.jsx';

function AppContent() {
  const [report, setReport] = useState(mockGemstoneReportData);
  const [userBirthDetails, setUserBirthDetails] = useState(null);

  const handleSubmitBirthDetails = (details) => {
    setUserBirthDetails(details);
  };

  const handleLoadingComplete = () => {
    if (userBirthDetails) {
      const updatedReport = getMockReportByDetails(userBirthDetails);
      setReport(updatedReport);
    }
  };

  return (
    <div className="app-root">
      <MainLayout>
        <div className="app-main-content">
        <AppRoutes 
          report={report} 
          onSubmitDetails={handleSubmitBirthDetails} 
          onLoadingComplete={handleLoadingComplete} 
        />
        </div>
      </MainLayout>
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
