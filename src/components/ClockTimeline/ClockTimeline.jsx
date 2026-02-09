import { useMemo } from "react";
import DayProgressTimeline from "./DayProgressTimeline";
import TimeScale from "./TimeScale";
import { useActivities } from "../../contexts/activityContext";

export default function ClockTimeline() {
  const { activities } = useActivities();

  const blocks = useMemo(() => {
    return activities
      .filter(a => a?.isMeeting && a?.meetingTimes?.start && a?.meetingTimes?.end)
      .map(a => ({
        start: a.meetingTimes.start,
        end: a.meetingTimes.end,
      }));
  }, [activities]);

  return (
    <div style={{ width: "120px", height: "100%", position: "relative" }}>
      <TimeScale />
      <DayProgressTimeline />
    </div>
  );
}