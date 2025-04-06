import ErrorBoundary from './components/common/errorBoundary'
import { NavBar } from './components/ui/navbar/navbar'
import { AppRoutes } from './routes/AppRouter'
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseContext } from './contexts/firebaseContext'
import { FirebaseService } from './services/firebaseService'
import { firebaseConfig } from './firebase';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const firebaseService = new FirebaseService(auth,db)

const FirebaseApiProvider = ({children}:{children:React.ReactNode}) => {
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
