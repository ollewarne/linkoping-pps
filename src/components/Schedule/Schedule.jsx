import styles from "./Schedule.module.css";
import { useActivities } from "../../contexts/activityContext";
import ActivityCard from "../ActivityCard/ActivityCard";
import ClockTimeline from "../ClockTimeline/ClockTimeline";

function Schedule() {
  const { activities } = useActivities();

  return (
    <div className={styles.container}>
      <ClockTimeline />
      <div className={styles.list}>
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} /*scheduledTime={} släng in tiden som kortet hamnar på i schemat här*/ />
        ))}
      </div>
    </div>
  );
}

export default Schedule;
