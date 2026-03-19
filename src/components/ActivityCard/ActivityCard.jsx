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
        const start = convertStringTimeToMinutes(form.timeStart.value);
        const end = convertStringTimeToMinutes(form.timeEnd.value);

        

        const originalStart = convertStringTimeToMinutes(activity.scheduledTimeStart);
        const originalEnd = convertStringTimeToMinutes(activity.scheduledTimeStop);

        const timeChanged = start !== originalStart || end !== originalEnd;

        if (timeChanged) {
            const timeGaps = createTimegapsArray(timeBlocks);
        
            const lowerTimeLimit = timeBlocks[0].start;
            const upperTimeLimit = timeBlocks[timeBlocks.length - 1].end;

            if (start < lowerTimeLimit || end > upperTimeLimit)
                throw new Error("The time is outside of designated work hours")
            if (!timeGaps.some(gap => gap.start <= start && gap.end >= end))
                throw new Error(`No timeslot exists for the time ${form.timeStart.value} - ${form.timeEnd.value}`);
        }
        
        activityDispatch({
            type: "EDIT_ACTIVITY",
            payload: {
                id: activity.id,
                title: form.title.value,
                category: form.category.value,
                scheduledTime: { start: form.timeStart.value, end: form.timeEnd.value },
                estimatedDuration: calculateDuration(form.timeStart.value, form.timeEnd.value) * 60
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
        <div className={styles.cardContainer}>
            {editMode ?
                (
                    <form className={styles.cardForm} onSubmit={(e) => {
                        handleSubmit(e)
                    }}>
                        {/* --------------- CARD EDIT FORM --------------- */}

                        <div className={styles.cardFormHeader} style={{backgroundColor: categoryColor}}>
                            <div className={styles.cardFormHeaderTime}>
                                
                                <input name="timeStart" type="time" defaultValue={activity.scheduledTimeStart} onChange={(e) => {
                                    e.target.setCustomValidity("");
                                    setValidationError("");
                                }}/>
                                <input name="timeEnd" type="time" defaultValue={activity.scheduledTimeStop} />
                            </div>

                            <select name="category" className={`category ${styles.category}` } required defaultValue={activity.category}>
                                <option value="" disabled>{languageLibrary[language].form2CategoryDefault}</option>
                                {
                                    categories.map((category) => {
                                        return (<option key={category} value={category}>{category}</option>)
                                    })
                                }
                            </select>
                        </div>

                        <input name="title" type="text" defaultValue={activity.title} style={{borderColor:categoryColor}} maxLength={120} />

                        {/* --------------- EDIT CONFIRM BUTTONS --------------- */}
                        <div className={styles['edit-confirm']}>
                            <button type="submit" className={styles.editSubmit}>Save</button>
                            <button onClick={() => setEditMode(false)} className={styles.editCancel}>Cancel</button>
                        </div>

                    </form>
                ) : (
                    <div className={styles.card}>

                        {/* ------------------------------------------------------- */}
                        {/* --------------- KOLLA SÅ ACTIVE FUNKAR? --------------- */}
                        {/* ------------------------------------------------------- */}


                        {/* --------------- CARD HEADER --------------- */}
                        <div className={styles.cardHeader} style={{backgroundColor: categoryColor}}>
                            <div className={styles.cardHeaderContainer}>
                                <p className={styles.cardHeaderScheduled}>{activity.scheduledTimeStart} - {activity.scheduledTimeStop}</p>

                                {/* <div>
                                {!activity.isActive 
                                    ? <></>
                                    : <p>Active</p>}
                                {!activity.isActive 
                                ? <></>
                                : <img src="/throbber.svg" alt="" className={styles.activityThrobber}/>
                                }
                                </div> */}

                                <p className={styles.cardHeaderCategory}>{activity.category}</p>

                            </div>

                        {/* ------------------------------------------------------- */}
                        {/* ------------------------------------------------------- */}
                        {/* ------------------------------------------------------- */}

                        </div>

                        {/* --------------- CARD MAIN --------------- */}
                        <div className={styles.cardMain}>

                            <p className={styles.cardMainTitle} style={{ borderBottomColor: categoryColor }}>{activity.title}</p>

                            {/* --------------- CARD FOOTER --------------- */}
                            <div className={styles.cardFooter}>

                                <p className={styles.cardFooterDuration}>Estimated duration: <span>{activity.totalDuration / 60} min</span></p>

                                {/* --------------- DELETE CONFIRM --------------- */}
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
                                        // --------------- CARD FOOTER: UTILITY BUTTONS ---------------
                                        <>                                       { !activity.isActive && (
                                        <div className={styles['utility-buttons']}>
                                            <button disabled={activity.isActive} onClick={() => setEditMode(true)}>
                                                <img src="/settings.svg" alt="Edit icon" />
                                            </button>
                                            <button disabled={activity.isActive} onClick={() => setConfirmDelete(true)}>
                                                <img src="/delete.svg" alt="Delete icon" />
                                            </button>
                                        </div>
                                        )
                                        }
                                        </>
 
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default ActivityCard;
