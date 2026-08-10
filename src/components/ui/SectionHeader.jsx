import React from 'react';
import { NumberBadge } from './Badge.jsx';
import '../../styles/components/SectionHeader.css';

export function SectionHeader({ number, title, subtitle, className = '' }) {
  return (
    <div className={`section-header ${className}`}>
      <div className="section-header-title-row">
        {number && <NumberBadge number={number} />}
        <h2>{title}</h2>
      </div>
      {subtitle && <p className="section-header-subtitle">{subtitle}</p>}
    </div>
  );
}
