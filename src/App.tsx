import ErrorBoundary from './components/common/errorBoundary'
import { NavBar } from './components/ui/navbar/navbar'
import { AppRoutes } from './routes/AppRouter'
import { ref, set, onValue, child, get, off } from 'firebase/database'
import { firebaseContext } from './contexts/firebaseContext'
import { Site } from './store/slices/siteSlice/types'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setUser } from './store/slices/userSlice'
import { auth, dbSite, firebaseService } from './firebase'

// Экспорт функций работы с базой данных
// eslint-disable-next-line react-refresh/only-export-components
export { ref, set, onValue, child, get, off }

// Функция сохранения сайта
// eslint-disable-next-line react-refresh/only-export-components
export const saveSite = (siteId: string, data: Site): Promise<void> =>
  set(ref(dbSite, `sites/${siteId}`), data)

// Провайдер контекста Firebase
const FirebaseApiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <firebaseContext.Provider value={firebaseService}>
      {children}
    </firebaseContext.Provider>
  )
}

function App() {
  // проверка токена при старте приложения
  const dispatch = useDispatch()
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken()
        dispatch(setUser({ email: user.email, token }))
        localStorage.setItem('jwt-refresh-token', user.refreshToken)
      }
    })
    return () => unsub()
  }, [])

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
