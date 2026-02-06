import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

type Activity = {
    id: number;
    scheduledTime: string | null;
    category: string;
    isMeeting: boolean;
    title: string;
    ranking: string;
    estimatedDuration: number;
    isActive: boolean;
    totalTimeSpent: number;
    statistics: object;
    meetingTimes?: {
        start: string;
        end: string;
    };
    activeTime?: number;
    breakTime?: number;
}

type ActivityAction =
    | { type: "ADD_ACTIVITY"; payload: Activity }
    | { type: "ADD_MEETING"; payload: Activity }
    | { type: "SCHEDULE_ACTIVITY"; payload: { id: number; scheduledTime: string } }
    | { type: "EDIT_ACTIVITY"; payload: { id: number; title: string; category: string; ranking: string; estimatedDuration: number } }
    | { type: "UPDATE_TIME_SPENT"; payload: { id: number; totalTime: number } };


const activityContext = createContext<{activities: Activity[]; dispatch: React.Dispatch<ActivityAction>} | null>(null);


function activitiesReducer(state: Activity[], action: ActivityAction): Activity[] {
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
                    ranking: action.payload.ranking,
                    estimatedDuration: action.payload.estimatedDuration
                } : activity)
        case "UPDATE_TIME_SPENT":
            return state.map(activity => activity.id === action.payload.id ? {
                ...activity,
                totalTimeSpent: action.payload.totalTime
            } : activity)
        default:
            return state;
    }

}

export function ActivityProvider({ children }: {children: React.ReactNode}) {
    const [activities, dispatch] = useReducer(activitiesReducer, [],
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
        activities, dispatch
    }), [activities])

    return (
        <activityContext.Provider value={value}>
            {children}
        </activityContext.Provider>
    )
}

//kommentaren hjälper tydligen vite så man inte får error
/* @refresh reset */
export function useActivities() {
    const context = useContext(activityContext);
    if (!context) throw new Error("useActivities used outside of provider")

    return context;
}
