import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import type { ActivityType } from '../types';

type ActivityAction =
    | { type: "ADD_ACTIVITY"; payload: ActivityType }
    | { type: "ADD_MEETING"; payload: ActivityType }
    | { type: "SCHEDULE_ACTIVITY"; payload: { id: string; scheduledTime: string } }
    | { type: "EDIT_ACTIVITY"; payload: { id: string; title: string; category: string; estimatedDuration: number } }
    | { type: "UPDATE_TIME_SPENT"; payload: { id: string; totalTime: number } }
    | { type: "ADD_STATISTIC"; payload: { id: string; timestamp: string; stat: object } }
    | { type: "TOGGLE_ACTIVE"; payload: {id: string}};


const activityContext = createContext<{ activities: ActivityType[]; activityDispatch: React.Dispatch<ActivityAction> } | null>(null);


function activitiesReducer(state: ActivityType[], action: ActivityAction): ActivityType[] {
    switch (action.type) {
        case "ADD_ACTIVITY":
            return [...state, action.payload];
        case "ADD_MEETING":
            return [...state, action.payload];
        case "SCHEDULE_ACTIVITY":
            return state.map(activity => activity.id === action.payload.id ?
                { ...activity, scheduledTime: action.payload.scheduledTime } : activity);
        case "EDIT_ACTIVITY":
            return state.map(activity => activity.id === action.payload.id ?
                {
                    ...activity,
                    title: action.payload.title,
                    category: action.payload.category,
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
        default:
            return state;
    }

}

export function ActivityProvider({ children }: { children: React.ReactNode }) {
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
            localStorage.setItem("activities", JSON.stringify(data))
        }, [activities]
    )

    const value = useMemo(() => ({
        activities, activityDispatch
    }), [activities])

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
