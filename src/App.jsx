import "./App.css";
import { useState } from "react";
import ActivityForm from "./components/ActivityForm/ActivityForm";
import Header from "./components/Header/Header";
import Schedule from "./components/Schedule/Schedule";
import WorkDayForm from "./components/WorkDayForm/WorkDayForm";
import PauseStatistics from "./components/PauseStatistics/PauseStatistics";
import PopupManager from "./components/PopupManager/PopupManager";

import { useTranslator } from "./contexts/languageContext";
import { languageLibrary } from "./locales/language";


import Statistics from "./components/Statistics/statistics";

function App() {
  const [showPauseModal, setShowPauseModal] = useState(false);
  const { language } = useTranslator();

  const handlePauseSave = (data) => {
    console.log("Saved:", data);
    setShowPauseModal(false); 
  };

  return (
    <PopupManager>
      {({ isDndEnabled, toggleDnd }) => (
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

          <div>
            <Schedule />
          </div>

          <Statistics />
        </>
      )}
    </PopupManager>
  );
}

export default App;
