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
    totalTimeSpent: number;
    statistics: {
        [timestamp: string]: {
            efficiency: number | null;
            energy: number | null;
            factor: string | null;
        }
    };
    activeTime: number;
    breakTime: number;
}

export interface StatisticEntry {
    efficiency: number | null;
    energy: number | null;
    factor: string | null;
}
