import styles from "./Schedule.module.css";
import { useActivities } from "../../contexts/activityContext";
import ActivityCard from "../ActivityCard/ActivityCard";
import ClockTimeline from "../ClockTimeline/ClockTimeline";

function Schedule() {
    const { activities } = useActivities();

    return (
        <div className={styles.container}>
                {activities.filter(a => a.scheduledTime).map((a, index) => (
                    <ActivityCard key={a.id} activity={a} index={index} />
                ))}
        </div>
    );
}

export default Schedule;
