import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ActivityProvider } from "./contexts/activityContext.jsx"

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ActivityProvider>
            <App />
        </ActivityProvider>
    </StrictMode>,
)
