import React from 'react';
import { motion } from 'motion/react';
import '../../styles/animations/TravelingMarker.css';

export function TravelingMarker({ isHorizontal = false }) {
  if (isHorizontal) {
    return (
      <div className="traveling-line-container horizontal">
        <div className="horizontal-timeline-line" />
        <motion.div 
          className="traveling-planet-node horizontal"
          initial={{ x: 0 }}
          whileInView={{ x: [0, 150, 300] }}
          viewport={{ once: false }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="traveling-inner-dot" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="traveling-line-container vertical">
      <div className="vertical-timeline-line" />
      <motion.div 
        className="traveling-planet-node vertical"
        initial={{ y: 0 }}
        whileInView={{ y: [0, 80, 160] }}
        viewport={{ once: false }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="traveling-inner-dot" />
      </motion.div>
    </div>
  );
}
