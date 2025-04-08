import ErrorBoundary from './components/common/errorBoundary'
import { NavBar } from './components/ui/navbar/navbar'
import { AppRoutes } from './routes/AppRouter'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import {
  getDatabase,
  ref,
  set,
  onValue,
  child,
  get,
  off,
} from 'firebase/database'
import { firebaseContext } from './contexts/firebaseContext'
import { FirebaseService } from './services/firebaseService'
import { firebaseConfig } from './firebase'
import { Site } from './store/slices/layoutSite/types'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const dbSite = getDatabase(app)
const firebaseService = new FirebaseService(auth, db)

//временное решение
// eslint-disable-next-line react-refresh/only-export-components
export { dbSite, ref, set, onValue, child, get, off }
// eslint-disable-next-line react-refresh/only-export-components
export const saveSite = (siteId: string, data: Site) =>
  set(ref(dbSite, `sites/${siteId}`), data)
///

const FirebaseApiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <firebaseContext.Provider value={firebaseService}>
      {children}
    </firebaseContext.Provider>
  )
}

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <FirebaseApiProvider>
          <NavBar />
          <AppRoutes />
        </FirebaseApiProvider>
      </ErrorBoundary>
    </div>
  )
}

export default App
