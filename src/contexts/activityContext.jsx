import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const activityContext = createContext(null);


function activitiesReducer(state, action) {
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

export function ActivityProvider({ children }) {
    const [activities, dispatch] = useReducer(activitiesReducer, [],
        () => {
            const item = localStorage.getItem("activities");
            if (!item) return [];

            try {
                const data = JSON.parse(item);
                const dataAgeInMs = Date.now() - data.timeStamp;
                const maxDataAgeInMs = 16 * 60 * 60 * 1000;

                // tar bort aktiviteter om ingen uppdatering skett på över 16 timmar
                if (dataAgeInMs > maxDataAgeInMs) {
                    localStorage.removeItem(activities);
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
