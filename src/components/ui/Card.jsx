import React from 'react';
import { motion } from 'motion/react';
import '../../styles/ui/Card.css';

export function Card({ 
  children, 
  variant = 'standard', 
  className = '', 
  onClick,
  hoverable = false,
  animated = true,
  ...props 
}) {
  const CardComponent = animated ? motion.div : 'div';

  const animationProps = animated ? {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.4, ease: "easeOut" }
  } : {};

  return (
    <CardComponent 
      className={`app-card card--${variant} ${hoverable ? 'card--hoverable' : ''} ${className}`}
      onClick={onClick}
      {...animationProps}
      {...props}
    >
      {children}
    </CardComponent>
  );
}
