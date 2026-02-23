import { useRef, useState } from "react";
import styles from "./ActivityForm.module.css"
import { useActivities } from "../../contexts/activityContext";
import { userOptions } from "../../constants/userOptions";
import { languageLibrary } from "../../locales/language";
import { useTranslator } from "../../contexts/languageContext";
import { useNotification } from "../../contexts/NotificationContext";
import { useActivityForm } from "../../hooks/useActivityForm";

function ActivityForm({ onClose }) {
    const { language } = useTranslator();
    const [validationError, setValidationError] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const { showNotification } = useNotification();

    const categories = userOptions[language].category

    const { addActivityToPlanner, addMeetingActivityToPlanner, startActivity, startMeetingActivity } = useActivityForm();

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

    function handleFormAction(e, action) {
        const form = e.target.closest("form") ?? e.target;
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

        e.preventDefault();
        action(form);

        form.reset();
        hoursInput.setCustomValidity('');
        minutesInput.setCustomValidity('');
        setValidationError('');
        showNotification("Activity Saved!");
        onClose();

    }

    function handleSubmit(e) {
        handleFormAction(e, (form) => {
            form.category.value === "Meeting" || form.category.value === "Möte" 
                ? addMeetingActivityToPlanner(form) : addActivityToPlanner(form);
        })
    }

    function handleActivityStart(e) {
        handleFormAction(e, (form) => {
            form.category.value === "Meeting" || form.category.value === "Möte" 
                ? startMeetingActivity(form) : startActivity(form);
        })
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
                    selectedCategory === "Meeting" || selectedCategory === 'Möte' ? (
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
                <div style={{ display: "flex" }}>
                    <button type="button" onClick={handleActivityStart}>Start Activity</button>
                    <button type="submit">Add To Planner</button>
                </div>
            </form>
        </div>
    )
}

export default ActivityForm;
