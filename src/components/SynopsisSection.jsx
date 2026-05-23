import React, { useState } from 'react';
import GlassCard from './GlassCard';
import useScrollReveal from '../utils/useScrollReveal';

export default function SynopsisSection({ synopsisData }) {
  const [activeAct, setActiveAct] = useState(0);
  const [revealRef, isRevealed] = useScrollReveal();

  const lineWidth = activeAct * 50;

  return (
    <div 
      ref={revealRef}
      role="tabpanel" 
      id="synopsis-panel" 
      aria-labelledby="synopsis-tab"
      className={`timeline-wrapper reveal-element ${isRevealed ? 'revealed' : ''}`}
    >
      {/* Interactive Horizontal Timeline Navigation */}
      <div className="timeline-nav" aria-label="Línea de tiempo de los actos">
        <div 
          className="timeline-nav-active-line"
          style={{ width: `calc(${lineWidth}% - 8px)` }}
          aria-hidden="true"
        ></div>

        {synopsisData.map((act, idx) => (
          <button
            key={idx}
            onClick={() => setActiveAct(idx)}
            className={`timeline-node ${activeAct === idx ? 'active' : ''}`}
            aria-label={`Ver sinopsis del ${act.act}`}
            aria-selected={activeAct === idx}
            type="button"
          >
            {idx + 1}
            <span className="timeline-node-label">{act.act}</span>
          </button>
        ))}
      </div>

      {/* Slide-in Act Text Panel */}
      <div className="synopsis-card-container">
        <GlassCard 
          key={activeAct} 
          className="synopsis-slide-enter"
          style={{ minHeight: '180px' }}
        >
          <span className="act-title" style={{ fontSize: '0.8rem', color: 'var(--color-rose-400)', fontWeight: 700 }}>
            {synopsisData[activeAct].act}
          </span>
          <p className="act-text" style={{ marginTop: '8px' }}>
            {synopsisData[activeAct].text}
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
