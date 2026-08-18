import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { FormPage } from '../components/pages/FormPage.jsx';
import { AnalysisLoadingPage } from '../components/pages/AnalysisLoadingPage.jsx';
import { ReportLayout } from '../components/pages/ReportLayout.jsx';
import { WelcomePage } from '../components/pages/WelcomePage.jsx';
import { AstrologyDetailsPage } from '../components/pages/AstrologyDetailsPage.jsx';
import { GemstonePage } from '../components/pages/GemstonePage.jsx';
import { GemstoneAvoidPage } from '../components/pages/GemstoneAvoidPage.jsx';
import { DashaTransitPage } from '../components/pages/DashaTransitPage.jsx';
import { WhyThisReportPage } from '../components/pages/WhyThisReportPage.jsx';
import { PremiumPage } from '../components/pages/PremiumPage.jsx';
import { MaintenancePage } from '../components/pages/MaintenancePage.jsx';

import Particles from '../components/animations/Particles.jsx';
import '../styles/layout/MainLayout.css';

export function AppRoutes({ report, onSubmitDetails }) {
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
            element={<AnalysisLoadingPage onSubmitDetails={onSubmitDetails} />}
          />

          <Route path="/error" element={<MaintenancePage />} />

          <Route element={<ReportLayout report={report} />}>
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/lagna" element={<AstrologyDetailsPage />} />
            <Route path="/primary-gem" element={<GemstonePage />} />
            <Route path="/gems-avoid" element={<GemstoneAvoidPage />} />
            <Route path="/dasha-transit" element={<DashaTransitPage />} />
            <Route path="/why-report" element={<WhyThisReportPage />} />
            {/* <Route path="/premium" element={<PremiumPage />} /> */}
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
