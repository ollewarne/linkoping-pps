import { useRef, useState } from "react";
import styles from "./ActivityForm.module.css"
import { useActivities } from "../../contexts/activityContext";
import { calculateDuration, toTotalMinutes } from "../../utils/validateTime";

import { userOptions } from "../../constants/userOptions";
import { languageLibrary } from "../../locales/language";
import { useTranslator } from "../../contexts/languageContext";







function ActivityForm() {
    const {language} =useTranslator();
    const [validationError, setValidationError] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const activityId = useRef(1);
    const { activities, dispatch } = useActivities();

    const categories = userOptions[language].category
    // ["Administrative", "Creative", "Technical", "Analytical", "Communication", "Planning", "Learning", "Sales & Marketing", "Support", "Operations", "Meeting"]


    const MEETING_RANKING = "5";

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
                id: activityId.current,
                category: form.category.value,
                isMeeting: true,
                title: form.activityTitle.value,
                ranking: MEETING_RANKING,
                meetingTimes: { start: hoursInput.value, end: minutesInput.value },
                estimatedDuration: calculateDuration(hoursInput.value, minutesInput.value),
                currentlyActive: false,
                totalTimeSpent: 0
            };
            dispatch({type: "ADD_MEETING", payload: {...newActivity}})
        } else {
            const newActivity = {
                id: activityId.current,
                category: form.category.value,
                title: form.activityTitle.value,
                ranking: form.activityRating.value,
                estimatedDuration: toTotalMinutes(+hoursInput.value, +minutesInput.value),
                activeTime: form.activeTime.value,
                breakTime: form.breakTime.value,
                currentlyActive: false,
                totalTimeSpent: 0
            };
            dispatch({type: "ADD_ACTIVITY", payload: {...newActivity}})
        }

        activityId.current++


        form.reset();

        hoursInput.setCustomValidity('');
        minutesInput.setCustomValidity('');
        setValidationError('');
    }

    return (
        <>
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
                                <legend>{languageLibrary[language].form2Rank}</legend>
                                <input type="radio" name="activityRating" id="rating1" value="1" required /><label htmlFor="rating1">{languageLibrary[language].form2RankLow}</label>
                                <input type="radio" name="activityRating" id="rating2" value="2" /><label htmlFor="rating2">2</label>
                                <input type="radio" name="activityRating" id="rating3" value="3" /><label htmlFor="rating3">3</label>
                                <input type="radio" name="activityRating" id="rating4" value="4" /><label htmlFor="rating4">{languageLibrary[language].form2RankHigh}</label>
                            </fieldset>

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
        </>
    )
}

export default ActivityForm;
