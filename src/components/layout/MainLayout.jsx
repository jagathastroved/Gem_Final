import React from 'react';
import { useLocation } from 'react-router-dom';
import Particles from '../animations/Particles.jsx';
import '../../styles/layout/MainLayout.css';

export function MainLayout({ children }) {
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
        {children}
      </main>
    </div>
  );
}
