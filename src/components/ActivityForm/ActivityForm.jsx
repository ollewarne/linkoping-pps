import styles from "./ActivityForm.module.css"
import Modal from "../Modal/Modal";
import { languageLibrary } from "../../locales/language.ts";
import { useTranslator } from "../../contexts/languageContext";
import { useState } from "react";
import { userOptions } from "../../constants/userOptions";
import { useNotification } from "../../contexts/NotificationContext";
import { useActivityForm } from "../../hooks/useActivityForm";
import { getWorkdayFromStorage } from "../../utils/workdayStorage";
import WorkDayForm from "../WorkDayForm/WorkDayForm";


function ActivityForm({ onClose, planMode = false }) {

    // ----- STATES FÖR ATT STYRA ANVÄNDARFLÖDET I FORMET ----- 
    const [showForm, setShowForm] = useState(planMode ? true : false);
    const [isScheduled, setIsScheduled] = useState(planMode);
    const [scheduleOption, setScheduleOption] = useState(null);
    const [showScheduleOption, setShowScheduleOption] = useState(false);

    let workformData = getWorkdayFromStorage();
    // --------------------------------------------------------- 

    const { language } = useTranslator();
    const [validationError, setValidationError] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const { showNotification } = useNotification();

    const categories = userOptions[language].category

    const { addActivityToPlanner, addMeetingActivityToPlanner, startActivity, startMeetingActivity } = useActivityForm();

    function validateInputs(hoursValue, minutesValue) {
        const hours = parseFloat(hoursValue) || 0;
        const minutes = parseFloat(minutesValue) || 0;

        if (hours <= 0 && minutes <= 0) {
            return languageLibrary[language].errorGreaterThanZero // 'One field must be greater than 0'
        }
        return "";
    }

    function handleInputChange(e) {
        e.target.setCustomValidity('');
        setValidationError('');
    }

    function handleFormAction(e, action) {
        e.preventDefault();

        const form = e.target;
        const hoursInput = form.hours;
        const minutesInput = form.minutes;

        const error = validateInputs(hoursInput.value, minutesInput.value);

        if (error) {
            setValidationError(error);
            hoursInput.setCustomValidity(error);
            minutesInput.setCustomValidity(error);
            hoursInput.reportValidity();
            return false;
        }

        hoursInput.value = hoursInput.value || 0;
        minutesInput.value = minutesInput.value || 0;

        hoursInput.setCustomValidity('');
        hoursInput.reportValidity();
        minutesInput.setCustomValidity('');
        minutesInput.reportValidity();

        try {
            action(form);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Something went wrong";
            hoursInput.setCustomValidity('');
            hoursInput.reportValidity();
            hoursInput.setCustomValidity(message);
            hoursInput.reportValidity();
            return false;
        }

        form.reset();
        setValidationError('');
        showNotification("Activity Saved!");
        onClose();
    }

    // ------------------ HANDLE SUBMIT ------------------
    function handleSubmit(e) {
        handleFormAction(e, (form) => {
            isScheduled
                ? addActivityToPlanner(form) : startActivity(form);
        })
    }

    return (
        <div className={styles.container}>

            {/* ---------- REGISTER ACTIVITY ---------- */}

            {workformData ? (
                <>
                
                    <form onSubmit={handleSubmit}>

                        {/* ---------- SHOW FORM ---------- */}
                        
                        {isScheduled ? <h2>{languageLibrary[language].aFormActivityPlan}</h2> : <h2>{languageLibrary[language].aFormTimerSubmit}</h2> /* Plan Activity : Start Timer  */}


                            <>

                                {/* ---------- CATEGORY & TITLE ---------- */}
                                <fieldset>
                                    <legend>{languageLibrary[language].aFormActivity}</legend> {/* Activity */}
                                    <label htmlFor="category">{languageLibrary[language].aFormCategory}</label> {/* Category */}
                                    <select name="category" className="category" required defaultValue={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                                        <option value="" disabled>{languageLibrary[language].aFormCategoryDefault}</option> {/* Pick a category */}
                                        {
                                            categories.map((category) => {
                                                return (<option key={category} value={category}>{category}</option>)
                                            })
                                        }
                                    </select>
                                    <label htmlFor="activityTitle">{languageLibrary[language].aFormTitle}</label> {/* Title */}
                                    <input name="activityTitle" type="text" placeholder={languageLibrary[language].aFormTitleDefault} required maxLength={120} /> {/* Enter a title */}
                                </fieldset>


                                {/* ---------- START ACTIVITY OR SCHEDULE ---------- */}
                                {!isScheduled ? (

                                    // IS NOT SCHEDULED: Enter ESTIMATED DURATION
                                    <fieldset>
                                        <legend>{languageLibrary[language].aFormEstimated}</legend> {/* Estimated Duration */}
                                        <label htmlFor="hours">{languageLibrary[language].hours}</label> {/* Hours */}
                                        <input name="hours" type="number" placeholder="0" defaultValue="" min="0" onChange={handleInputChange} />
                                        <label htmlFor="minutes">{languageLibrary[language].minutes}</label> {/* Minutes */}
                                        <input name="minutes" type="number" placeholder="0" defaultValue="" min="0" onChange={handleInputChange} />
                                    </fieldset>

                                ) : (

                                    // IS SCHEDULED: BUTTONS FOR SCHEDULE TIME OR ESIMATE TIME

                                    // ---------- RADIO BUTTONS TO MAKE CHOISE: TIME or ESTIMATE ----------
                                    <>
                                        <fieldset>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="scheduleOption"
                                                    value="time"
                                                    checked={scheduleOption === "time"}
                                                    onChange={(e) => {
                                                        setScheduleOption(e.target.value)
                                                        setShowScheduleOption(true)
                                                    }} />
                                                    {languageLibrary[language].aFormEnterScheduleTime} {/* Schedule start & end time */}
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="scheduleOption"
                                                    value="duration"
                                                    checked={scheduleOption === "duration"}
                                                    onChange={(e) => {
                                                        setScheduleOption(e.target.value)
                                                        setShowScheduleOption(true)
                                                    }} />
                                                {languageLibrary[language].aFormEnterDuration} {/* Enter activity duration */}
                                            </label>
                                        </fieldset>

                                        {/* SHOW INPUT FIELD DEPENDING ON RADIOBUTTON CHOICE */}
                                        {showScheduleOption && (

                                            <>
                                                {/* RADIOBUTTON: TIME */}
                                                {scheduleOption === 'time' && (
                                                    <fieldset>
                                                        <legend>{languageLibrary[language].times}</legend> {/* Times */}
                                                        <label htmlFor="hours">{languageLibrary[language].start}</label> {/* Start */}
                                                        <input onChange={handleInputChange} name="hours" type="time" step={60} required />
                                                        <label htmlFor="minutes">{languageLibrary[language].end}</label> {/* End */}
                                                        <input onChange={handleInputChange} name="minutes" type="time" step={60} required />
                                                    </fieldset>
                                                )}

                                                {/* RADIOBUTTON: DURATION */}
                                                {scheduleOption === 'duration' && (
                                                    <fieldset>
                                                        <legend>{languageLibrary[language].aFormEstimated}</legend> {/* Estimated Duration' */}
                                                        <label htmlFor="hours">{languageLibrary[language].hours}</label> {/* Hours */}
                                                        <input name="hours" type="number" placeholder="0" defaultValue="" min="0" onChange={handleInputChange} />
                                                        <label htmlFor="minutes">{languageLibrary[language].minutes}</label> {/* Minutes */}
                                                        <input name="minutes" type="number" placeholder="0" defaultValue="" min="0" onChange={handleInputChange} />
                                                    </fieldset>
                                                )}
                                            </>
                                        )}
                                    </>
                                )}


                                {/* TIME STRUCTURE  */}
                                <fieldset>
                                    <legend>{languageLibrary[language].aFormTimeStructure}</legend> {/* Time Structure */}
                                    <label htmlFor="activeTime">{languageLibrary[language].active}</label> {/* Active */}
                                    <input type="number" name="activeTime" defaultValue={25} min="0" />
                                    <label htmlFor="breakTime">{languageLibrary[language].break}</label> {/* Break */}
                                    <input type="number" name="breakTime" defaultValue={5} min="0" />
                                </fieldset>

                                <div style={{ display: "flex", justifyContent: 'center'}}>

                                    <button type="submit" className={styles.buttonSubmit}>
                                        {isScheduled ? languageLibrary[language].aFormScheduleSubmit : languageLibrary[language].aFormTimerSubmit /* Add to Planner : Start Timer  */}
                                    </button>
                                </div>
                            </>
                        
                    </form>
                </>) : (
                <>
                    <p>{languageLibrary[language].aFormEnterWD}</p> {/* Please enter the specifics for your workday before registering activities */}
                    <WorkDayForm />
                </>
            )}
        </div>
    )
}

export default ActivityForm;
