import { useRef, useState } from "react";
import styles from "./ActivityForm.module.css"
import { useActivities } from "../../contexts/activityContext";
import { calculateDuration, toTotalMinutes } from "../../utils/validateTime";

import { userOptions } from "../../constants/userOptions";
import { languageLibrary } from "../../locales/language";
import { useTranslator } from "../../contexts/languageContext";
import { useNotification } from "../../contexts/NotificationContext";

function getNextActivityId(activities) {
  const ids = activities
    .map((a) => Number(a.id))
    .filter((n) => Number.isFinite(n));
  return ids.length ? Math.max(...ids) + 1 : 1;
}
function ActivityForm({ onClose }) {
    const {language} =useTranslator();
    const [validationError, setValidationError] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const { activities, activityDispatch } = useActivities();
    const { showNotification } = useNotification();
    const nextId = getNextActivityId(activities);

    const categories = userOptions[language].category
    // ["Administrative", "Creative", "Technical", "Analytical", "Communication", "Planning", "Learning", "Sales & Marketing", "Support", "Operations", "Meeting"]



    function validateInputs(hoursValue, minutesValue) {
        const hours = +hoursValue;
        const minutes = +minutesValue;

        if (hours <= 0 && minutes <= 0) {
            return languageLibrary[language].errorGreaterThanZero
        }
        return "";
    }

    function handleBlur(e) {
        const form = e.target.form;
        const hoursInput = form.hours;
        const minutesInput = form.minutes;

        const error = validateInputs(hoursInput.value, minutesInput.value);
        setValidationError(error);

        hoursInput.setCustomValidity(error);
        minutesInput.setCustomValidity(error);
    }

    function handleSubmit(e) {
        const form = e.target;
        const hoursInput = form.hours;
        const minutesInput = form.minutes;
        const error = validateInputs(hoursInput.value, minutesInput.value);

        if (error) {
            e.preventDefault()
            setValidationError(error);
            hoursInput.setCustomValidity(error);
            hoursInput.reportValidity();
            return false;
        }

        e.preventDefault()
        if (form.category.value === "Meeting" || form.category.value === "Möte") {
            const newActivity = {
                scheduledTime: null,
                id: nextId,
                category: form.category.value,
                isMeeting: true,
                title: form.activityTitle.value,
                meetingTimes: { start: hoursInput.value, end: minutesInput.value },
                estimatedDuration: calculateDuration(hoursInput.value, minutesInput.value),
                currentlyActive: false,
                totalTimeSpent: 0,
                statistics: {}
            };
            activityDispatch({type: "ADD_MEETING", payload: {...newActivity}})
        } else {
            const newActivity = {
                scheduledTime: null,
                id: nextId,
                category: form.category.value,
                isMeeting: false,
                title: form.activityTitle.value,
                estimatedDuration: toTotalMinutes(+hoursInput.value, +minutesInput.value),
                activeTime: form.activeTime.value,
                breakTime: form.breakTime.value,
                currentlyActive: false,
                totalTimeSpent: 0,
                statistics: {}
            };
            activityDispatch({type: "ADD_ACTIVITY", payload: {...newActivity}})
        }

        // activityId.current++


        form.reset();

        hoursInput.setCustomValidity('');
        minutesInput.setCustomValidity('');
        setValidationError('');
        showNotification("Activity Saved!");
        onClose();
    }

    return (
        <div className={styles.container}>
            <h2>{languageLibrary[language].form2Header}</h2>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>{languageLibrary[language].form2Activity}</legend>
                    <label htmlFor="category">{languageLibrary[language].form2Category}</label>
                    <select name="category" className="category" required defaultValue={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="" disabled>{languageLibrary[language].form2CategoryDefault}</option>
                        {
                            categories.map((category) => {
                                return (<option key={category} value={category}>{category}</option>)
                            })
                        }
                    </select>
                    <label htmlFor="activityTitle">{languageLibrary[language].form2Title}</label>
                    <input name="activityTitle" type="text" placeholder={languageLibrary[language].form2TitleDefault} required maxLength={50} />
                </fieldset>
                {
                    selectedCategory === "Meeting" || selectedCategory === 'Möte'? (
                        <fieldset>
                            <legend>{languageLibrary[language].times}</legend>
                            <label htmlFor="hours">{languageLibrary[language].start}</label>
                            <input name="hours" type="time" step={60} required />
                            <label htmlFor="minutes">{languageLibrary[language].end}</label>
                            <input name="minutes" type="time" step={60} required />
                        </fieldset>
                    ) : (
                        <>
                            <fieldset>
                                <legend>{languageLibrary[language].form2EstimatedDuration}</legend>
                                <label htmlFor="hours">{languageLibrary[language].hours}</label>
                                <input name="hours" type="number" defaultValue={0} onBlur={handleBlur} />
                                <label htmlFor="minutes">{languageLibrary[language].minutes}</label>
                                <input name="minutes" type="number" defaultValue={0} onBlur={handleBlur} />
                            </fieldset>
                            <fieldset>
                                <legend>{languageLibrary[language].form2TimeStructure}</legend>
                                <label htmlFor="activeTime">{languageLibrary[language].active}</label>
                                <input type="number" name="activeTime" defaultValue={25} />
                                <label htmlFor="breakTime">{languageLibrary[language].break}</label>
                                <input type="number" name="breakTime" defaultValue={5} />
                            </fieldset>
                        </>
                    )
                }
                <button type="submit">{languageLibrary[language].form2Submit}</button>
            </form>
        </div>
    )
}

export default ActivityForm;
