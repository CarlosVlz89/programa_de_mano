import React from 'react';
import GlassCard from './GlassCard';

export default function CreditsSection() {
  return (
    <div 
      role="tabpanel" 
      id="credits-panel" 
      aria-labelledby="credits-tab"
      className="animate-fade-in-up delay-1"
    >
      <GlassCard>
        <div className="credit-item">
          <span className="credit-role">Música</span>
          <span className="credit-name">Sergei Prokofiev</span>
        </div>
        <div className="credit-item">
          <span className="credit-role">Coreografía</span>
          <span className="credit-name">Sir Kenneth MacMillan</span>
        </div>
        <div className="credit-item">
          <span className="credit-role">Diseño de Vestuario</span>
          <span className="credit-name">Elena Rostova</span>
        </div>
      </GlassCard>
    </div>
  );
}
