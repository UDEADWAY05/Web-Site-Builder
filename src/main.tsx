import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import App from './App.tsx'
import { Providers } from './provider'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './store/store.ts'
import './firebase.ts'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PersistGate persistor={persistor}>
            <Providers>
                <App />
            </Providers>
        </PersistGate>
    </StrictMode>,
)
