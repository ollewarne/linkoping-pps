import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import type { ActivityType } from "../types";

type DayBucket = {
  workdayData?: any;
  activities: ActivityType[];
};

export type HistoryData = Record<string, DayBucket>;

type HistoryAction =
  | { type: "ADD_TO_HISTORY"; payload: { dateKey: string; activity: ActivityType } }
  | { type: "CLEAR_HISTORY" };

const historyContext = createContext<{
  historyData: HistoryData;
  historyDispatch: React.Dispatch<HistoryAction>;
} | null>(null);

function historyReducer(state: HistoryData, action: HistoryAction): HistoryData {
  switch (action.type) {
    case "ADD_TO_HISTORY": {
      const { dateKey, activity } = action.payload;

      const toTimeKey = (k: string) => {
        if (/^\d{2}:\d{2}$/.test(k)) return k;

        const d = new Date(k);
        if (Number.isNaN(d.getTime())) return null;

        const hh = String(d.getHours()).padStart(2, "0");
        const mm = String(d.getMinutes()).padStart(2, "0");
        return `${hh}:${mm}`;
      };

      const rawStats = activity.statistics ?? {};

      const normalizedStats = Object.entries(rawStats).reduce<Record<string, any>>(
        (acc, [k, v]) => {
          const timeKey = toTimeKey(k);
          if (!timeKey || !v) return acc;

          acc[timeKey] = {
            efficiency: v.efficiency,
            productivity: v.productivity,
            factor: v.factor ?? null,
          };

          return acc;
        },
        {}
      );

      const normalizedActivity = {
        ...activity,
        statistics: normalizedStats,
      };

      const existingDay = state[dateKey] ?? { activities: [] };

      return {
        ...state,
        [dateKey]: {
          ...existingDay,
          activities: [...existingDay.activities, normalizedActivity],
        },
      };
    }

    case "CLEAR_HISTORY":
      return {};

    default:
      return state;
  }
}

export function ActivityHistoryProvider({ children }: { children: React.ReactNode }) {
  const [historyData, historyDispatch] = useReducer(historyReducer, {}, () => {
    const item = localStorage.getItem("activityHistory");
    if (!item) return {};
    try {
      return JSON.parse(item);
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("activityHistory", JSON.stringify(historyData));
  }, [historyData]);

  const value = useMemo(() => ({ historyData, historyDispatch }), [historyData]);

  return <historyContext.Provider value={value}>{children}</historyContext.Provider>;
}

export function useActivityHistory() {
  const context = useContext(historyContext);
  if (!context) throw new Error("useActivityHistory used outside provider");
  return context;
}

export function getDateKeyFromIso(iso: string) {
  const d = new Date(iso);
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}