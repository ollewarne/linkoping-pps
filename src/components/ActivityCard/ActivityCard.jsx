import styles from "./ActivityCard.module.css"
import { useState } from "react";
import { useActivities } from "../../contexts/activityContext";
import { categoryColors } from "../../constants/categoryColors";
import { userOptions } from "../../constants/userOptions";
import { languageLibrary } from "../../locales/language";
import { useTranslator } from "../../contexts/languageContext";
import { calculateDuration } from "../../utils/validateTime";

function ActivityCard({ activity = {} }) {
    const [editMode, setEditMode] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const { language } = useTranslator();
    const categories = userOptions[language].category
    const { activityDispatch } = useActivities();

    const backgroundColor = categoryColors[activity.category];

    const submitEdit = (e) => {
        e.preventDefault()
        const form = e.target
        activityDispatch({
            type: "EDIT_ACTIVITY",
            payload: {
                id: activity.id,
                title: form.title.value,
                category: form.category.value,
                scheduledTime: { start: form.timeStart.value, end: form.timeEnd.value },
                estimatedDuration: calculateDuration(form.timeStart.value, form.timeEnd.value)
            }
        });
    };

    const handleDelete = () => {
        activityDispatch({
            type: "DELETE_ACTIVITY",
            payload: { id: activity.id }
        })
    }

    return (
        <div style={{ height: "20%", backgroundColor: backgroundColor }} className={styles.card}>
            {editMode ? (
                <form className={styles.cardForm} onSubmit={(e) => {
                    submitEdit(e)
                    setEditMode(false)
                }}>
                    <input name="title" type="text" defaultValue={activity.title} />
                    <select name="category" className="category" required defaultValue={activity.category}>
                        <option value="" disabled>{languageLibrary[language].form2CategoryDefault}</option>
                        {
                            categories.map((category) => {
                                return (<option key={category} value={category}>{category}</option>)
                            })
                        }
                    </select>
                    <input name="timeStart" type="time" defaultValue={activity.scheduledTime.start} />
                    <input name="timeEnd" type="time" defaultValue={activity.scheduledTime.end} />
                    <button type="submit">Save Activity</button>
                    <button onClick={() => setEditMode(false)}>Cancel</button>
                </form>
            ) : (
                <>
                    <p className={styles.content}><strong>{activity.title}</strong> | <strong>{activity.category}</strong> | <strong>{activity.estimatedDuration} min</strong></p>
                    <p><strong>Planned time</strong> | {activity.scheduledTime.start} - {activity.scheduledTime.end}</p>
                    {confirmDelete ? (
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <p>Are you sure?</p>
                            <button className={styles.confirmYes} onClick={handleDelete}>Yes</button>
                            <button className={styles.confirmNo} onClick={() => setConfirmDelete(false)}>No</button>
                        </div>
                    ) : (
                        <>
                            <button disabled={activity.isActive} onClick={() => setEditMode(true)}>Edit Activity</button>
                            <button disabled={activity.isActive} onClick={() => setConfirmDelete(true)}>Delete Activity</button>
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default ActivityCard;
