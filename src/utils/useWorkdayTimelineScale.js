import { useEffect, useMemo, useState } from "react";
import { getWorkdayFromStorage } from "./workdayStorage";
import { hhmmToMinutes } from "./validateTime";

export const PX_PER_HOUR = 80;

export function useWorkdayTimelineScale() {
  const [workday, setWorkday] = useState(() => getWorkdayFromStorage());

  useEffect(() => {
    const onUpdate = () => setWorkday(getWorkdayFromStorage());
    window.addEventListener("workdayDataUpdated", onUpdate);
    return () => window.removeEventListener("workdayDataUpdated", onUpdate);
  }, []);

  const { dayStartMin, dayEndMin, totalMinutes, heightPx } = useMemo(() => {
    const fallbackStart = 6 * 60;
    const fallbackEnd = 18 * 60;

    const start = workday?.workHours?.start
      ? hhmmToMinutes(workday.workHours.start)
      : fallbackStart;

    const end = workday?.workHours?.end
      ? hhmmToMinutes(workday.workHours.end)
      : fallbackEnd;

    const s = Math.min(start, end);
    const e = Math.max(start, end);

    const total = Math.max(1, e - s);
    const height = Math.round((total / 60) * PX_PER_HOUR);

    return {
      dayStartMin: s,
      dayEndMin: e,
      totalMinutes: total,
      heightPx: height,
    };
  }, [workday]);

  return { workday, dayStartMin, dayEndMin, totalMinutes, heightPx };
}