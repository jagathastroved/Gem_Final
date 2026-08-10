import React from 'react';
import { motion } from 'motion/react';
import '../../styles/components/ConstellationReveal.css';

export function ConstellationReveal() {
  return (
    <div className="constellation-svg-wrapper">
      <svg className="constellation-svg" viewBox="0 0 800 120" preserveAspectRatio="none">
        <motion.path
          d="M 120,60 Q 400,10 680,60"
          fill="none"
          stroke="#C8934A"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
