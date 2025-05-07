import { FirebaseService } from './services/firebaseService'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  databaseURL: import.meta.env.VITE_dataBaseURL,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const dbSite = getDatabase(app)
const firebaseService = new FirebaseService(auth, db)

export { dbSite, firebaseService, auth, db }
