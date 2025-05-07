import ErrorBoundary from './components/common/errorBoundary'
import { NavBar } from './components/ui/navbar/navbar'
import { FirebaseProvider } from './contexts/firebaseContext'
import { AppRoutes } from './routes/AppRouter'
import { ref, set, onValue, child, get, off } from 'firebase/database'

export { ref, set, onValue, child, get, off }

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <FirebaseProvider>
          <NavBar />
          <AppRoutes />
        </FirebaseProvider>
      </ErrorBoundary>
    </div>
  )
}

export default App
