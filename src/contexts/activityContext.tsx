import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import type { ActivityType, StatisticEntry } from '../types';
import { getWorkdayFromStorage, saveWorkdayToStorage } from '../utils/workdayStorage';
import { calculateDuration, convertStringTimeToMinutes } from '../utils/convertTime';

type PlannedActivity = {
    id: string;
    category: string;
    title: string;
    scheduledTimeStart: string | null;
    scheduledTimeStop: string | null;
    isDone: boolean;
    isActive: boolean;
    totalDuration: number;
}

export type TimeSlot = {
    start: number, end: number
}

type ActivityAction =
    | { type: "ADD_ACTIVITY"; payload: ActivityType }
    | { type: "EDIT_ACTIVITY"; payload: { id: string; title: string; category: string; scheduledTime: { start: string; end: string }; estimatedDuration: number } }
    | { type: "UPDATE_TIME_SPENT"; payload: { id: string; totalTime: number } }
    | { type: "ADD_STATISTIC"; payload: { id: string; timestamp: string; stat: StatisticEntry } }
    | { type: "TOGGLE_ACTIVE"; payload: { id: string } }
    | { type: "DELETE_ACTIVITY"; payload: { id: string } }
    | { type: "MARK_COMPLETED"; payload: { id: string } };

const activityContext = createContext<{
    activities: ActivityType[];
    activityDispatch: React.Dispatch<ActivityAction>;
    plannedActivities: PlannedActivity[];
    setPlannedActivities: React.Dispatch<React.SetStateAction<PlannedActivity[]>>;
    timeBlocks: TimeSlot[];
    setTimeBlocks: React.Dispatch<React.SetStateAction<TimeSlot[]>>
} | null>(null);

function activitiesReducer(state: ActivityType[], action: ActivityAction): ActivityType[] {
    switch (action.type) {
        case "ADD_ACTIVITY":
            return [...state, action.payload];
        case "EDIT_ACTIVITY":
            return state.map(activity => activity.id === action.payload.id ?
                {
                    ...activity,
                    title: action.payload.title,
                    category: action.payload.category,
                    scheduledTime: {
                        start: action.payload.scheduledTime.start,
                        end: action.payload.scheduledTime.end
                    },
                    estimatedDuration: action.payload.estimatedDuration
                } : activity)
        case "UPDATE_TIME_SPENT":
            return state.map(activity => activity.id === action.payload.id ? {
                ...activity,
                totalTimeSpent: action.payload.totalTime
            } : activity)
        case "ADD_STATISTIC":
            return state.map(activity => activity.id === action.payload.id ? {
                ...activity,
                statistics: {
                    ...activity.statistics,
                    [action.payload.timestamp]: { ...action.payload.stat }
                }
            } : activity)
        case "TOGGLE_ACTIVE":
            return state.map(activity => activity.id === action.payload.id ? {
                ...activity,
                isActive: !activity.isActive
            } : activity)
        case "DELETE_ACTIVITY":
            return [...state.filter(activity => activity.id !== action.payload.id)]
        case "MARK_COMPLETED":
            return state.map(activity => activity.id === action.payload.id ? {
                ...activity,
                isCompleted: true
            } : activity)
        default:
            return state;
    }
}

function sortPlannedActivities(array: PlannedActivity[]): PlannedActivity[] {
    array.sort((a, b) => {
        if (a.scheduledTimeStart === null) return 1;
        if (b.scheduledTimeStart === null) return -1;
        return a.scheduledTimeStart.localeCompare(b.scheduledTimeStart);
    })

    return array;
}


export function ActivityProvider({ children }: { children: React.ReactNode }) {

    // HÅRDKOD TILLS BUG FIXAD
    // if(!getWorkdayFromStorage()){
    //     saveWorkdayToStorage({
    //         workHours: {start: '07:00', end: '17:00'},
    //         nonWorkHours: {start: '11:00', end: '12:00'},
    //         workEnvironment: {location: 'Home'}
    //     })
    // }
    // -----------------------

    const [workday, setWorkday] = useState(getWorkdayFromStorage());
    const [plannedActivities, setPlannedActivities] = useState<PlannedActivity[]>([]);
    const [timeBlocks, setTimeBlocks] = useState<TimeSlot[]>([]);

    useEffect(() => {
        function handleWorkdayUpdate() {
            const updatedWorkday = getWorkdayFromStorage();
            setWorkday(updatedWorkday);
        }

        window.addEventListener("workdayDataUpdated", handleWorkdayUpdate);

        return () => {
            window.removeEventListener("workdayDataUpdated", handleWorkdayUpdate);
        };
    }, [workday]);

    const [activities, activityDispatch] = useReducer(activitiesReducer, [],
        () => {
            const item = localStorage.getItem("activities");
            if (!item) return [];

            try {
                const data = JSON.parse(item);
                const dataAgeInMs: number = Date.now() - data.timeStamp;
                const maxDataAgeInMs: number = 16 * 60 * 60 * 1000;

                // tar bort aktiviteter om ingen uppdatering skett på över 16 timmar
                if (dataAgeInMs > maxDataAgeInMs) {
                    localStorage.removeItem("activities");
                    return [];
                }
                return data.value;

            } catch (e) {
                return [];
            }
        })

    useEffect(
        () => {
            const data = {
                value: activities,
                timeStamp: Date.now()
            }
            localStorage.setItem("activities", JSON.stringify(data));

            if (!workday) return;

            const basePlannedActivity: PlannedActivity[] = [];

            if (workday.nonWorkHours) {
                const totalDuration = calculateDuration(workday.nonWorkHours.start, workday.nonWorkHours.end)
                const nonWorkPlan: PlannedActivity = {
                    id: "nonWork",
                    title: "Non work time",
                    category: "NonWork",
                    scheduledTimeStart: workday.nonWorkHours.start,
                    scheduledTimeStop: workday.nonWorkHours.end,
                    isActive: false,
                    isDone: false,
                    totalDuration: totalDuration
                };

                basePlannedActivity.push(nonWorkPlan);
            }

            const newActivities = activities.filter(a => a.scheduledTime).map((a) => ({
                id: a.id,
                title: a.title,
                category: a.category,
                scheduledTimeStart: a.scheduledTime!.start,
                scheduledTimeStop: a.scheduledTime!.end,
                totalDuration: a.estimatedDuration,
                isDone: false,
                isActive: a.isActive
            }))

            const sorted = sortPlannedActivities([...basePlannedActivity, ...newActivities]);
            setPlannedActivities(sorted);

            const start = convertStringTimeToMinutes(workday.workHours.start);
            const end = convertStringTimeToMinutes(workday.workHours.end);

            const timeBlocksStart = { start: start, end: start };
            const timeBlocksEnd = { start: end, end: end };
            const plannedBlocks: TimeSlot[] = [];

            for (let activity of sorted) {
                if (!activity.scheduledTimeStart || !activity.scheduledTimeStop) continue;
                const start = convertStringTimeToMinutes(activity.scheduledTimeStart);
                const end = convertStringTimeToMinutes(activity.scheduledTimeStop);

                plannedBlocks.push({ start: start, end: end });
            }

            setTimeBlocks([timeBlocksStart, ...plannedBlocks, timeBlocksEnd]);

        }, [activities, workday]
    )

    const value = useMemo(() => ({
        activities, activityDispatch, plannedActivities, setPlannedActivities, timeBlocks, setTimeBlocks
    }), [activities, plannedActivities, timeBlocks])

    return (
        <activityContext.Provider value={value}>
            {children}
        </activityContext.Provider>
    )
}

export function useActivities() {
    const context = useContext(activityContext);
    if (!context) throw new Error("useActivities used outside of provider")

    return context;
}
