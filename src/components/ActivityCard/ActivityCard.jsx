import styles from "./ActivityCard.module.css"
import { useEffect } from "react";
import { useActivities } from "../../contexts/activityContext";
import { calculateDuration } from "../../utils/validateTime";
import { getWorkdayFromStorage } from "../../utils/workdayStorage";
import { useTheme } from "../../contexts/ThemeContext";

const workday = getWorkdayFromStorage();

const workdayMinutes = workday?.workHours?.start && workday?.workHours?.end
    ? calculateDuration(workday.workHours.start, workday.workHours.end)
    : 12 * 60;


function ActivityCard({ activity = {}, scheduledTime, index }) {

    const CARD_COLORS = ['#4ABFBD', '#6AAEE8', '#C45FD6', '#8B4DB0', '#6B72C8', '#4A4A9D'];

    const { activityDispatch } = useActivities();

    const backgroundColor = CARD_COLORS[index % CARD_COLORS.length];

    // kommer användas senare, ignoreras just nu
    const handleEdit = () => {

        activityDispatch({
            type: "EDIT_ACTIVITY",
            payload: {
                id: activity.id,
                title: newTitle,
                category: activity.category,
                estimatedDuration: activity.estimatedDuration
            }
        });
    };

    //updaterar tiden den ligger i schemat när den skapas
    useEffect(() => {
        activityDispatch({
            type: "SCHEDULE_ACTIVITY",
            payload: {
                id: activity.id,
                scheduledTime: scheduledTime
            }
        });
    }, []);

    const height = Math.floor((activity.estimatedDuration / workdayMinutes) * 100)
    return (
        <div style={{ height: "15%", backgroundColor }} className={styles.card}>
            <p className={styles.content}><strong>{activity.title}</strong> | <strong>{activity.category}</strong> | <strong>{activity.estimatedDuration} min</strong></p>
            <p><strong>Planned time</strong> | {activity.scheduledTime.start} - {activity.scheduledTime.end}</p>
        </div>
    )
}

export default ActivityCard;
