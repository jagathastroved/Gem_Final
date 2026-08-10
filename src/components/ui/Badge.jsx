import React from 'react';
import '../../styles/components/Badge.css';

export function NumberBadge({ number }) {
  return (
    <span className="number-badge">
      {number}
    </span>
  );
}

export function StatusBadge({ type = 'recommended', children }) {
  return (
    <span className={`status-badge status-badge--${type}`}>
      {children}
    </span>
  );
}
