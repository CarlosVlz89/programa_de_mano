import React, { useState, useEffect } from 'react';
import useScrollReveal from '../utils/useScrollReveal';

const galleryPhotos = [
  {
    id: 0,
    url: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop",
    caption: "El salto trágico de Romeo en el exilio (Acto II)",
    alt: "Bailarín clásico realizando un salto dramático en el escenario"
  },
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    caption: "Paso a dos de Julieta y Romeo en el balcón (Acto I)",
    alt: "Pareja de bailarines de ballet interpretando un paso a dos pasional"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=800&auto=format&fit=crop",
    caption: "Orquesta en vivo interpretando la partitura de Sergei Prokofiev",
    alt: "Primer plano de un violinista de orquesta tocando bajo las luces de la sala"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?q=80&w=800&auto=format&fit=crop",
    caption: "Las intensas luces teatrales bañan Verona en color sangre",
    alt: "Vista en perspectiva de las luces de escenario iluminando un espacio oscuro"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1503095391757-f0fc81426994?q=80&w=800&auto=format&fit=crop",
    caption: "El enfrentamiento a muerte entre Teobaldo y Mercucio (Acto II)",
    alt: "Actores teatrales en pose dramática con vestuario clásico"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=800&auto=format&fit=crop",
    caption: "La desolación de Julieta ante la cripta familiar (Acto III)",
    alt: "Silueta artística de una bailarina clásica sobre fondo oscuro iluminado"
  }
];

export default function GallerySection() {
  const [activePhoto, setActivePhoto] = useState(null);
  const [revealRef, isRevealed] = useScrollReveal();

  // Keyboard navigation hooks inside Lightbox
  useEffect(() => {
    if (activePhoto === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActivePhoto(null);
      } else if (e.key === 'ArrowRight') {
        setActivePhoto((prev) => (prev < galleryPhotos.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowLeft') {
        setActivePhoto((prev) => (prev > 0 ? prev - 1 : galleryPhotos.length - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto]);

  return (
    <div 
      ref={revealRef}
      role="tabpanel" 
      id="gallery-panel" 
      aria-labelledby="gallery-tab"
      className={`reveal-element ${isRevealed ? 'revealed' : ''}`}
    >
      <h3 className="section-heading" style={{ marginBottom: '16px' }}>En Escena</h3>
      
      {/* Photo Grid */}
      <div className="gallery-grid">
        {galleryPhotos.map((photo) => (
          <div 
            key={photo.id}
            onClick={() => setActivePhoto(photo.id)}
            className="gallery-card"
            role="button"
            aria-label={`Ver foto en pantalla completa: ${photo.caption}`}
            aria-haspopup="dialog"
          >
            <img 
              src={photo.url} 
              alt={photo.alt}
              loading="lazy" 
              className="gallery-photo"
            />
            <div className="gallery-overlay-hint" aria-hidden="true">
              <span>Ampliar foto</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Visualizer Overlay */}
      {activePhoto !== null && (
        <div 
          className="lightbox-overlay"
          onClick={() => setActivePhoto(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Visualizador de fotos a pantalla completa"
        >
          {/* Close Button */}
          <button 
            className="lightbox-close-btn" 
            onClick={() => setActivePhoto(null)}
            aria-label="Cerrar visualizador"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Navigation Controls */}
          <button 
            className="lightbox-nav-btn lightbox-nav-prev"
            onClick={(e) => {
              e.stopPropagation();
              setActivePhoto((prev) => (prev > 0 ? prev - 1 : galleryPhotos.length - 1));
            }}
            aria-label="Foto anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button 
            className="lightbox-nav-btn lightbox-nav-next"
            onClick={(e) => {
              e.stopPropagation();
              setActivePhoto((prev) => (prev < galleryPhotos.length - 1 ? prev + 1 : 0));
            }}
            aria-label="Siguiente foto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Image Content Container */}
          <div 
            className="lightbox-content-wrapper"
            onClick={(e) => e.stopPropagation()} // Stop overlay close action on image tap
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <img 
                src={galleryPhotos[activePhoto].url} 
                alt={galleryPhotos[activePhoto].alt} 
                className="lightbox-main-img"
              />
              <p className="lightbox-caption" id="lightbox-desc">
                {galleryPhotos[activePhoto].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
