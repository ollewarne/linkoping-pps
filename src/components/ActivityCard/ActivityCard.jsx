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
        <div style={{borderColor: backgroundColor }} className={styles.card}>
            {editMode ? 
            (
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

                    <div className={styles['edit-confirm']}>
                        <button type="submit" className={styles.editSubmit}>Save Activity</button>
                        <button onClick={() => setEditMode(false)} className={styles.editCancel}>Cancel</button>
                    </div>
                </form>
            ) : (
                <>
                <div className={styles.cardSpecificsTop}>
                    <p className={styles.scheduled}>{activity.scheduledTime.start} - {activity.scheduledTime.end}</p>
                    <p className={styles.category} style={{backgroundColor: backgroundColor}}>{activity.category}</p>
                </div>

                <p className={styles.title} style={{borderBottomColor: backgroundColor}}>{activity.title}</p>
                            
                <div className={styles.cardSpecificsBottom}>
                    
                    <p className={styles.duration}>Estimated duration: {activity.estimatedDuration} min</p>
                    
                    {confirmDelete ? (
                        <div className={styles.confirmContainer}>
                            <p className={styles.confirmText}>Are you sure?</p>
                            <button className={`${styles.confirmButton} ${styles.confirmYes}`} onClick={handleDelete}>Yes</button>
                            <button className={`${styles.confirmButton} ${styles.confirmNo}`} onClick={() => setConfirmDelete(false)}>No</button>
                        </div>
                    ) : (
                        <div className={styles['utility-buttons']}>
                            <button disabled={activity.isActive} onClick={() => setEditMode(true)}>
                                <img src="/settings.svg" alt="Edit icon" />
                            </button>
                            <button disabled={activity.isActive} onClick={() => setConfirmDelete(true)}>
                                <img src="/delete.svg" alt="Delete icon" />
                            </button>
                        </div>
                    )}
                </div>
                </>
            )}
        </div>
    )
}

export default ActivityCard;
