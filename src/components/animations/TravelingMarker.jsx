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
          initial={{ left: "0%" }}
          whileInView={{ left: ["0%", "100%", "0%"] }}
          viewport={{ once: false }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
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
        initial={{ top: "0%" }}
        whileInView={{ top: ["0%", "100%", "0%"] }}
        viewport={{ once: false }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="traveling-inner-dot" />
      </motion.div>
    </div>
  );
}
