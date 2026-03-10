import { useState, useMemo, useEffect, createContext, useContext, type ReactNode } from "react";
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
    const { activities } = useActivities();


    useEffect(() => {
        const foundActive = activities.find((a: ActivityType) => a.isActive) ?? null;
        setActiveActivity(prev => {
            if (prev?.id === foundActive?.id) return prev;
            return foundActive;
        });
    }, [activities]);

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
