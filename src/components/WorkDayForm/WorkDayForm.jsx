import styles from "./WorkDayForm.module.css";
import { useRef, useState, useEffect } from "react";
import { useTranslator } from "../../contexts/languageContext";
import { languageLibrary } from "../../locales/language";
import { userOptions } from "../../constants/userOptions";
import {convertStringTimeToMinutes} from "../../utils/convertTime";
import { saveWorkdayToStorage, getWorkdayFromStorage } from "../../utils/workdayStorage";



export default function WorkDayForm() {
    // for translation
    const {language} = useTranslator();

    // set refs
    const workHoursStart = useRef(null);
    const workHoursEnd = useRef(null);
    const [hasNonWorkHours, setHasNonWorkHours] = useState(false);
    const nonWorkHoursStart = useRef(null);
    const nonWorkHoursEnd = useRef(null);
    const workEnvironment = useRef(null);

    // sucess state & show success feedback
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (!showSuccess) return;

        const timer = setTimeout(() => {
        setShowSuccess(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [showSuccess]);

    // set user options for work environment
    const environmentOptions = userOptions[language].workEnvironment; // 'Work Environment'


    // get saved workday values from localstorage to default input fields
    let workformData = getWorkdayFromStorage();
    let nonWorkFormData = workformData.nonWorkHours;
    console.log(workformData)


    // ------------------ HANDLE SUBMIT ------------------
    function handleSubmit(e) {
        e.preventDefault();

        /* ------------------ VALIDATE WORK HOURS ------------------ */
        const workStart = workHoursStart.current.value;
        const workEnd = workHoursEnd.current.value;

        if(!workStart){
            workHoursStart.current.setCustomValidity(
                languageLibrary[language].errorNoWorkHoursStart // 'Please enter your start time'
            );
            workHoursStart.current.reportValidity();
            return;
        };

        if(!workEnd){
            workHoursEnd.current.setCustomValidity(
                languageLibrary[language].errorNoWorkHoursEnd // 'Please enter your end time'
            );
            workHoursEnd.current.reportValidity();
            return;
        };

        if(convertStringTimeToMinutes(workStart) >= convertStringTimeToMinutes(workEnd)){
            workHoursEnd.current.setCustomValidity(
                languageLibrary[language].errorEndBeforeStart // "End time can't be after start time"
            );
            workHoursEnd.current.reportValidity();
            return;
        };

        workHoursEnd.current.setCustomValidity('');

        /* ------------------ VALIDATE NON-WORKING HOURS ------------------ */
        let nonWorkStart = null;
        let nonWorkEnd = null;

        if (hasNonWorkHours) {
            nonWorkHoursStart.current.setCustomValidity('');
            nonWorkHoursEnd.current.setCustomValidity('');

            nonWorkStart = nonWorkHoursStart.current?.value;
            nonWorkEnd = nonWorkHoursEnd.current?.value;

            if (!nonWorkStart){
                nonWorkHoursStart.current.setCustomValidity(
                    languageLibrary[language].errorNoWorkHoursStart // 'Please enter your start time'
                );
                nonWorkHoursStart.current.reportValidity();
                return;
            };

            if (!nonWorkEnd){
                nonWorkHoursEnd.current.setCustomValidity(
                    languageLibrary[language].errorNoWorkHoursEnd // 'Please enter your end time'
                );
                nonWorkHoursEnd.current.reportValidity();
                return;
            };

            const nonWorkStartMin = convertStringTimeToMinutes(nonWorkStart);
            const nonWorkEndMin = convertStringTimeToMinutes(nonWorkEnd);
            const workStartMin = convertStringTimeToMinutes(workStart);
            const workEndMin = convertStringTimeToMinutes(workEnd);
            
            if (nonWorkStartMin>= nonWorkEndMin){
                nonWorkHoursEnd.current.setCustomValidity(
                    languageLibrary[language].errorEndBeforeStart // "End time can't be before start time"
                );
                nonWorkHoursEnd.current.reportValidity();
                return;
            };

            if(nonWorkStartMin <= workStartMin || nonWorkEndMin >= workEndMin){
                nonWorkHoursStart.current.setCustomValidity(
                    languageLibrary[language].errorHoursBetweenWorkingHours // 'Non-working hours must be within your working hours'
                );
                nonWorkHoursStart.current.reportValidity();
                return;
            };

        nonWorkHoursStart.current.setCustomValidity('');
        nonWorkHoursEnd.current.setCustomValidity('');
        };

        /* ------------------ VALIDATE ENVIRONMENT ------------------ */
        const environment = workEnvironment.current.value;

        if (!environment) {
            workEnvironment.current.setCustomValidity(
                languageLibrary[language].errorNoWorkEnvironment // 'Please select your work environment'
            );
            workEnvironment.current.reportValidity();
            return;
        };

        workEnvironment.current.setCustomValidity('');

        /* ------------------ SAVING DATA ------------------ */
        // save user choices according to set data structure
        const workdayData = {
            workHours: {start: workStart, end: workEnd},
            nonWorkHours: hasNonWorkHours ?
                {start: nonWorkStart, end: nonWorkEnd}
                : null,
            workEnvironment: {location: environment} // DENNA SPARAS PÅ SVENSKA om svenska som språk: PROBLEM ???
        };

        saveWorkdayToStorage(workdayData);
        // console.log(workdayData);

        /* ------------------ RESET FORM & CLEAR INPUT ------------------ */
        // workHoursStart.current.value = '';
        // workHoursEnd.current.value = '';
        // workEnvironment.current.value = '';

        // if (hasNonWorkHours) {
        //     nonWorkHoursStart.current.value = '';
        //     nonWorkHoursEnd.current.value = '';
        // };

        /* ------------------ SHOW SUCESSFULL SUBMIT ------------------ */
        setShowSuccess(true);
    };

    // ------------------ DRAW FORM ------------------
    return (
    <>
        <h2>{languageLibrary[language].form1Header /* 'Register Workday' */}</h2>
    
        <form onSubmit={handleSubmit} noValidate>

            {/* ---------- WORKING HOURS ---------- */}
            <fieldset>
                <legend>{languageLibrary[language].form1WorkH /* 'Working hours' */}</legend>
                <p className={styles.explanation}>{languageLibrary[language].form1WorkHExplanation /* 'Explanation' */}</p>

                <label htmlFor="work-hours-start">{languageLibrary[language].start /* 'Start' */}</label>
                <input 
                    ref={workHoursStart}
                    type="time" 
                    id="work-hours-start" 
                    onChange={(e) => e.target.setCustomValidity('')}
                    defaultValue={workformData ? workformData.workHours.start : '--:--'}
                    />

                <label htmlFor="work-hours-end">{languageLibrary[language].end /* 'End' */}</label>
                <input 
                    ref={workHoursEnd}
                    type="time" 
                    id="work-hours-end" 
                    onChange={(e) => e.target.setCustomValidity('')}
                    defaultValue={workformData ? workformData.workHours.end : '--:--'}
                    />
            </fieldset>

            {/* ---------- NON-WORKING HOURS ---------- */}
            <input
                type="checkbox"
                id="register-non-work"
                checked={hasNonWorkHours}
                onChange={(e) => setHasNonWorkHours(e.target.checked)}
            />
            <label htmlFor="register-non-work">
                {languageLibrary[language].form1Checkbox /* 'I have non-working hours to register' */}
            </label>

            {hasNonWorkHours && (
                    <fieldset>
                        <legend>{languageLibrary[language].nonWorkH /* 'Non-working hours' */}</legend>
                        <p className={styles.explanation}>{languageLibrary[language].nonWorkHExplanation}</p>

                        <label htmlFor="non-work-hours-start">{languageLibrary[language].start}</label>
                        <input
                            ref={nonWorkHoursStart}
                            type="time"
                            id="non-work-hours-start"
                            onChange={(e) => e.target.setCustomValidity('')}
                            defaultValue={nonWorkFormData ? workformData.nonWorkHours.start : '--:--'}
                            
                        />

                        <label htmlFor="non-work-hours-end">{languageLibrary[language].end}</label>
                        <input
                            ref={nonWorkHoursEnd}
                            type="time"
                            id="non-work-hours-end"
                            onChange={(e) => e.target.setCustomValidity('')}
                            defaultValue={nonWorkFormData ? workformData.nonWorkHours.end : '--:--'}
                        />
                    </fieldset>
                )
            }

            {/* ---------- ENVIRONMENT ---------- */}
            <fieldset>
                <legend>{languageLibrary[language].workEnvironment /* 'Work Environment' */}</legend>
                <select
                    ref={workEnvironment}
                    id="working-environment"
                    defaultValue={workformData ? workformData.workEnvironment.location : ''}
                    onChange={(e) => e.target.setCustomValidity("")}>

                    <option value="" disabled>
                        {languageLibrary[language].workEnvironmentDefault /* 'Select an environment' */}
                    </option>

                    {environmentOptions.map((environment) => (
                        <option key={environment} value={environment}>
                            {environment}
                        </option>
                    ))}
                </select>
            </fieldset>

            {/* ---------- SUBMIT ---------- */}
            <div>
                <button type="submit">{languageLibrary[language].save /* Save */}</button>

                {showSuccess && (
                    <p className={styles.submitted}>
                        {languageLibrary[language].submitSuccess}
                    </p>
                )}
            </div>
            
        </form>
    </>
    );
};