import React from 'react';

export default function TabBar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'synopsis', label: 'Sinopsis' },
    { id: 'cast', label: 'Elenco' },
    { id: 'gallery', label: 'Galería' },
    { id: 'guestbook', label: 'Libro' },
    { id: 'credits', label: 'Créditos' }
  ];

  // Find active index to calculate precise sliding indicator transformation
  const activeIndex = tabs.findIndex(tab => tab.id === activeTab);

  return (
    <div className="nav-sticky-wrapper animate-fade-in-up delay-2">
      <nav className="nav-container" role="tablist" aria-label="Secciones principales del programa">
        {/* Sliding indicator pill */}
        <div 
          className="tab-indicator" 
          style={{ transform: `translateX(calc(${activeIndex} * 100%))` }}
          aria-hidden="true"
        ></div>

        {/* Tab Buttons */}
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tab.id}-panel`}
            id={`${tab.id}-tab`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
