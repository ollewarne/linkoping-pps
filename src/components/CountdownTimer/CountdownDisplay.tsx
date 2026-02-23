import { useEffect, useState, useMemo } from "react";
import { SessionTimer } from "./CountdownTimer";
import PauseStatistics from "../PauseStatistics/PauseStatistics";
import "./CountdownDisplay.css";
import type { ActivityType } from "../../types";
import { useActivities } from "../../contexts/activityContext";

export const CountdownDisplay = () => {
  const [activeActivity, setActiveActivity] = useState<ActivityType | null>(null);
  const [timeLeft, setTimeLeft] = useState(activeActivity ? activeActivity.activeTime * 60 : 0);
  const [phase, setPhase] = useState<"work" | "break">("work");
  const [totalRemaining, setTotalRemaining] = useState(activeActivity ? activeActivity.estimatedDuration * 60 : 0);
  const [showPopup, setShowPopup] = useState(false);
  const {activities} = useActivities();

  useEffect(() => {
      const foundActive = activities.find((a: ActivityType) => a.isActive) ?? null;
      setActiveActivity(foundActive);
  }, [activities])

  const timer = useMemo(() => {
    if (!activeActivity) return null;
    const a = activeActivity;
    return new SessionTimer({
      id: "session-1",
      totalMinutes: a.estimatedDuration,
      activeMinutes: a.activeTime,
      breakMinutes: a.breakTime,
      onTick: (_id, totalSec, currentPhase, phaseSec) => {
        setTotalRemaining(totalSec);
        setPhase(currentPhase);
        setTimeLeft(phaseSec);

        // ✅ AUTO-CLOSE POPUP WHEN WORK RESUMES
        if (currentPhase === "work") {
          setShowPopup(false);
        }
      },
      showPausePopup: () => {
        setShowPopup(true);
      },
      onComplete: () => {
        setShowPopup(true);
      },
    });
  }, [activeActivity]);

  useEffect(() => {
    if (!timer) return;
    timer.start();
    return () => timer.pause();
  }, [timer]);

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

      {showPopup && (
        <PauseStatistics
          onSave={handleSaveStats}
        />
      )}
    </div>
  );
};
