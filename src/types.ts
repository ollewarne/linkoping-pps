export interface ActivityType {
    id: string;
    scheduledTime: string | null;
    category: string;
    isMeeting: boolean;
    title: string;
    estimatedDuration: number;
    isActive: boolean;
    totalTimeSpent: number;
    statistics: object;
    meetingTimes?: {
        start: string;
        end: string;
    };
    activeTime: number;
    breakTime: number;
}
