import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ActivityProvider } from "./contexts/activityContext.jsx"
import { TranslatePage } from './contexts/languageContext.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <TranslatePage>
            <ActivityProvider>
                <App />
            </ActivityProvider>
        </TranslatePage>
    </StrictMode>,
)
