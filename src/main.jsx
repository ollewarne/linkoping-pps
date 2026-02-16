import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import { ActivityProvider } from "./contexts/activityContext.jsx"
import { TranslatePage } from './contexts/languageContext.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <TranslatePage>
                <ActivityProvider>
                    <App />
                </ActivityProvider>
            </TranslatePage>
        </BrowserRouter>
    </StrictMode>,
)
