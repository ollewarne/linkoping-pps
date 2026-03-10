import "./App.css";
import { useEffect, useState } from "react";
import PauseStatistics from "./components/PauseStatistics/PauseStatistics";
import PopupManager from "./components/PopupManager/PopupManager";
import MobileLayout from "./layouts/MobileLayout/MobileLayout";
import DesktopLayout from "./layouts/DesktopLayout/DesktopLayout";
import PlannerPage from "./pages/PlannerPage";
import StatisticsPage from "./pages/StatisticsPage";
import ActivityPage from "./pages/ActivityPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Route, Routes } from "react-router";

import { useTranslator } from "./contexts/languageContext";
import { languageLibrary } from "./locales/language";

function App() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const isMobile = windowWidth < 768;
    const { language } = useTranslator();

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <PopupManager>
            {isMobile ? (
                <Routes>
                    <Route path="/" end element={<MobileLayout />}>
                        <Route index element={<ActivityPage />} />
                        <Route path="planner" element={<PlannerPage />} />
                        <Route path="history" element={<StatisticsPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            ) : (
                <Routes>
                    <Route path="/" end element={<DesktopLayout />}>
                        <Route index element={<ActivityPage />} />
                        <Route path="planner" element={<PlannerPage />} />
                        <Route path="history" element={<StatisticsPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            )}
        </PopupManager>
    );
}

export default App;
