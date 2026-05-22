import React, { useState } from 'react';
import ScrollProgress from './components/ScrollProgress';
import LiquidBackground from './components/LiquidBackground';
import Header from './components/Header';
import TabBar from './components/TabBar';
import SynopsisSection from './components/SynopsisSection';
import CastSection from './components/CastSection';
import CreditsSection from './components/CreditsSection';

// Data Model
const playbillData = {
  title: "Romeo & Julieta",
  subtitle: "Ballet en Tres Actos",
  company: "Compañía Nacional de Danza",
  date: "Temporada de Otoño 2026",
  heroImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
  synopsis: [
    { act: "Acto I", text: "En Verona, la rivalidad entre las familias Montesco y Capuleto tiñe las calles de sangre. Durante un baile de máscaras en la mansión Capuleto, Romeo (un Montesco) conoce a Julieta. Se enamoran perdidamente a primera vista, sellando su trágico destino." },
    { act: "Acto II", text: "Con la ayuda de Fray Lorenzo, los amantes se casan en secreto. Sin embargo, la tensión estalla: Teobaldo asesina a Mercucio, el mejor amigo de Romeo. Ciego de dolor, Romeo mata a Teobaldo y es desterrado de Verona." },
    { act: "Acto III", text: "Obligada a casarse con el Conde Paris, Julieta bebe una poción que simula su muerte para escapar. El mensaje no llega a Romeo, quien, al encontrarla 'muerta', bebe un veneno letal. Julieta despierta, ve a su amado sin vida y decide unirse a él trágicamente." }
  ],
  principals: [
    { role: "Julieta", name: "Isabella Rossi", image: "https://i.pravatar.cc/150?img=47" },
    { role: "Romeo", name: "Mateo Silva", image: "https://i.pravatar.cc/150?img=11" },
    { role: "Mercucio", name: "Alejandro Vargas", image: "https://i.pravatar.cc/150?img=60" },
    { role: "Teobaldo", name: "Dmitry Petrov", image: "https://i.pravatar.cc/150?img=61" },
    { role: "Fray Lorenzo", name: "Carlos Mendoza", image: "https://i.pravatar.cc/150?img=68" },
  ],
  corpsDeBallet: Array.from({ length: 30 }, (_, i) => ({
    name: `Bailarín${i % 2 === 0 ? 'a' : ''} ${i + 1}`
  }))
};

export default function App() {
  const [activeTab, setActiveTab] = useState('synopsis');

  return (
    <div className="mobile-viewport">
      {/* Barra de progreso superior */}
      <ScrollProgress />

      {/* Fondo Fluido Animado */}
      <LiquidBackground />

      {/* Cabecera / Hero Cover */}
      <Header playbillData={playbillData} />

      {/* Navegador por Pestañas */}
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Contenedor Principal de Secciones */}
      <main>
        {activeTab === 'synopsis' && (
          <SynopsisSection synopsisData={playbillData.synopsis} />
        )}
        {activeTab === 'cast' && (
          <CastSection 
            principals={playbillData.principals} 
            corpsDeBallet={playbillData.corpsDeBallet} 
          />
        )}
        {activeTab === 'credits' && (
          <CreditsSection />
        )}
      </main>
    </div>
  );
}
