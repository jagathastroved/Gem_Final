import React from 'react';
import { NumberBadge } from './Badge.jsx';
import '../../styles/ui/SectionHeader.css';

export function SectionHeader({ title, subtitle, className = '' }) {
  return (
    <div className={`section-header ${className}`}>
      <div className="section-header-title-row">
        <h2>{title}</h2>
      </div>
      {subtitle && <p className="section-header-subtitle">{subtitle}</p>}
    </div>
  );
}
