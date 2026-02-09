import "./App.css";
import { useEffect, useState } from "react";
import ActivityForm from "./components/ActivityForm/ActivityForm";
import Header from "./components/Header/Header";
import Schedule from "./components/Schedule/Schedule";
import WorkDayForm from "./components/WorkDayForm/WorkDayForm";
import PauseStatistics from "./components/PauseStatistics/PauseStatistics";
import PopupManager from "./components/PopupManager/PopupManager";
import MobileLayout from "./components/MobileLayout/MobileLayout";

import { useTranslator } from "./contexts/languageContext";
import { languageLibrary } from "./locales/language";


import Statistics from "./components/Statistics/statistics";

function App() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showPauseModal, setShowPauseModal] = useState(false);
    const { language } = useTranslator();
    const isMobile = windowWidth < 768;

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [])

    const handlePauseSave = (data) => {
        console.log("Saved:", data);
        setShowPauseModal(false);
    };

    return (
        <PopupManager>
            {({ isDndEnabled, toggleDnd }) => {
                const children = (
                    <>
                        <Header isDndEnabled={isDndEnabled} toggleDnd={toggleDnd} />
                        <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
                            <WorkDayForm />
                            <ActivityForm />
                            <button onClick={() => setShowPauseModal(true)}>
                                {languageLibrary[language].evaluateButton}
                            </button>
                            {showPauseModal && (
                                <PauseStatistics
                                    onSave={handlePauseSave}
                                    isDndEnabled={isDndEnabled}
                                />
                            )}
                        </div>
                        <Schedule />
                        <Statistics />
                    </>
                );

                return isMobile ? (
                    <MobileLayout
                        header={<Header isDndEnabled={isDndEnabled} toggleDnd={toggleDnd} />}
                        activityView={
                            <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
                                <WorkDayForm />
                                <ActivityForm />
                            </div>
                        }
                        scheduleView={<Schedule />}
                        statisticsView={<Statistics />}
                    />
                ) : (
                    <div className="container">{children}</div>
                );
            }}
        </PopupManager>
    );
}

export default App;
