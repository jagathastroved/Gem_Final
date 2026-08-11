import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {FormPage} from '../components/pages/FormPage.jsx';
import { AnalysisLoadingPage } from '../components/pages/AnalysisLoadingPage.jsx';
import { ReportContainerPage } from '../components/pages/ReportContainerPage.jsx';
import { PaymentPage } from '../components/pages/PaymentPage.jsx';

export function AppRoutes({ report, onSubmitDetails, onLoadingComplete }) {
  return (
    <Routes>
      <Route 
        path="/" 
        element={<FormPage onSubmitDetails={onSubmitDetails} />} 
      />

      <Route 
        path="/loading" 
        element={<AnalysisLoadingPage onLoadingComplete={onLoadingComplete} />} 
      />

      <Route 
        path="/:sectionId" 
        element={<ReportContainerPage report={report} />} 
      />

      <Route 
        path="/checkout" 
        element={<PaymentPage report={report} />} 
      />
    </Routes>
  );
}

