import { useEffect, useState } from "react";
import { toTotalMinutes } from "../../utils/validateTime";
import { useWorkdayTimelineScale } from "../../utils/useWorkdayTimelineScale";

export default function DayProgressTimeline() {
  const [now, setNow] = useState(new Date());
  const { dayStartMin, totalMinutes } = useWorkdayTimelineScale();

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const minutesNow = toTotalMinutes(now.getHours(), now.getMinutes());

  let percent = ((minutesNow - dayStartMin) / totalMinutes) * 100;
  if (percent < 0) percent = 0;
  if (percent > 100) percent = 100;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: "40px",
        width: "12px",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: `${percent}%`,
          backgroundColor: "#cce5ff",
        }}
      />
    </div>
  );
}