import "./CountdownDisplay.css";
import { useTimer } from "../../contexts/TimerContext";
import { useActivities } from "../../contexts/activityContext";
import { categoryColors } from "../../constants/categoryColors";

export const CountdownDisplay = () => {
    const { activeActivity, timeLeft, phase, totalRemaining } = useTimer();
    const { activityDispatch } = useActivities();

    if (!activeActivity) return null;

    const categoryColor = categoryColors[activeActivity.category] ?? "#4a4aff";

    const formatMMSS = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const formatLongTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        return h > 0 ? `${h}h ${m}min` : `${m}min`;
    };

    const handleStop = () => {
        activityDispatch({ type: "MARK_COMPLETED", payload: { id: activeActivity.id } });
        activityDispatch({ type: "TOGGLE_ACTIVE", payload: { id: activeActivity.id } });
    };

    return (
        <div className="timer-container">
            <div className="timer-card">

                <div className="timer-header" style={{ backgroundColor: categoryColor }}>
                    <span
                        className="timer-schedule"
                        style={{ visibility: activeActivity.scheduledTime ? "visible" : "hidden" }}
                    >
                        {activeActivity.scheduledTime
                            ? `${activeActivity.scheduledTime.start} - ${activeActivity.scheduledTime.end}`
                            : ""}
                    </span>
                    {activeActivity.category && (
                        <span className="timer-category">{activeActivity.category}</span>
                    )}
                </div>

                <div className="timer-body">
                    <h2 className="activity-name" style={{borderColor: categoryColor}}>{activeActivity.title}</h2>
                    {/* <hr className="timer-divider" /> */}

                    <div className="timer-main">
                        <h3 className={`phase-status ${phase}`}>
                            {phase === "work" ? "WORKING" : "PAUSE"}
                        </h3>
                        <div className="time-right">
                            <span className="label">Time left</span>
                            <span className={`time-count ${phase}`}>
                                {formatMMSS(timeLeft)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="timer-footer">
                    <span className="total-end-time">
                        Total time remaining: {formatLongTime(totalRemaining)}
                    </span>
                    <button className="stop-btn" onClick={handleStop}>
                        Stop activity
                    </button>
                </div>

            </div>
        </div>
    );
};