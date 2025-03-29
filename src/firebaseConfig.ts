import { FirebaseApp } from "firebase/app"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = { 
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};

export type FirebaseConfigType = { 
  [K in keyof typeof firebaseConfig]:string
}

export function initFirebaseApp(firebaseConfig:FirebaseConfigType){
  return initializeApp(firebaseConfig)
}

export function initFirebaseDb(app:FirebaseApp){
  const firebaseDb = getFirestore(app)

  return firebaseDb
}

// export const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
