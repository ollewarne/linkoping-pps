import { useMemo } from "react";
import { minutesToHHMM } from "../../utils/validateTime";
import { useWorkdayTimelineScale } from "../../utils/useWorkdayTimelineScale";

export default function TimeScale() {
  const { dayStartMin, dayEndMin, totalMinutes } = useWorkdayTimelineScale();

  const ticks = useMemo(() => {
    const list = [];
    list.push(dayStartMin);

    const firstHour = Math.ceil(dayStartMin / 60) * 60;
    for (let t = firstHour; t < dayEndMin; t += 60) {
      list.push(t);
    }

    list.push(dayEndMin);
    return Array.from(new Set(list));
  }, [dayStartMin, dayEndMin]);

  return (
    <>
      {ticks.map((t) => {
        const top = ((t - dayStartMin) / totalMinutes) * 100;
        return (
          <div
            key={t}
            style={{
              position: "absolute",
              top: `${top}%`,
              left: "0px",
              transform: "translateY(-50%)",
              fontSize: "10px",
              color: "#aaa",
            }}
          >
            {minutesToHHMM(t)}
          </div>
        );
      })}
    </>
  );
}