import { createContext, useContext, useState, useEffect, useMemo } from 'react'

const activityContext = createContext(null);

export function ActivityProvider({children}) {
    const [activities, setActivities] = useState([]);

    const value = useMemo(() => ({
        activities, setActivities
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
