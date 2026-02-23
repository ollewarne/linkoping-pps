import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import { ActivityProvider } from "./contexts/activityContext.jsx"
import { TranslatePage } from './contexts/languageContext.jsx'
import { NotificationProvider } from './contexts/NotificationContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { TimerProvider } from './contexts/TimerContext'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <NotificationProvider>
                    <TranslatePage>
                        <ActivityProvider>
                            <TimerProvider>
                                <App />
                            </TimerProvider>
                        </ActivityProvider>
                    </TranslatePage>
                </NotificationProvider>
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>,
)
