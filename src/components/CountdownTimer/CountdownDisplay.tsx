import PauseStatistics from "../PauseStatistics/PauseStatistics";
import "./CountdownDisplay.css";
import { useTimer } from "../../contexts/TimerContext";
import { useDnd } from "../PopupManager/PopupManager";
import { useActivityHistory, getDateKeyFromIso } from "../../contexts/activityHistoryContext";

export const CountdownDisplay = () => {
    const { historyDispatch } = useActivityHistory();
    const { activeActivity, timeLeft, phase, totalRemaining, showPopup, setShowPopup } = useTimer();
    const { isDndEnabled} = useDnd();

    //helper som vi ska flytta senare till utils
    const isoToHHMM = (iso: string) => {
    const d = new Date(iso);
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
};

    //skapar en uppdaterad kopia av den aktiva aktiviteten med popupens statistik sparad och skickar den till historiken.
    const handleSaveStats = (data: {
        timestamp: string;
        efficiency: number | null;
        energy: number | null;
        factor: string | null;
    }) => {
        if (!activeActivity) return;

        const statEntry = {
            ...activeActivity,
            statistics: {
                ...(activeActivity.statistics ?? {}),
                [isoToHHMM(data.timestamp)]: {
                    efficiency: data.efficiency,
                    energy: data.energy,
                    factor: data.factor
                }
            }
        };

        historyDispatch({
            type: "ADD_TO_HISTORY",
            payload: {
                dateKey: getDateKeyFromIso(data.timestamp),
                activity: statEntry,
            },
        });

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
