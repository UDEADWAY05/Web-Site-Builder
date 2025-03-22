import ErrorBoundary from './components/common/errorBoundary'
import { NavBar } from './components/ui/navbar/navbar'

import { AppRoutes } from './routes/AppRouter'

function App() {
  return (
    <div className="App">
      <NavBar />
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </div>
  )
}

export default App
