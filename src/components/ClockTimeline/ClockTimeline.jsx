import { useMemo } from "react";
import DayProgressTimeline from "./DayProgressTimeline.jsx";
import WorkingHoursTimeline from "./WorkingHoursTimeline.jsx";
import ActivityHoursTimeline from "./ActivityHoursTimeline.jsx";
import TimeScale from "./TimeScale.jsx";
import { useActivities } from "../../contexts/activityContext.jsx";

export default function ClockTimeline() {
  const { activities } = useActivities();

  const blocks = useMemo(() => {
    return activities
      .filter((a) => a?.isMeeting && a?.meetingTimes?.start && a?.meetingTimes?.end)
      .map((a) => ({
        start: a.meetingTimes.start,
        end: a.meetingTimes.end,
      }));
  }, [activities]);

  return (
    <div style={{ width: "120px", height: "100%", position: "relative" }}>
      <TimeScale />

      <DayProgressTimeline />
      <WorkingHoursTimeline />
      <ActivityHoursTimeline blocks={blocks} />
    </div>
  );
}