import React from 'react';

export default function TabBar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'synopsis', label: 'Sinopsis' },
    { id: 'cast', label: 'Elenco' },
    { id: 'credits', label: 'Créditos' }
  ];

  return (
    <div className="nav-sticky-wrapper animate-fade-in-up delay-2">
      <nav className="nav-container" role="tablist" aria-label="Secciones del programa de mano">
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
