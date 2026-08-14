import React from 'react';
import { motion } from 'motion/react';
import emeraldImg from '../../assets/gemStone_images/emerald.png';
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
          <img 
            src={emeraldImg} 
            alt="Emerald Gemstone" 
            className="emerald-img"
          />
        </div>
      </div>
    </div>
  );
}
