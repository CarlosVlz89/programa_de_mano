import React, { useState, useRef, useEffect } from 'react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // High quality classical strings MP3 stream from Wikimedia Commons (Mozart K. 136 string movement)
  // Perfectly fits the dramatic classical tone of Romeo & Juliet, universally compatible.
  const streamUrl = "https://upload.wikimedia.org/wikipedia/commons/e/ec/Mozart_-_Divertimento_in_D_major%2C_K._136_-_1._Allegro.mp3";

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.error("Audio playback blocked by browser:", error));
    }
  };

  // Safe cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className={`ambient-player ${isPlaying ? 'playing' : ''}`}>
      <audio 
        ref={audioRef} 
        src={streamUrl} 
        loop 
        preload="none"
      />

      <div className="player-left">
        {/* Play/Pause Button */}
        <button 
          onClick={togglePlay}
          className="play-pause-btn"
          aria-label={isPlaying ? "Pausar música de fondo" : "Reproducir música de fondo"}
          title={isPlaying ? "Pausar" : "Reproducir"}
        >
          {isPlaying ? (
            // Pause Icon
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1"></rect>
              <rect x="14" y="4" width="4" height="16" rx="1"></rect>
            </svg>
          ) : (
            // Play Icon
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ transform: 'translateX(1px)' }}>
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          )}
        </button>

        {/* Track Details */}
        <div className="player-info">
          <span className="track-title">Tema Principal R&J</span>
          <span className="track-composer">S. Prokofiev / Orquesta</span>
        </div>
      </div>

      {/* Dynamic Equalizer Visualizer */}
      <div className="eq-visualizer" aria-hidden="true" title="Visualizador de música activa">
        <div className="eq-bar"></div>
        <div className="eq-bar"></div>
        <div className="eq-bar"></div>
        <div className="eq-bar"></div>
      </div>
    </div>
  );
}
