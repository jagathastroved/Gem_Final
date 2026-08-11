import React from 'react';
import { motion } from 'motion/react';
import '../../styles/animations/GemstoneMaterialize.css';

export function GemstoneMaterialize({ gemType = 'emerald', name = 'Emerald' }) {
  const getGemColors = () => {
    switch (gemType) {
      case 'coral':
      case 'Red Coral':
        return {
          primary: '#D1483F',
          secondary: '#E5635A',
          dark: '#932720',
          glow: 'rgba(209, 72, 63, 0.4)',
          shape: 'oval'
        };
      case 'yellow_sapphire':
      case 'Yellow Sapphire':
        return {
          primary: '#E5A93C',
          secondary: '#F5C26B',
          dark: '#B07817',
          glow: 'rgba(229, 169, 60, 0.4)',
          shape: 'cushion'
        };
      case 'cats_eye':
      case "Cat's Eye":
        return {
          primary: '#8C7A3E',
          secondary: '#C2B068',
          dark: '#544820',
          glow: 'rgba(140, 122, 62, 0.4)',
          shape: 'oval-line'
        };
      default:
        return {
          primary: '#1F7A4D',
          secondary: '#42A873',
          dark: '#0E4D2E',
          glow: 'rgba(31, 122, 77, 0.4)',
          shape: 'emerald-cut'
        };
    }
  };

  const colors = getGemColors();

  return (
    <div className="gem-materialize-wrap">
      <div className="gem-aura" style={{ background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)` }} />
      
      <motion.div 
        className="gem-pedestal"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <svg viewBox="0 0 160 160" className="gem-illustration-svg">
          <defs>
            <filter id={`glow-${gemType}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            <linearGradient id={`facetGrad-${gemType}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.secondary} />
              <stop offset="60%" stopColor={colors.primary} />
              <stop offset="100%" stopColor={colors.dark} />
            </linearGradient>

            <linearGradient id="pedestalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FBF3E3" />
              <stop offset="100%" stopColor="#ECE6D8" />
            </linearGradient>
          </defs>

          {/* Pedestal Base */}
          <ellipse cx="80" cy="135" rx="50" ry="12" fill="url(#pedestalGrad)" stroke="#C8934A" strokeWidth="1.5" />
          <ellipse cx="80" cy="130" rx="42" ry="9" fill="#FFF" stroke="#E0D5BE" strokeWidth="1" />

          {/* Gemstone Render */}
          {colors.shape === 'emerald-cut' && (
            <g filter={`url(#glow-${gemType})`}>
              {/* Outer Emerald Cut Octagon */}
              <polygon points="45,30 115,30 140,55 140,105 115,130 45,130 20,105 20,55" fill={`url(#facetGrad-${gemType})`} stroke="#A8F0C6" strokeWidth="1.5" />
              {/* Inner Facet Lines */}
              <polygon points="52,40 108,40 128,60 128,100 108,120 52,120 32,100 32,60" fill={colors.primary} opacity="0.8" />
              <polygon points="60,50 100,50 115,65 115,95 100,110 60,110 45,95 45,65" fill={colors.secondary} opacity="0.9" />
              {/* Table Top Facet */}
              <polygon points="62,52 98,52 110,64 110,96 98,108 62,108 50,96 50,64" fill="#A8F0C6" opacity="0.85" />
            </g>
          )}

          {colors.shape === 'oval' && (
            <g filter={`url(#glow-${gemType})`}>
              <ellipse cx="80" cy="78" rx="46" ry="38" fill={`url(#facetGrad-${gemType})`} stroke="#F8B2AC" strokeWidth="1.5" />
              <ellipse cx="80" cy="74" rx="36" ry="28" fill={colors.secondary} opacity="0.75" />
              <ellipse cx="76" cy="70" rx="24" ry="18" fill="#FFD1CE" opacity="0.6" />
            </g>
          )}

          {colors.shape === 'cushion' && (
            <g filter={`url(#glow-${gemType})`}>
              <rect x="36" y="36" width="88" height="88" rx="20" fill={`url(#facetGrad-${gemType})`} stroke="#FCE2B6" strokeWidth="1.5" />
              <rect x="46" y="46" width="68" height="68" rx="14" fill={colors.secondary} opacity="0.8" />
              <rect x="56" y="56" width="48" height="48" rx="10" fill="#FFF2D4" opacity="0.7" />
            </g>
          )}

          {colors.shape === 'oval-line' && (
            <g filter={`url(#glow-${gemType})`}>
              <ellipse cx="80" cy="78" rx="44" ry="36" fill={`url(#facetGrad-${gemType})`} stroke="#D8CA94" strokeWidth="1.5" />
              <line x1="80" y1="42" x2="80" y2="114" stroke="#FFF" strokeWidth="3.5" strokeLinecap="round" opacity="0.9" />
            </g>
          )}
        </svg>
      </motion.div>
    </div>
  );
}
