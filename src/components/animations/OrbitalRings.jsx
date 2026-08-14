import React from 'react';
import { motion } from 'motion/react';
import '../../styles/animations/OrbitalRings.css';

export function OrbitalRings({ progress = 0 }) {
  const dashOffset = 723 - (723 * progress) / 100;

  return (
    <div className="orbital-rings-container">
      {/* Outer Rotating Star Arc */}
      <svg className="orbital-svg" viewBox="0 0 300 300">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3E4C8" />
            <stop offset="50%" stopColor="#C8934A" />
            <stop offset="100%" stopColor="#9E6B28" />
          </linearGradient>
          <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ring 1 - Outer dotted */}
        <circle cx="150" cy="150" r="130" className="ring-dotted" />

        <circle
          cx="150"
          cy="150"
          r="115"
          className="ring-progress-bg"
        />
        <circle
          cx="150"
          cy="150"
          r="115"
          className="ring-progress-bar"
          style={{ 
            strokeDasharray: 2 * Math.PI * 115,
            strokeDashoffset: (2 * Math.PI * 115) - ((2 * Math.PI * 115) * progress) / 100 
          }}
        />

        {/* Ring 3 - Middle Orbit */}
        <circle cx="150" cy="150" r="90" className="ring-solid" />

        {/* Ring 4 - Inner Orbit */}
        <circle cx="150" cy="150" r="65" className="ring-dashed" />
      </svg>

      {/* Orbiting Planets / Nodes */}
      <motion.div 
        className="orbit-layer orbit-layer-1"
        animate={{ rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      >
        <div className="planet planet-gold-lg" />
      </motion.div>

      <motion.div 
        className="orbit-layer orbit-layer-2"
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <div className="planet planet-gold-md" />
        <div className="planet planet-gold-sm" />
      </motion.div>

      {/* Center Emerald Jewel Medallion */}
      <div className="center-jewel-wrapper">
        <div className="sunburst-ring" />
        <div className="emerald-gem-box">
          <svg viewBox="0 0 100 100" className="emerald-svg">
            <polygon 
              points="30,10 70,10 90,30 90,70 70,90 30,90 10,70 10,30" 
              fill="url(#gemGradient)" 
              stroke="#A8F0C6" 
              strokeWidth="2"
            />
            <polygon points="35,20 65,20 80,35 80,65 65,80 35,80 20,65 20,35" fill="#1F7A4D" opacity="0.6" />
            <polygon points="40,30 60,30 70,40 70,60 60,70 40,70 30,60 30,40" fill="#38A169" opacity="0.8" />
            <polygon points="42,32 58,32 68,42 68,58 58,68 42,68 32,58 32,42" fill="#6EE7B7" opacity="0.9" />
            <defs>
              <linearGradient id="gemGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#16613D" />
                <stop offset="50%" stopColor="#1F7A4D" />
                <stop offset="100%" stopColor="#0B3C23" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
