import { createRoot } from 'react-dom/client'
import './global.css'
import App from './App.tsx'
import { Providers } from './provider'
import './firebase.ts'

createRoot(document.getElementById('root')!).render(
    <Providers>
        <App />
    </Providers>
)
