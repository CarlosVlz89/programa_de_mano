import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration using Vite environment variables
// Attendees can add their own keys to a .env file or directly replace these placeholders
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

// Check if credentials are valid and not placeholders
const isFirebaseValid = !!(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId && 
  firebaseConfig.apiKey !== "YOUR_API_KEY" &&
  !firebaseConfig.apiKey.includes("placeholder")
);

let app;
let db = null;

if (isFirebaseValid) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    console.log("🔥 [Firebase] Inicializado con éxito. Conectado a la base de datos de comentarios en tiempo real.");
  } catch (error) {
    console.error("❌ [Firebase] Error de inicialización:", error);
    db = null;
  }
} else {
  console.warn("⚠️ [Firebase] Configuración faltante o vacía. Ejecutando en Modo de Almacenamiento Local (Local Storage).");
}

export { db, isFirebaseValid };
export default db;
