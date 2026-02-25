import PauseStatistics from "../PauseStatistics/PauseStatistics";
import "./CountdownDisplay.css";
import { useTimer } from "../../contexts/TimerContext";
import { useDnd } from "../PopupManager/PopupManager";

export const CountdownDisplay = () => {
    const { activeActivity, timeLeft, phase, totalRemaining, showPopup, setShowPopup } = useTimer();
    const { isDndEnabled} = useDnd();

    const handleSaveStats = () => {
        setShowPopup(false);
    };

    const formatMMSS = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const formatLongTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        return h > 0 ? `${h}h ${m}m` : `${m}m`;
    };

    return (
        <div className="timer-container">
            <div className="timer-card">
                <h2 className="activity-name">{activeActivity ? activeActivity.title : "Title"}</h2>

                <div className="phase-display">
                    <h3 className={`phase-status ${phase}`}>
                        {phase === "work" ? "Working" : "Pause"}
                    </h3>
                    <p className="label">time left</p>
                    <p className={`time-count ${phase}`}>
                        {formatMMSS(timeLeft)}
                    </p>
                </div>

                <p className="total-end-time">
                    Time until activity end: {formatLongTime(totalRemaining)}
                </p>
            </div>

            {showPopup && !isDndEnabled && (
                <PauseStatistics
                    onSave={handleSaveStats}
                />
            )}
        </div>
    );
};
