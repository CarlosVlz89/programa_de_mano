import React, { useState, useEffect } from 'react';
import GlassCard from './GlassCard';
import useScrollReveal from '../utils/useScrollReveal';

const seedMessages = [
  {
    id: 1,
    name: "Sofía Robles",
    message: "¡Qué absoluto deleite ver esta puesta en escena al aire libre! Mateo Silva parece flotar en sus saltos y la orquesta suena espectacular. ¡Felicitaciones a todo el elenco! 🩰✨",
    emoji: "🩰",
    date: "Hace 10 min"
  },
  {
    id: 2,
    name: "Carlos Gutiérrez",
    message: "¡Impresionante la fuerza escénica de Isabella Rossi! Se me erizó la piel en la escena final de la cripta. Una Julieta inolvidable. 💐👏👏",
    emoji: "💐",
    date: "Hace 35 min"
  },
  {
    id: 3,
    name: "Miguel Alatorre",
    message: "Teobaldo imponente. Dmitry Petrov encarna la furia Capuleto con una fijeza y vigor técnico dignos de aplauso. ¡Bravo! 🎭",
    emoji: "🎭",
    date: "Hace 1 hora"
  }
];

export default function GuestbookSection() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🩰');
  const [particles, setParticles] = useState([]); // Emoji particle state
  
  const emojis = ['🩰', '💐', '👏', '🎭', '❤️'];

  // Scroll Reveal elements
  const [formRef, isFormRevealed] = useScrollReveal();
  const [wallRef, isWallRevealed] = useScrollReveal();

  useEffect(() => {
    const saved = localStorage.getItem('rj_guestbook_messages');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        setMessages(seedMessages);
      }
    } else {
      setMessages(seedMessages);
      localStorage.setItem('rj_guestbook_messages', JSON.stringify(seedMessages));
    }
  }, []);

  const triggerEmojiBurst = (e) => {
    // Generate 18 particles exploding from the submit button center area
    const newParticles = Array.from({ length: 18 }).map((_, i) => {
      const id = Date.now() + i;
      
      // Random physics targets
      const tx = (Math.random() - 0.5) * 320; // horizontal fly range (-160px to 160px)
      const ty = -300 - Math.random() * 250;  // vertical upward range (-300px to -550px)
      const rot = 180 + Math.random() * 540;   // random 3D spin rotation (degrees)
      const scale = 0.3 + Math.random() * 0.6; // random target scale ratio
      const duration = 0.8 + Math.random() * 0.4; // random duration in seconds

      return {
        id,
        emoji: selectedEmoji,
        tx,
        ty,
        rot,
        scale,
        duration,
        // Center position near the click coordinate or relative to button
        x: e.clientX ? `${e.clientX}px` : '50%',
        y: e.clientY ? `${e.clientY}px` : '75%'
      };
    });

    setParticles(newParticles);
    
    // Auto cleanup after particles finish flight
    setTimeout(() => {
      setParticles([]);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newNote = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      emoji: selectedEmoji,
      date: "Hace un momento"
    };

    const updated = [newNote, ...messages];
    setMessages(updated);
    localStorage.setItem('rj_guestbook_messages', JSON.stringify(updated));

    // Trigger the emoji explosion
    triggerEmojiBurst(e);

    // Reset Form
    setName('');
    setMessage('');
    setSelectedEmoji('🩰');
  };

  return (
    <div 
      role="tabpanel" 
      id="guestbook-panel" 
      aria-labelledby="guestbook-tab"
      className="guestbook-wrapper"
    >
      {/* Form Card with Scroll Reveal */}
      <div ref={formRef} className={`reveal-element ${isFormRevealed ? 'revealed' : ''}`}>
        <GlassCard className="!p-6">
          <h3 className="form-title">Escribir una dedicatoria</h3>
          <form onSubmit={handleSubmit}>
            
            <input 
              type="text" 
              placeholder="Tu Nombre" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="guestbook-input"
              maxLength="40"
              required
              aria-label="Tu nombre completo"
            />

            <textarea 
              placeholder="Escribe tu mensaje de apoyo al elenco..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="guestbook-input"
              rows="3"
              maxLength="200"
              required
              aria-label="Mensaje de apoyo"
              style={{ resize: 'none' }}
            />

            {/* Emoji Selector */}
            <span className="emoji-selector-label">Dedicar emoción</span>
            <div className="emoji-selector" role="radiogroup" aria-label="Dedicar un emoji al elenco">
              {emojis.map((emoji) => (
                <button
                  type="button"
                  key={emoji}
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`emoji-option ${selectedEmoji === emoji ? 'selected' : ''}`}
                  role="radio"
                  aria-checked={selectedEmoji === emoji}
                  aria-label={`Seleccionar emoji ${emoji}`}
                >
                  {emoji}
                </button>
              ))}
            </div>

            <button 
              type="submit" 
              className="submit-btn"
            >
              Firmar Libro de Oro
            </button>
          </form>
        </GlassCard>
      </div>

      {/* Messages Feed with Scroll Reveal */}
      <div 
        ref={wallRef} 
        className={`messages-wall reveal-element ${isWallRevealed ? 'revealed' : ''}`}
      >
        <h4 className="section-heading" style={{ fontSize: '1.1rem', margin: '4px 0 4px 4px' }}>Dedicatorias del Público</h4>
        {messages.map((item) => (
          <div key={item.id} className="guestbook-note-container">
            <div className="guestbook-note">
              <div className="note-header">
                <span className="note-author">{item.name}</span>
                <span className="note-emoji" aria-hidden="true">{item.emoji}</span>
              </div>
              <p className="note-msg">{item.message}</p>
              <span className="note-date">{item.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Render Emoji Burst Particles Overlay */}
      {particles.map((p) => (
        <span 
          key={p.id}
          className="burst-particle"
          style={{
            left: p.x,
            top: p.y,
            transformOrigin: 'center center',
            animation: `particle-fly-up ${p.duration}s cubic-bezier(0.1, 0.8, 0.25, 1) forwards`,
            '--tx': `${p.tx}px`,
            '--ty': `${p.ty}px`,
            '--rot': `${p.rot}deg`,
            '--target-scale': p.scale
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
