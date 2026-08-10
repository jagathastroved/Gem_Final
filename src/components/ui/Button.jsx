import React from 'react';
import { motion } from 'motion/react';
import '../../styles/components/Button.css';

export function Button({ 
  children, 
  variant = 'emerald', 
  size = 'md', 
  fullWidth = false, 
  onClick, 
  type = 'button',
  disabled = false,
  className = '',
  icon: Icon,
  pulse = false
}) {
  return (
    <motion.button
      type={type}
      className={`app-btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full' : ''} ${pulse ? 'btn--pulse' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.015 }}
      whileTap={{ scale: disabled ? 1 : 0.985 }}
    >
      <span>{children}</span>
      {Icon && <Icon className="btn-icon" />}
    </motion.button>
  );
}
