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
    statistics: object;
    activeTime: number;
    breakTime: number;
}
