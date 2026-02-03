import styles from "./Schedule.module.css"
import { useActivities } from "../../contexts/activityContext";
import ActivityCard from "../ActivityCard/ActivityCard";

function Schedule() {
    const { activities } = useActivities();
    return (
        <div className={styles.container}>
            {
                activities.map(activity => <ActivityCard key={activity.id}  activity={activity}/>)
            }
        </div>
    )
}

export default Schedule;
