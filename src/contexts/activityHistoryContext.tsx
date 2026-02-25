import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import type { ActivityType } from "../types";

type HistoryAction =
  | { type: "ADD_TO_HISTORY"; payload: ActivityType }
  | { type: "CLEAR_HISTORY" };

const historyContext = createContext<{
  historyActivities: ActivityType[];
  historyDispatch: React.Dispatch<HistoryAction>;
} | null>(null);

function historyReducer(state: ActivityType[], action: HistoryAction): ActivityType[] {
  switch (action.type) {
    case "ADD_TO_HISTORY":
      return [...state, action.payload];

    case "CLEAR_HISTORY":
      return [];

    default:
      return state;
  }
}

export function ActivityHistoryProvider({ children }: { children: React.ReactNode }) {

  const [historyActivities, historyDispatch] = useReducer(

    historyReducer,

    [],

    () => {

      const item = localStorage.getItem("activityHistory");
      if (!item) return [];
      try {
        return JSON.parse(item);
      } catch {
        return [];
      }
    }
  );

  useEffect(() => {
    localStorage.setItem("activityHistory", JSON.stringify(historyActivities));
  }, [historyActivities]);
  const value = useMemo(
    () => ({ historyActivities, historyDispatch }),
    [historyActivities]
  );
  return <historyContext.Provider value={value}>{children}</historyContext.Provider>;
}

export function useActivityHistory() {

  const context = useContext(historyContext);
  if (!context) throw new Error("useActivityHistory used outside provider");
  return context;
}