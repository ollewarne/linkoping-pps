import './App.css';
import { useState } from 'react';
import ActivityForm from './components/ActivityForm/ActivityForm';
import Header from './components/Header/Header';
import Schedule from './components/Schedule/Schedule';
import WorkDayForm from './components/WorkDayForm/WorkDayForm';
import PauseStatistics from './components/PauseStatistics/PauseStatistics';

function App() {
  const [showPauseModal, setShowPauseModal] = useState(false);

  const handlePauseSave = (data) => {
    console.log("Saved:", data);
    setShowPauseModal(false); // close modal after save
  };

  return (
    <>
      <Header />
      <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <WorkDayForm />
        <ActivityForm />

        <button onClick={() => setShowPauseModal(true)}>
          Open Pause Statistics
        </button>

        {showPauseModal && (
          <PauseStatistics onSave={handlePauseSave} onClose={() => setShowPauseModal(false)} />
        )}
      </div>

      <div>
        <Schedule />
      </div>
    </>
  );
}

export default App;
