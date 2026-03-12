import styles from "./ActivityCard.module.css"
import { useState } from "react";
import { useActivities } from "../../contexts/activityContext";
import { createTimegapsArray } from "../../hooks/useActivityForm";
import { categoryColors } from "../../constants/categoryColors";
import { userOptions } from "../../constants/userOptions";
import { languageLibrary } from "../../locales/language";
import { useTranslator } from "../../contexts/languageContext";
import { calculateDuration } from "../../utils/validateTime";
import { convertStringTimeToMinutes } from "../../utils/convertTime";

function ActivityCard({ activity = {} }) {
    const [editMode, setEditMode] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const { language } = useTranslator();
    const categories = userOptions[language].category
    const { activityDispatch, timeBlocks } = useActivities();
    const [validationError, setValidationError] = useState("");


    const categoryColor = categoryColors[activity.category];

    const submitEdit = (form) => {
        const timeGaps = createTimegapsArray(timeBlocks);
        const start = convertStringTimeToMinutes(form.timeStart.value);
        const end = convertStringTimeToMinutes(form.timeEnd.value);

        const lowerTimeLimit = timeBlocks[0].start;
        const upperTimeLimit = timeBlocks[timeBlocks.length - 1].end;

        if (start < lowerTimeLimit || end > upperTimeLimit)
            throw new Error("The time is outside of designated work hours")
        if (!timeGaps.some(gap => gap.start <= start && gap.end >= end))
            throw new Error(`No timeslot exists for the time ${form.timeStart.value} - ${form.timeEnd.value}`);
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

    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;

        try {
            submitEdit(form)
            setEditMode(false)
        } catch (error) {
            setValidationError(error.message);
            form.timeStart.setCustomValidity(error.message);
            form.timeStart.reportValidity();
        }
    }

    const handleDelete = () => {
        activityDispatch({
            type: "DELETE_ACTIVITY",
            payload: { id: activity.id }
        })
    }

    return (
        <div style={{ borderColor: categoryColor }} className={styles.card}>
            {editMode ?
                (
                    <form className={styles.cardForm} onSubmit={(e) => {
                        handleSubmit(e)
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
                        <input name="timeStart" type="time" defaultValue={activity.scheduledTimeStart} onChange={(e) => {
                            e.target.setCustomValidity("");
                            setValidationError("");
                        }} />
                        <input name="timeEnd" type="time" defaultValue={activity.scheduledTimeStop} />

                        <div className={styles['edit-confirm']}>
                            <button type="submit" className={styles.editSubmit}>Save Activity</button>
                            <button onClick={() => setEditMode(false)} className={styles.editCancel}>Cancel</button>
                        </div>
                    </form>
                ) : (
                    <>
                        <div className={styles.cardSpecificsTop}>
                            <p className={styles.scheduled}>{activity.scheduledTimeStart} - {activity.scheduledTimeStop}</p>
                            <p className={styles.category} style={{ backgroundColor: categoryColor }}>{activity.category}</p>
                        </div>

                        <p className={styles.title} style={{ borderBottomColor: categoryColor }}>{activity.title}</p>

                        <div className={styles.cardSpecificsBottom}>

                            <p className={styles.duration}>Estimated duration: <span>{activity.totalDuration} min</span></p>

                            {activity.category !== "NonWork" && (
                                confirmDelete ? (
                                    <div className={styles.confirmContainer}>
                                        <p className={styles.confirmText}>Are you sure?</p>
                                        <button
                                            className={`${styles.confirmButton} ${styles.confirmYes}`}
                                            onClick={handleDelete}
                                        >
                                            Yes
                                        </button>
                                        <button
                                            className={`${styles.confirmButton} ${styles.confirmNo}`}
                                            onClick={() => setConfirmDelete(false)}
                                        >
                                            No
                                        </button>
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
                                )
                            )}
                        </div>
                    </>
                )}
        </div>
    )
}

export default ActivityCard;
