import { createRoot } from 'react-dom/client'
import { Providers } from './provider'
import App from './App.tsx'
import './firebase.ts'
import './global.css'

createRoot(document.getElementById('root')!).render(
    <Providers>
        <App />
    </Providers>
)
