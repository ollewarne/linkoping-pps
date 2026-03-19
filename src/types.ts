export interface ActivityType {
    id: string;
    scheduledTime: {
        start: string;
        end: string;
    } | null;
    category: string;
    title: string;
    estimatedDuration: number;
    isActive: boolean;
    isCompleted: boolean;
    isMissed?: boolean;
    totalTimeSpent: number;
    statistics: {
        [timestamp: string]: {
            productivity: number | null;
            energy: number | null;
            factor: string | null;
        }
    };
    activeTime: number;
    breakTime: number;
    currentPhaseTimeSpent: number;
    currentPhase: "work" | "break";
}

export interface StatisticEntry {
    productivity: number | null;
    energy: number | null;
    factor: string | null;
}
