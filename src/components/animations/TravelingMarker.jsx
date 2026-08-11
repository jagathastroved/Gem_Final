import React from 'react';
import { motion } from 'motion/react';
import '../../styles/animations/TravelingMarker.css';

export function TravelingMarker({ totalHeight = 240 }) {
  return (
    <div className="traveling-line-container">
      <div className="vertical-timeline-line" />
      <motion.div 
        className="traveling-planet-node"
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
