import React, { useState } from 'react';

export default function Header({ playbillData }) {
  const [showToast, setShowToast] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: playbillData.title,
          text: `Te invito a ver el programa de mano oficial de "${playbillData.title}" - ${playbillData.company}`,
          url: window.location.href,
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error al compartir:', error);
        }
      }
    } else {
      // Fallback: Copy link to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500); // Hide toast after 2.5 seconds
      } catch (err) {
        console.error('No se pudo copiar el enlace:', err);
      }
    }
  };

  return (
    <>
      {/* Fondo Hero */}
      <div className="hero-image-wrapper">
        <img 
          src={playbillData.heroImage} 
          alt={`Ballet ${playbillData.title}`} 
          className="hero-image"
          loading="eager"
        />
        <div className="hero-gradient" aria-hidden="true"></div>
      </div>

      {/* Contenido Cabecera */}
      <header className="header-text animate-fade-in-up delay-1">
        {/* Botón de Compartir */}
        <button 
          onClick={handleShare}
          className="share-button"
          aria-label="Compartir este programa de mano"
          title="Compartir programa"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
        </button>

        <span className="company-tag">{playbillData.company}</span>
        <h1 className="playbill-title">{playbillData.title}</h1>
        <p className="playbill-subtitle">{playbillData.subtitle}</p>
      </header>

      {/* Toast Alert Fallback */}
      <div className={`toast ${showToast ? 'show' : ''}`} role="alert" aria-live="polite">
        Enlace copiado al portapapeles 📋
      </div>
    </>
  );
}
