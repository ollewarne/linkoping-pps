import { useRef, useState, useMemo, useEffect, createContext, useContext, type ReactNode } from "react";
import type { ActivityType } from "../types";
import { useActivities } from "./activityContext";
import { SessionTimer } from "../components/CountdownTimer/CountdownTimer";

interface TimerContextType {
    timeLeft: number;
    phase: "work" | "break";
    totalRemaining: number;
    showPopup: boolean;
    activeActivity: ActivityType | null;
    setShowPopup: (value: boolean) => void;
}

const TimerContext = createContext<TimerContextType | null>(null);

export function TimerProvider({ children }: { children: ReactNode }) {
    const [activeActivity, setActiveActivity] = useState<ActivityType | null>(null);
    const [timeLeft, setTimeLeft] = useState(activeActivity ? activeActivity.activeTime * 60 : 0);
    const [phase, setPhase] = useState<"work" | "break">("work");
    const [totalRemaining, setTotalRemaining] = useState(activeActivity ? activeActivity.estimatedDuration * 60 : 0);
    const [showPopup, setShowPopup] = useState(false);
    const { activities, activityDispatch } = useActivities();
    const totalTimeSpentRef = useRef(activeActivity?.totalTimeSpent ?? 0);
    const currentPhaseTimeSpentRef = useRef(activeActivity?.currentPhaseTimeSpent ?? 0);


    useEffect(() => {
        const foundActive = activities.find((a: ActivityType) => a.isActive) ?? null;
        setActiveActivity(prev => {
            if (prev?.id === foundActive?.id) return prev;
            return foundActive;
        });
    }, [activities]);

    useEffect(() => {
        totalTimeSpentRef.current = activeActivity?.totalTimeSpent ?? 0;
        currentPhaseTimeSpentRef.current = activeActivity?.currentPhaseTimeSpent ?? 0;
    }, [activeActivity?.id])

    useEffect(() => {
        if (!showPopup) return;
        const timeout = setTimeout(() => {
            setShowPopup(false);
        }, 90_000)
        return () => clearTimeout(timeout);
    }, [showPopup])

    const timer = useMemo(() => {
        if (!activeActivity) return null;
        const a = activeActivity;
        const now = Date.now();
        let effectiveDurationMinutes = a.estimatedDuration;

        if (a.scheduledTime) {
            const [endHour, endMin] = a.scheduledTime.end.split(":").map(Number);
            const endDate = new Date();
            endDate.setHours(endHour, endMin, 0, 0);
            const secondsUntilEnd = Math.max(0, Math.floor((endDate.getTime() - now) / 1000));
            effectiveDurationMinutes = Math.min(a.estimatedDuration, Math.floor(secondsUntilEnd / 60));
        }

        const effectiveDurationSeconds = Math.max(0, (effectiveDurationMinutes * 60) - a.totalTimeSpent);
        effectiveDurationMinutes = Math.floor(effectiveDurationSeconds / 60);

        return new SessionTimer({
            id: "session-1",
            initialPhase: a.currentPhase ?? "work",
            initialPhaseSeconds: a.currentPhaseTimeSpent ?? 0,
            totalMinutes: effectiveDurationMinutes,
            totalSeconds: effectiveDurationSeconds,
            activeMinutes: a.activeTime,
            breakMinutes: a.breakTime,
            onTick: (_id, totalSec, currentPhase, phaseSec) => {
                setTotalRemaining(totalSec);
                setPhase(currentPhase);
                setTimeLeft(phaseSec);

                totalTimeSpentRef.current += 1;
                if (currentPhase !== phase) {
                    currentPhaseTimeSpentRef.current = 0;
                } else {
                    currentPhaseTimeSpentRef.current += 1;
                }

                activityDispatch({
                    type: "UPDATE_TIME_SPENT",
                    payload: { id: a.id, totalTime: totalTimeSpentRef.current }
                })
                activityDispatch({
                    type: "UPDATE_PHASE_PROGRESS",
                    payload: { id: a.id, currentPhaseTimeSpent: currentPhaseTimeSpentRef.current, currentPhase }
                })

                // ✅ AUTO-CLOSE POPUP WHEN WORK RESUMES
                if (currentPhase === "work") {
                    setShowPopup(false);
                }
            },
            showPausePopup: () => {
                setShowPopup(true);
            },
            onComplete: () => {
                if (a.id) {
                    activityDispatch({ type: "MARK_COMPLETED", payload: { id: a.id } })
                    activityDispatch({ type: "TOGGLE_ACTIVE", payload: { id: a.id } })
                }
                setShowPopup(true);
            },
        });
    }, [activeActivity]);

    useEffect(() => {
        if (!timer) return;
        timer.start();
        return () => timer.pause();
    }, [timer]);

    const value = useMemo(() => ({
        timeLeft, phase, totalRemaining, showPopup, activeActivity, setShowPopup
    }), [timeLeft, phase, totalRemaining, showPopup, activeActivity, setShowPopup]);

    return (
        <TimerContext.Provider value={value}>
            {children}
        </TimerContext.Provider>
    )
}

export function useTimer() {
    const context = useContext(TimerContext);

    if (!context) throw new Error("useTimer used outside of provider");

    return context;
}
