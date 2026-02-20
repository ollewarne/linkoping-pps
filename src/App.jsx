import "./App.css";
import { useEffect, useState } from "react";
import PauseStatistics from "./components/PauseStatistics/PauseStatistics";
import PopupManager from "./components/PopupManager/PopupManager";
import MobileLayout from "./layouts/MobileLayout/MobileLayout";
import DesktopLayout from "./layouts/DesktopLayout/DesktopLayout";
import SchedulePage from "./pages/SchedulePage";
import StatisticsPage from "./pages/StatisticsPage";
import ActivityPage from "./pages/ActivityPage";
import { Route, Routes } from "react-router";

import { useTranslator } from "./contexts/languageContext";
import { languageLibrary } from "./locales/language";

function App() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const isMobile = windowWidth < 768;
    const [showPauseModal, setShowPauseModal] = useState(false);
    const { language } = useTranslator();

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [])

    return (
        <PopupManager>
            {({ isDndEnabled, toggleDnd }) => {
                return isMobile ? (
                    <Routes>
                        <Route path="/" element={<MobileLayout />}>
                            <Route index element={<ActivityPage />} />
                            <Route path="Schedule" element={<SchedulePage />} />
                            <Route path="Statistics" element={<StatisticsPage />} />
                        </Route>
                    </Routes>
                ) : (
                    <Routes>
                        <Route path="/" element={<DesktopLayout />}>
                            <Route index element={<ActivityPage />} />
                            <Route path="Schedule" element={<SchedulePage />} />
                            <Route path="Statistics" element={<StatisticsPage />} />
                        </Route>
                    </Routes>
                );
            }}
        </PopupManager>
    );
}

export default App;
