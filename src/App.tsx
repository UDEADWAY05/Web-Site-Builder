import { NavBar } from "./components/ui/navbar/navbar"
import { AppRoutes } from './routes/AppRouter'

function App() {
  return (
    <div className="App">
      <NavBar />
      <AppRoutes />
    </div>
  )
}

export default App
