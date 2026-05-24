import React, { useState, useRef } from 'react';

export default function GlassCard({ children, className = '', style = {} }) {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});

  // 3D Perspective Tilt on mouse hover (Desktop)
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // cursor X relative to card
    const y = e.clientY - rect.top;  // cursor Y relative to card

    // Compute tilt angles (range: -12 to 12 degrees)
    const rx = -((y - rect.height / 2) / rect.height) * 24;
    const ry = ((x - rect.width / 2) / rect.width) * 24;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translate3d(0, 0, 8px)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  // Reset 3D perspective smoothly when hover/touch ends
  const handleReset = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)',
      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
    });
  };

  // 3D Perspective Tilt on touch drag (Mobile)
  const handleTouchMove = (e) => {
    const card = cardRef.current;
    if (!card || e.touches.length === 0) return;

    const rect = card.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    // Guard: stop tilt if finger leaves the card surface
    if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
      handleReset();
      return;
    }

    const rx = -((y - rect.height / 2) / rect.height) * 20;
    const ry = ((x - rect.width / 2) / rect.width) * 20;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translate3d(0, 0, 8px)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleReset}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleReset}
      className={`glass-panel ${className}`} 
      style={{ ...style, ...tiltStyle }}
    >
      {children}
    </div>
  );
}
