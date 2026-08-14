import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import {FormPage} from '../components/pages/FormPage.jsx';
import { AnalysisLoadingPage } from '../components/pages/AnalysisLoadingPage.jsx';
import { ReportContainerPage } from '../components/pages/ReportContainerPage.jsx';

import Particles from '../components/animations/Particles.jsx';
import '../styles/layout/MainLayout.css';

export function AppRoutes({ report, onSubmitDetails, onLoadingComplete }) {
  const location = useLocation();
  const isAnalysis = location.pathname === '/loading';

  return (
    <div className="main-layout">
      <div className={`particles-background-container ${isAnalysis ? 'bg-void' : 'bg-emerald'}`}>
        <Particles
          particleColors={['#ffffff', '#34D399', '#FF8800']}
          particleCount={300}
          particleSpread={15}
          speed={0.15}
          particleBaseSize={300}
          sizeRandomness={1}
          moveParticlesOnHover={true}
          particleHoverFactor={1.5}
          alphaParticles={true}
          cameraDistance={20}
          disableRotation={false}
        />
      </div>
      <main className="main-layout-content">
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

        </Routes>
      </main>
    </div>
  );
}
