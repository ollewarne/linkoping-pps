import styles from "./ActivityCard.module.css"
import { useEffect } from "react";
import { useActivities } from "../../contexts/activityContext";
import { calculateDuration } from "../../utils/validateTime";
import { getWorkdayFromStorage } from "../../utils/workdayStorage";

const workday = getWorkdayFromStorage();

const workdayMinutes = workday?.workHours?.start && workday?.workHours?.end
  ? calculateDuration(workday.workHours.start, workday.workHours.end)
  : 12 * 60;

const colors = {
    "1": "#FFB3BA",
    "2": "#FFCBA4",
    "3": "#FFF5BA",
    "4": "#BAE1FF",
    "5": "#D3D3D3",
};


function ActivityCard({ activity = {}, scheduledTime }) {

    const { dispatch } = useActivities();

    // kommer användas senare, ignoreras just nu
    const handleEdit = () => {

        dispatch({
            type: "EDIT_ACTIVITY",
            payload: {
                id: activity.id,
                title: newTitle,
                category: activity.category,
                ranking: activity.ranking,
                estimatedDuration: activity.estimatedDuration
            }
        });
    };

    //updaterar tiden den ligger i schemat när den skapas
    useEffect(() => {
        dispatch({
            type: "SCHEDULE_ACTIVITY",
            payload: {
                id: activity.id,
                scheduledTime: scheduledTime
            }
        });
    }, []);

    const height = Math.floor((activity.estimatedDuration / workdayMinutes) * 100)

    return (
        <div style={{ paddingLeft: "1em", border: "2px solid black", height: `${height}%`, backgroundColor: `${colors[activity.ranking]}`, width: "90%", color: "black", borderRadius: "8px" }}>
            <p><strong>{activity.title}</strong> | <strong>{activity.category}</strong> | <strong>{activity.estimatedDuration} min</strong></p>
        </div>
    )
}

export default ActivityCard;
