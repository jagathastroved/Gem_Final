import React, { useEffect, useRef } from 'react';
import '../../styles/components/StarfieldBackground.css';

export function StarfieldBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Glowing Cosmic Stars
    const stars = Array.from({ length: 90 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.015 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1
    }));

    // Floating Gemstones with rotation and drift
    const gemColors = [
      { fill: 'rgba(16, 185, 129, 0.45)', stroke: '#10B981', glow: 'rgba(16, 185, 129, 0.8)' },  // Emerald
      { fill: 'rgba(99, 88, 247, 0.45)', stroke: '#818CF8', glow: 'rgba(99, 88, 247, 0.8)' },   // Sapphire
      { fill: 'rgba(239, 68, 68, 0.45)', stroke: '#F87171', glow: 'rgba(239, 68, 68, 0.8)' },   // Ruby
      { fill: 'rgba(245, 158, 11, 0.45)', stroke: '#FBBF24', glow: 'rgba(245, 158, 11, 0.8)' },  // Topaz
      { fill: 'rgba(168, 85, 247, 0.45)', stroke: '#C084FC', glow: 'rgba(168, 85, 247, 0.8)' }   // Amethyst
    ];

    const gems = Array.from({ length: 18 }, () => {
      const colorScheme = gemColors[Math.floor(Math.random() * gemColors.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 18 + 12,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.012,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        color: colorScheme,
        sides: [4, 5, 6][Math.floor(Math.random() * 3)] // Diamond, Pentagonal, Hexagonal crystal
      };
    });

    const drawGemPolygon = (ctx, x, y, radius, sides, angle) => {
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const a = angle + (i * 2 * Math.PI) / sides;
        const px = x + radius * Math.cos(a);
        const py = y + radius * Math.sin(a);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Stars
      stars.forEach((star) => {
        star.alpha += star.speed * star.direction;
        if (star.alpha > 0.95) {
          star.alpha = 0.95;
          star.direction = -1;
        } else if (star.alpha < 0.1) {
          star.alpha = 0.1;
          star.direction = 1;
        }

        ctx.save();
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        if (star.size > 1.6) {
          ctx.strokeStyle = `rgba(165, 180, 252, ${star.alpha * 0.6})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(star.x - 4, star.y);
          ctx.lineTo(star.x + 4, star.y);
          ctx.moveTo(star.x, star.y - 4);
          ctx.lineTo(star.x, star.y + 4);
          ctx.stroke();
        }
        ctx.restore();
      });

      // Render Floating Animated Gemstones
      gems.forEach((gem) => {
        gem.x += gem.vx;
        gem.y += gem.vy;
        gem.rotation += gem.rotSpeed;

        if (gem.x < -30) gem.x = width + 30;
        if (gem.x > width + 30) gem.x = -30;
        if (gem.y < -30) gem.y = height + 30;
        if (gem.y > height + 30) gem.y = -30;

        ctx.save();
        ctx.shadowColor = gem.color.glow;
        ctx.shadowBlur = 16;
        ctx.fillStyle = gem.color.fill;
        ctx.strokeStyle = gem.color.stroke;
        ctx.lineWidth = 1.5;

        drawGemPolygon(ctx, gem.x, gem.y, gem.size, gem.sides, gem.rotation);
        ctx.fill();
        ctx.stroke();

        // Inner Facet lines for 3D gem effect
        ctx.beginPath();
        ctx.arc(gem.x, gem.y, gem.size * 0.35, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield-canvas" />;
}

