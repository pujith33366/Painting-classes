/* ============================================================
   Firebase Configuration & SDK Initialization
   ============================================================
   Automatically initializes Firebase SDK if environment variables
   are provided. If VITE_FIREBASE_API_KEY is missing or set to a
   placeholder, it enables seamless Demo/Mock Auth Mode so you
   can test Parent & Admin dashboards immediately!
   ============================================================ */
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check if valid keys are configured
const hasValidConfig =
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== 'your_api_key_here' &&
  firebaseConfig.apiKey !== 'undefined';

// If keys are missing, enable Demo Mode. We allow this in production so you can host the portfolio on Netlify!
export const isDemoMode = !hasValidConfig;

let app;
let auth;
let db;
let storage;
let googleProvider;

if (hasValidConfig) {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
    console.info('%c🔥 Firebase SDK Initialized Successfully', 'color: #2E7D32; font-weight: bold; font-size: 14px;');
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
} else if (import.meta.env.PROD) {
  console.error(
    '%c❌ CRITICAL CONFIGURATION ERROR: Live Firebase environment variables are missing in production build!\n' +
    'Please set VITE_FIREBASE_API_KEY and related variables in your hosting environment.',
    'background: #D32F2F; color: white; padding: 8px 14px; border-radius: 6px; font-weight: bold;'
  );
} else {
  console.warn(
    '%c⚡ Painting Studio — Running in DEMO MODE (No live Firebase API keys detected in .env)\n' +
    'You can test logging in as Admin or Parent using the Demo Auth buttons on the login page.',
    'background: #FFF9C4; color: #8D6E63; padding: 6px 12px; border-radius: 4px; font-weight: 500;'
  );
}

export { app, auth, db, storage, googleProvider };
