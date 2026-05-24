import React, { useState } from 'react';
import GlassCard from './GlassCard';
import useScrollReveal from '../utils/useScrollReveal';

export default function SynopsisSection({ synopsisData }) {
  const [activeAct, setActiveAct] = useState(0);
  const [revealRef, isRevealed] = useScrollReveal();

  // Progress line width: 0% -> 50% -> 100%
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

      {/* 🎪 3D Scenic Stage Cylinder Carousel */}
      <div className="stage-3d-scene" aria-live="polite">
        <div 
          className="stage-3d-carousel"
          style={{ transform: `rotateY(${activeAct * -120}deg)` }}
        >
          {synopsisData.map((act, idx) => (
            <div 
              key={idx}
              className={`stage-3d-card ${activeAct === idx ? 'active' : 'inactive'}`}
              role="group"
              aria-label={`Argumento del ${act.act}`}
              aria-hidden={activeAct !== idx}
            >
              <GlassCard style={{ height: '100%', padding: '20px' }}>
                <span className="act-title" style={{ fontSize: '0.8rem', color: 'var(--color-rose-400)', fontWeight: 700 }}>
                  {act.act}
                </span>
                <p className="act-text" style={{ marginTop: '8px', fontSize: '0.88rem', lineHeight: '1.55' }}>
                  {act.text}
                </p>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
