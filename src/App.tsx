import ErrorBoundary from './components/common/errorBoundary'
import { NavBar } from './components/ui/navbar/navbar'
import { FirebaseProvider } from './contexts/firebaseContext'
import { AppRoutes } from './routes/AppRouter'

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <FirebaseProvider>
            <NavBar />
            <div className='w-full h-full max-h-[calc(100vh-64px)]'>
                <AppRoutes />
            </div>
        </FirebaseProvider>
      </ErrorBoundary>
    </div>
  )
}

export default App
