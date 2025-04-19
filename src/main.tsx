import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Providers } from './provider'
import App from './App.tsx'
import './firebase.ts'
import './global.css'

console.log('main')
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
)
