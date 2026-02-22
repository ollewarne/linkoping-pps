import styles from "./Schedule.module.css";
import { useActivities } from "../../contexts/activityContext";
import ActivityCard from "../ActivityCard/ActivityCard";
import ClockTimeline from "../ClockTimeline/ClockTimeline";
import { useWorkdayTimelineScale } from "../../utils/useWorkdayTimelineScale";
import { useTheme } from "../../contexts/ThemeContext";

function Schedule() {
    const { activities } = useActivities();
    const { heightPx } = useWorkdayTimelineScale();

    return (
        <div className={styles.container} style={{ height: `${heightPx}px` }}>
            <ClockTimeline />
            <div className={styles.list}>
                {activities.map((a, index) => (
                    <ActivityCard key={a.id} activity={a} index={index} />
                ))}
            </div>
        </div>
    );
}

export default Schedule;
