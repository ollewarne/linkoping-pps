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
import { ActivityHistoryProvider } from './contexts/activityHistoryContext'
import { DndProvider } from "./contexts/DndContext"

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <NotificationProvider>
                    <TranslatePage>
                        <ActivityHistoryProvider>
                            <ActivityProvider>
                                    <TimerProvider>
                                        <DndProvider>
                                            <App />
                                        </DndProvider>
                                    </TimerProvider>
                            </ActivityProvider>
                        </ActivityHistoryProvider>
                    </TranslatePage>
                </NotificationProvider>
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>,
)
