import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = { 
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
<<<<<<< HEAD
export const db = getFirestore(app)
=======
export const db = getFirestore()
>>>>>>> e2d4ac2 (fix:обновлен_стор_для_страницы_профиля.Верстка)
