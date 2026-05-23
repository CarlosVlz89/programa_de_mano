import React, { useState } from 'react';
import GlassCard from './GlassCard';

export default function CreditsSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitted(true);
    setEmail('');
  };

  return (
    <div 
      role="tabpanel" 
      id="credits-panel" 
      aria-labelledby="credits-tab"
      style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
    >
      {/* Equipo Creativo */}
      <section className="animate-fade-in-up delay-1">
        <h3 className="section-heading">Equipo Creativo</h3>
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
            <span className="credit-role">Director Artístico</span>
            <span className="credit-name">Cuauhtémoc Nájera</span>
          </div>
          <div className="credit-item">
            <span className="credit-role">Diseño de Escenografía & Iluminación</span>
            <span className="credit-name">Emilio Toledo</span>
          </div>
          <div className="credit-item">
            <span className="credit-role">Diseño de Vestuario</span>
            <span className="credit-name">Elena Rostova</span>
          </div>
        </GlassCard>
      </section>

      {/* Equipo Técnico y Producción (El Backstage) */}
      <section className="animate-fade-in-up delay-2">
        <h3 className="section-heading">Equipo Técnico & Backstage</h3>
        <GlassCard>
          <div className="credit-item">
            <span className="credit-role">Director de Producción</span>
            <span className="credit-name">Gerardo Estrada</span>
          </div>
          <div className="credit-item">
            <span className="credit-role">Stage Manager / Traspunte Principal</span>
            <span className="credit-name">Mariana Silva</span>
          </div>
          <div className="credit-item">
            <span className="credit-role">Jefe de Foro & Iluminación</span>
            <span className="credit-name">Roberto Valencia</span>
          </div>
          <div className="credit-item">
            <span className="credit-role">Coordinador de Audio y Efectos Ambientales</span>
            <span className="credit-name">Luis Fernando Rizo</span>
          </div>
          <div className="credit-item">
            <span className="credit-role">Sastrería & Utilería</span>
            <span className="credit-name">Amelia Vargas, Pedro Ruiz</span>
          </div>
        </GlassCard>
      </section>

      {/* Créditos Institucionales y Patrocinadores (El Dinero) */}
      <section className="animate-fade-in-up delay-3">
        <h3 className="section-heading">Instituciones & Patrocinadores</h3>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '-8px 0 16px 4px' }}>
          Obra realizada con el apoyo de fondos públicos y marcas patrocinadoras oficiales.
        </p>
        <div className="sponsors-grid">
          
          {/* Secretaría de Cultura SVG Logo Placeholder */}
          <div className="sponsor-logo-card" title="Secretaría de Cultura">
            <svg viewBox="0 0 100 40" fill="currentColor" aria-hidden="true">
              <path d="M10 5h10v10H10zm0 20h10v10H10zM30 5h10v30H30zM50 5h40v10H50zm0 20h40v10H50z" opacity="0.8"/>
              <text x="50" y="22" fontSize="5" fontWeight="bold" fill="currentColor">SEC. CULTURA</text>
            </svg>
          </div>

          {/* INBAL Museum Crest SVG Logo Placeholder */}
          <div className="sponsor-logo-card" title="INBAL - Instituto Nacional de Bellas Artes y Literatura">
            <svg viewBox="0 0 100 40" fill="currentColor" aria-hidden="true">
              <polygon points="10,35 15,5 25,5 30,35" opacity="0.8" />
              <polygon points="35,35 40,5 50,5 55,35" opacity="0.8" />
              <rect x="60" y="5" width="30" height="30" rx="3" opacity="0.8" />
              <text x="75" y="22" fontSize="7" fontWeight="900" fill="currentColor" textAnchor="middle">INBAL</text>
            </svg>
          </div>

          {/* Cultura Jalisco SVG Logo Placeholder */}
          <div className="sponsor-logo-card" title="Cultura Jalisco">
            <svg viewBox="0 0 100 40" fill="currentColor" aria-hidden="true">
              <path d="M20,35 C30,35 40,25 40,15 C40,5 20,5 20,5 C20,5 0,5 0,15 C0,25 10,35 20,35 Z" opacity="0.8" />
              <circle cx="20" cy="17" r="6" fill="#000" opacity="0.2"/>
              <text x="55" y="24" fontSize="8" fontWeight="bold" fill="currentColor">JALISCO</text>
            </svg>
          </div>

        </div>
      </section>

      {/* El Embudo de Marketing & Redes (Call to Action) */}
      <section className="animate-fade-in-up delay-4">
        <h3 className="section-heading">Embudo & Promociones</h3>
        
        {/* Next Season Presale Signup Form */}
        <GlassCard className="marketing-newsletter-card">
          {!isSubmitted ? (
            <div>
              <span className="company-tag" style={{ color: 'var(--color-rose-400)', fontSize: '0.65rem' }}>Próximamente / Temporada de Invierno 2026</span>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white', marginBottom: '8px' }}>El Cascanueces 🎄🩰</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 300, marginBottom: '14px', lineHeight: '1.45' }}>
                Regístrate hoy mismo para recibir una alerta y obtener un **código de preventa exclusiva con 20% de descuento** para nuestra próxima gran función de invierno.
              </p>
              <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="guestbook-input"
                  style={{ marginBottom: '0px' }}
                  required
                  aria-label="Registra tu correo para la preventa de El Cascanueces"
                />
                <button type="submit" className="submit-btn" style={{ padding: '12px' }}>
                  Unirme a la Preventa
                </button>
              </form>
            </div>
          ) : (
            <div className="newsletter-success-box">
              <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: '6px' }} aria-hidden="true">🎟️🎄</span>
              <h4 className="newsletter-success-title">¡Registro Completado!</h4>
              <p className="newsletter-success-desc">
                Te has registrado con éxito en nuestro boletín preferente. Te enviaremos tu código de preventa del **20% de descuento** antes que a nadie. ¡Nos vemos en El Cascanueces!
              </p>
            </div>
          )}
        </GlassCard>

        {/* Redes Sociales e Institución */}
        <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'white', margin: '20px 0 10px 4px' }}>Redes Sociales de la Compañía</h4>
        <div className="social-grid">
          
          {/* Instagram direct shortcut button */}
          <a 
            href="https://instagram.com/compañianacionaldedanza" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-btn instagram-btn-glass"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            Instagram
          </a>

          {/* TikTok direct button */}
          <a 
            href="https://tiktok.com/@compañianacionaldedanza" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-btn tiktok-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
            </svg>
            TikTok
          </a>

        </div>

        {/* Audiciones e Información de Contacto */}
        <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'white', margin: '24px 0 10px 4px' }}>Audiciones & Contrataciones</h4>
        <GlassCard>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 300, lineHeight: '1.45', marginBottom: '12px' }}>
            Para audiciones profesionales, contrataciones para eventos privados y vinculación académica con nuestra escuela de artes, ponte en contacto directo con nuestras oficinas:
          </p>
          
          <div className="contact-info-list">
            
            {/* Direct Email link */}
            <a href="mailto:contacto@cndanza.gob.mx" className="contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              contacto@cndanza.gob.mx
            </a>

            {/* Direct Phone link */}
            <a href="tel:+523333333333" className="contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              +52 (33) 3333-3333
            </a>

            {/* Address */}
            <div className="contact-item" style={{ cursor: 'default' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Teatro Degollado, Guadalajara, Jal.</span>
            </div>

          </div>
        </GlassCard>
      </section>

    </div>
  );
}
