import { useRef, useState } from "react";
import { toTotalMinutes } from "../../utils/validateTime.js";
import styles from "./WorkDayForm.module.css"

import { languageLibrary } from "../../locales/language.js";
import { userOptions } from "../../constants/userOptions.js";

 import { saveWorkdayToStorage } from "../../utils/workdayStorage.js";
 import { useTranslator } from "../../contexts/languageContext.jsx";


// let language = 'sv' // HÅRDKOD FÖR TEST --- TA BORT SEN


// Konvertera string input från formulär till minuter för tids-validerings logik
const convertStringTimeToMinutes = (time) => {
    if (!time) return null;

    const [hours, minutes] = time.split(":").map(Number);
    return toTotalMinutes(hours, minutes);
};


function WorkDayForm() {

    const {language} =useTranslator();

    const workHoursStart = useRef(null);
    const workHoursEnd = useRef(null);
    const nonWorkHoursStart = useRef(null);
    const nonWorkHoursEnd = useRef(null);
    const workEnvironment = useRef(null);

    const [errors, setErrors] = useState({});
    const [hasNonWorkHours, setHasNonWorkHours] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const environmentOptions = userOptions[language].workEnvironment
    // [ 'Home', 'Private office', 'Shared Office', 'Open-plan Office', 'Public Place', 'Hybrid work'];

 
    function handleSubmit(e) {

        e.preventDefault();

        const workDayFormErrors = {};

        const workStart = workHoursStart.current.value;
        const workEnd = workHoursEnd.current.value;
        const environment = workEnvironment.current.value;

        let nonWorkStart = null;
        let nonWorkEnd = null;


        /* ------------------ WORK HOURS ------------------ */
        if (!workStart || !workEnd) {
            workDayFormErrors.workHours = 
            //'Please enter your working hours';
            languageLibrary[language].errorNoWorkHours
        } else if (convertStringTimeToMinutes(workStart) >= convertStringTimeToMinutes(workEnd)) {
            workDayFormErrors.workHours =
                // 'Working hours start-time must be before end-time';
                languageLibrary[language].errorStartBeforeEnd;
        }

        /* ---------------- NON-WORK HOURS ---------------- */
        if (hasNonWorkHours) {
            nonWorkStart = nonWorkHoursStart.current?.value;
            nonWorkEnd = nonWorkHoursEnd.current?.value;

            if (!nonWorkStart || !nonWorkEnd) {
                workDayFormErrors.nonWorkHours =
                    // 'Please enter your non-working hours';
                    languageLibrary[language].errorNoNonWorkHours;
            } else if (
                convertStringTimeToMinutes(nonWorkStart) >=
                convertStringTimeToMinutes(nonWorkEnd)
            ) {
                workDayFormErrors.nonWorkHours = 
                // 'Non-working hours start-time must be before end-time';
                languageLibrary[language].errorStartBeforeEnd;
            } else {
                const workStartMin = convertStringTimeToMinutes(workStart);
                const workEndMin = convertStringTimeToMinutes(workEnd);
                const nonWorkStartMin = convertStringTimeToMinutes(nonWorkStart);
                const nonWorkEndMin = convertStringTimeToMinutes(nonWorkEnd);

                if (
                    nonWorkStartMin <= workStartMin ||
                    nonWorkEndMin >= workEndMin
                ) {
                    workDayFormErrors.nonWorkHours = 
                    // 'Non-working hours must be within your working hours';
                    languageLibrary[language].errorHoursBetweenWorkingHours;
                }
            }
        }

        /* ---------------- ENVIRONMENT ---------------- */
        if (environment === 'default') {
            workDayFormErrors.environment =
                // 'Please select your work environment';
                languageLibrary[language].errorNoWorkEnvironment;
        }

        if (Object.keys(workDayFormErrors).length > 0) {
            setErrors(workDayFormErrors);
            setIsSubmitted(false);
            return;
        }

        setErrors({});
        setIsSubmitted(true);

        const workdayData = {
            workHours: { start: workStart, end: workEnd },
            nonWorkHours: hasNonWorkHours
                ? { start: nonWorkStart, end: nonWorkEnd }
                : null,
            workEnvironment: { location: environment },
        };

        // SPARA DATA
        // localStorage.setItem('workdayData', JSON.stringify(workdayData))

        //sac
        saveWorkdayToStorage(workdayData);
        console.log(workdayData);

        /* ---------------- RESET ---------------- */
        workHoursStart.current.value = '';
        workHoursEnd.current.value = '';
        workEnvironment.current.value = 'default';

        if (hasNonWorkHours) {
            nonWorkHoursStart.current.value = '';
            nonWorkHoursEnd.current.value = '';
        }

        setHasNonWorkHours(false);
    }

    return (
        <>
        <h2>{languageLibrary[language].form1Header}</h2> {/* ---- */}

        <form onSubmit={handleSubmit}>

            {/* WORKING HOURS */}
            <fieldset>
                <legend>{languageLibrary[language].form1WorkH}</legend>

                <p className={styles.explanation}>{languageLibrary[language].form1WorkHExplanation}</p>

                <label htmlFor="work-hours-start">{languageLibrary[language].start}</label>
                <input ref={workHoursStart} type="time" id="work-hours-start" required/>

                <label htmlFor="work-hours-end">{languageLibrary[language].end}</label>
                <input ref={workHoursEnd} type="time" id="work-hours-end" required/>

                {errors.workHours && <p className={styles.error}>{errors.workHours}</p>}


            </fieldset>

            {/* NON-WORKING HOURS */}
            <input
                type="checkbox"
                id="register-non-work"
                checked={hasNonWorkHours}
                onChange={(e) => setHasNonWorkHours(e.target.checked)}
            />

            <label htmlFor="register-non-work">
                {languageLibrary[language].form1Checkbox}
            </label>

            {hasNonWorkHours && (
            
                <fieldset>
                    <legend>{languageLibrary[language].nonWorkH}</legend>
                    <p className={styles.explanation}>{languageLibrary[language].nonWorkHExplanation}</p>


                    <label htmlFor="non-work-hours-start">{languageLibrary[language].start}</label>
                    <input
                        ref={nonWorkHoursStart}
                        type="time"
                        id="non-work-hours-start"
                    />

                    <label htmlFor="non-work-hours-end">{languageLibrary[language].end}</label>
                    <input
                        ref={nonWorkHoursEnd}
                        type="time"
                        id="non-work-hours-end"
                    />

                    {errors.nonWorkHours && (
                        <p className={styles.error}>{errors.nonWorkHours}</p>
                    )}
                </fieldset>
            )}
            
            {/* ENVIRONMENT */}
            <fieldset>
                <legend>{languageLibrary[language].workEnvironment}</legend>
                <select
                    ref={workEnvironment}
                    id="working-environment"
                    defaultValue="default"
                    required
                >
                    <option value="default" disabled>
                        {languageLibrary[language].workEnvironmentDefault}
                    </option>
                    {environmentOptions.map((environment) => (
                        <option key={environment} value={environment}>
                            {environment}
                        </option>
                    ))}
                </select>

                {errors.environment && <p className={styles.error}>{errors.environment}</p>}
            </fieldset>

            <button type="submit">{languageLibrary[language].save}</button>

            {isSubmitted && <p className={styles.submitted}>
                {languageLibrary[language].submitSuccess}</p>}
        </form>
        </>
    );
}

export default WorkDayForm;
