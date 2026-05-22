import React from 'react';
import GlassCard from './GlassCard';

export default function SynopsisSection({ synopsisData }) {
  return (
    <div 
      role="tabpanel" 
      id="synopsis-panel" 
      aria-labelledby="synopsis-tab"
    >
      {synopsisData.map((act, idx) => (
        <GlassCard 
          key={idx} 
          className={`animate-fade-in-up delay-${Math.min(idx + 1, 5)}`}
        >
          <span className="act-title">{act.act}</span>
          <p className="act-text">{act.text}</p>
        </GlassCard>
      ))}
    </div>
  );
}
