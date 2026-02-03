import { useEffect, useState } from "react";
import { toTotalMinutes } from "../../utils/validateTime.js";

export default function DayProgressTimeline() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const minutesNow = toTotalMinutes(now.getHours(), now.getMinutes());

  const dayStart = 6 * 60;
  const dayEnd = 18 * 60;
  const dayTotal = dayEnd - dayStart;

  const percentNow = ((minutesNow - dayStart) / dayTotal) * 100;

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
          height: `${percentNow}%`,
          backgroundColor: "#cce5ff",
        }}
      />
    </div>
  );
}
