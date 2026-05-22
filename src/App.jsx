import React, { useState } from 'react';
import ScrollProgress from './components/ScrollProgress';
import LiquidBackground from './components/LiquidBackground';
import Header from './components/Header';
import TabBar from './components/TabBar';
import SynopsisSection from './components/SynopsisSection';
import CastSection from './components/CastSection';
import CreditsSection from './components/CreditsSection';

// Expanded Data Model with Fictional Bios & Socials
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
    { 
      role: "Julieta", 
      name: "Isabella Rossi", 
      image: "https://i.pravatar.cc/150?img=47",
      bio: "Nacida en Milán, se formó en la Escuela de Ballet del Teatro de La Scala. Se unió a la Compañía en 2021 y fue promovida a Primera Bailarina en 2024. Su interpretación de Julieta ha sido aclamada por su conmovedora madurez dramática, exquisito fraseo musical y ligereza técnica.",
      instagram: "isabella.rossi.ballet"
    },
    { 
      role: "Romeo", 
      name: "Mateo Silva", 
      image: "https://i.pravatar.cc/150?img=11",
      bio: "Originario de Santiago de Chile, comenzó sus estudios a los 9 años. Tras ser becado por el Royal Ballet School de Londres, se incorporó a esta compañía como Primer Bailarín en 2022. Destaca por su potente virtuosismo técnico, saltos ingrávidos y profunda expresividad en roles clásicos románticos.",
      instagram: "mateosilva.dance"
    },
    { 
      role: "Mercucio", 
      name: "Alejandro Vargas", 
      image: "https://i.pravatar.cc/150?img=60",
      bio: "Formado en la Escuela Nacional de Danza clásica. Su desbordante carisma escénico, precisión técnica y velocidad de giro lo convierten en el intérprete idóneo para el dinámico rol de Mercucio, papel que ha defendido con gran éxito durante tres temporadas consecutivas.",
      instagram: "ale_vargas_ballet"
    },
    { 
      role: "Teobaldo", 
      name: "Dmitry Petrov", 
      image: "https://i.pravatar.cc/150?img=61",
      bio: "Graduado con honores de la célebre Academia Vaganova de San Petersburgo. Con un imponente físico y una soberbia presencia escénica, Dmitry personifica la altivez y fiereza dramática del líder Capuleto, fusionando una técnica académica impecable con dotes actorales excepcionales.",
      instagram: "dmitrypetrov.ballet"
    },
    { 
      role: "Fray Lorenzo", 
      name: "Carlos Mendoza", 
      image: "https://i.pravatar.cc/150?img=68",
      bio: "Primer Bailarín de gran trayectoria artística con más de 25 años en los escenarios internacionales. Carlos aporta una conmovedora gravedad escénica, profunda sabiduría gestual y una presencia solemne al vital personaje que casa en secreto y sella el destino de la joven pareja.",
      instagram: "carlosmendoza.dance"
    },
  ],
  corpsDeBallet: Array.from({ length: 30 }, (_, i) => ({
    name: `Bailarín${i % 2 === 0 ? 'a' : ''} ${i + 1}`
  }))
};

export default function App() {
  const [activeTab, setActiveTab] = useState('synopsis');
  const [theaterMode, setTheaterMode] = useState(false);

  return (
    <div className={`mobile-viewport ${theaterMode ? 'theater-mode' : ''}`}>
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

      {/* Botón Flotante Modo Teatro (Máscara Teatral) */}
      <button 
        onClick={() => setTheaterMode(!theaterMode)}
        className={`theater-toggle ${theaterMode ? 'active' : ''}`}
        aria-label={theaterMode ? 'Desactivar Modo Teatro' : 'Activar Modo Teatro'}
        title={theaterMode ? 'Desactivar Modo Teatro' : 'Activar Modo Teatro'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Máscara de teatro minimalista */}
          <path d="M2 10c0-3.87 3.13-7 7-7h6c3.87 0 7 3.13 7 7v3c0 3.87-3.13 7-7 7H9c-3.87 0-7-3.13-7-7v-3z" />
          <circle cx="9" cy="10" r="1" fill="currentColor" />
          <circle cx="15" cy="10" r="1" fill="currentColor" />
          <path d="M9 15c1 1.5 3 1.5 3 1.5s2 0 3-1.5" />
        </svg>
      </button>
    </div>
  );
}
