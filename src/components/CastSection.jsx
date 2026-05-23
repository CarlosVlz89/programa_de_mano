import React, { useState, useEffect } from 'react';
import GlassCard from './GlassCard';

export default function CastSection({ principals, solistas = [], corpsDeBallet }) {
  const [showAllCorps, setShowAllCorps] = useState(false);
  const [selectedDancer, setSelectedDancer] = useState(null);
  const initialCorpsSize = 8;

  // Listen to Escape key to close the modal (Accessibility Best Practice)
  useEffect(() => {
    if (!selectedDancer) return;
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedDancer(null);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDancer]);

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
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '-8px 0 16px 4px', fontStyle: 'italic' }}>
          * Pulsa sobre un bailarín para conocer su trayectoria.
        </p>
        <div className="cast-grid">
          {principals.map((person, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedDancer(person)}
              style={{ cursor: 'pointer' }}
              role="button"
              aria-haspopup="dialog"
              aria-label={`Ver biografía de ${person.name}, primer bailarín como ${person.role}`}
            >
              <GlassCard className="principal-card">
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
            </div>
          ))}
        </div>
      </section>

      {/* Solistas / Corifeos */}
      {solistas.length > 0 && (
        <section className="animate-fade-in-up delay-2">
          <h3 className="section-heading">Solistas</h3>
          <div className="cast-grid">
            {solistas.map((person, idx) => (
              <GlassCard key={idx} className="principal-card !p-3.5 !mb-0">
                <div className="principal-info" style={{ marginLeft: '4px' }}>
                  <span className="principal-role">{person.role}</span>
                  <span className="principal-name" style={{ fontSize: '0.95rem' }}>{person.name}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>
      )}

      {/* Cuerpo de Baile */}
      <section className="animate-fade-in-up delay-3">
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

      {/* Glassmorphic Biography Modal */}
      {selectedDancer && (
        <div 
          className="modal-overlay" 
          onClick={() => setSelectedDancer(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div 
            className="modal-content-card" 
            onClick={(e) => e.stopPropagation()} // Stop closing when tapping card itself
          >
            {/* Close Button */}
            <button 
              className="modal-close-btn" 
              onClick={() => setSelectedDancer(null)}
              aria-label="Cerrar ventana de detalles"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Modal Header / Avatar */}
            <div className="modal-header">
              <img 
                src={selectedDancer.image} 
                alt={`Retrato oficial de ${selectedDancer.name}`} 
                className="modal-avatar"
              />
              <span className="modal-title-role">{selectedDancer.role}</span>
              <h2 className="modal-title-name" id="modal-title">{selectedDancer.name}</h2>
            </div>

            {/* Modal Body / Bio Text */}
            <div className="modal-body">
              <p className="modal-bio-text">{selectedDancer.bio}</p>
            </div>

            {/* Modal Footer / Instagram button */}
            {selectedDancer.instagram && (
              <div className="modal-footer">
                <a 
                  href={`https://instagram.com/${selectedDancer.instagram}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="instagram-btn"
                  title={`Visitar el perfil de Instagram de ${selectedDancer.name}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }} aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  @{selectedDancer.instagram}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
