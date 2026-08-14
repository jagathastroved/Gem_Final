import React from 'react';
import { motion } from 'motion/react';
import '../../styles/animations/GemstoneMaterialize.css';

// Import images
import emeraldImg from '../../assets/gemStone_images/emerald.png';
import redCoralImg from '../../assets/gemStone_images/red_coral.png';
import yellowSapphireImg from '../../assets/gemStone_images/yellow-sapphire.png';
import catsEyeImg from '../../assets/gemStone_images/cat_eye.png';
import blueSapphireImg from '../../assets/gemStone_images/blue-sapphire.png';
import rubyImg from '../../assets/gemStone_images/ruby.png';
import diamondImg from '../../assets/gemStone_images/diamond.png';
import pearlImg from '../../assets/gemStone_images/pearl.png';
import hessoniteGarnetImg from '../../assets/gemStone_images/hessonite-garnet.png';

export function GemstoneMaterialize({ gemType = 'emerald', name = 'Emerald', disableFloat = false }) {
  const getGemDetails = () => {
    switch (gemType.toLowerCase().replace(/ /g, '_')) {
      case 'coral':
      case 'red_coral':
        return { src: redCoralImg, glow: 'rgba(209, 72, 63, 0.4)' };
      case 'yellow_sapphire':
        return { src: yellowSapphireImg, glow: 'rgba(229, 169, 60, 0.4)' };
      case 'cats_eye':
      case "cat's_eye":
        return { src: catsEyeImg, glow: 'rgba(140, 122, 62, 0.4)' };
      case 'blue_sapphire':
        return { src: blueSapphireImg, glow: 'rgba(43, 76, 126, 0.4)' };
      case 'ruby':
        return { src: rubyImg, glow: 'rgba(224, 17, 95, 0.4)' };
      case 'diamond':
        return { src: diamondImg, glow: 'rgba(185, 242, 255, 0.4)' };
      case 'pearl':
        return { src: pearlImg, glow: 'rgba(234, 230, 223, 0.4)' };
      case 'hessonite':
      case 'hessonite_garnet':
        return { src: hessoniteGarnetImg, glow: 'rgba(196, 98, 16, 0.4)' };
      case 'emerald':
      default:
        return { src: emeraldImg, glow: 'rgba(31, 122, 77, 0.4)' };
    }
  };

  const { src, glow } = getGemDetails();

  return (
    <div className="gem-materialize-wrap">
      <div className="gem-aura" style={{ background: `radial-gradient(circle, ${glow} 0%, transparent 70%)` }} />
      
      <motion.div 
        className="gem-pedestal"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <img 
            src={src} 
            alt={name} 
            className={disableFloat ? "" : "gem-floating-img"}
            style={{ width: '100%', maxWidth: '100px', height: 'auto', zIndex: 2, objectFit: 'contain' }} 
          />
          {!disableFloat && <div className="gem-floor-shadow" />}
        </div>
      </motion.div>
    </div>
  );
}
