import React, { useState } from 'react';
import GlassCard from './GlassCard';

export default function SynopsisSection({ synopsisData }) {
  const [activeAct, setActiveAct] = useState(0);

  // Calculate timeline progress bar width: 0 gaps = 0%, 1 gap = 50%, 2 gaps = 100%
  const lineWidth = activeAct * 50;

  return (
    <div 
      role="tabpanel" 
      id="synopsis-panel" 
      aria-labelledby="synopsis-tab"
      className="timeline-wrapper"
    >
      {/* Interactive Horizontal Timeline Navigation */}
      <div className="timeline-nav" aria-label="Línea de tiempo de los actos">
        {/* Glowing active connector line */}
        <div 
          className="timeline-nav-active-line"
          style={{ width: `calc(${lineWidth}% - 8px)` }}
          aria-hidden="true"
        ></div>

        {/* Timeline Nodes */}
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

      {/* Slide-in Dynamic Act Text Panel (Key triggers re-mount for smooth CSS keyframe animation) */}
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
