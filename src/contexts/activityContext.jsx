import { createContext, useContext, useState, useEffect, useMemo, useReducer } from 'react'

const activityContext = createContext(null);


function activitiesReducer(state, action) {
    switch (action.type) {
        case "ADD_ACTIVITY":
            return [...state, action.payload];
        case "ADD_MEETING":
            return [...state, action.payload];
        default:
            return state;
    }

}

export function ActivityProvider({children}) {
    const [activities, dispatch] = useReducer(activitiesReducer, [])

    const value = useMemo(() => ({
        activities, dispatch
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
