import React, { useState } from 'react';
import GlassCard from './GlassCard';

export default function CastSection({ principals, corpsDeBallet }) {
  const [showAllCorps, setShowAllCorps] = useState(false);
  const initialCorpsSize = 8;

  return (
    <div 
      role="tabpanel" 
      id="cast-panel" 
      aria-labelledby="cast-tab"
      style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
    >
      {/* Primeros Bailarines */}
      <section className="animate-fade-in-up delay-1">
        <h3 className="section-heading">Primeros Bailarines</h3>
        <div className="cast-grid">
          {principals.map((person, idx) => (
            <GlassCard key={idx} className="principal-card">
              <img 
                src={person.image} 
                alt={`Retrato de ${person.name}`} 
                loading="lazy" 
                className="principal-avatar"
                width="52"
                height="52"
              />
              <div className="principal-info">
                <span className="principal-role">{person.role}</span>
                <span className="principal-name">{person.name}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Cuerpo de Baile */}
      <section className="animate-fade-in-up delay-2">
        <h3 className="section-heading">Cuerpo de Baile</h3>
        <GlassCard>
          <div className="corps-container">
            {(showAllCorps ? corpsDeBallet : corpsDeBallet.slice(0, initialCorpsSize)).map((dancer, idx) => (
              <span key={idx} className="dancer-tag">
                {dancer.name}
              </span>
            ))}
          </div>
          {!showAllCorps && corpsDeBallet.length > initialCorpsSize && (
            <button 
              onClick={() => setShowAllCorps(true)}
              className="expand-button"
              aria-expanded={showAllCorps}
            >
              Ver {corpsDeBallet.length - initialCorpsSize} bailarines más
            </button>
          )}
        </GlassCard>
      </section>
    </div>
  );
}
