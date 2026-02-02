import { useRef, useState } from "react";
import styles from "./ActivityForm.module.css"
import { useActivities } from "../../contexts/activityContext";
import { calculateDuration } from "../../utils/validateTime";

const categories = ["Administrative", "Creative", "Technical", "Analytical", "Communication", "Planning", "Learning", "Sales & Marketing", "Support", "Operations", "Meeting"]

function ActivityForm() {
    const [validationError, setValidationError] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const activityId = useRef(1);
    const { activities, dispatch } = useActivities();

    const MEETING_RANKING = "5";

    function validateInputs(hoursValue, minutesValue) {
        const hours = +hoursValue;
        const minutes = +minutesValue;

        if (hours <= 0 && minutes <= 0) {
            return "One field must be greater than 0"
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
        if (form.category.value === "Meeting") {
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
                estimatedDuration: { hours: hoursInput.value, minutes: minutesInput.value },
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
            <h2>Register Activity</h2>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Activity</legend>
                    <label htmlFor="category">Category</label>
                    <select name="category" className="category" required defaultValue={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="" disabled>Pick a category</option>
                        {
                            categories.map((category) => {
                                return (<option key={category} value={category}>{category}</option>)
                            })
                        }
                    </select>
                    <label htmlFor="activityTitle">Title</label>
                    <input name="activityTitle" type="text" placeholder="Enter a title" required maxLength={50} />
                </fieldset>
                {
                    selectedCategory === "Meeting" ? (
                        <fieldset>
                            <legend>Times</legend>
                            <label htmlFor="hours">Start</label>
                            <input name="hours" type="time" step={60} required />
                            <label htmlFor="minutes">End</label>
                            <input name="minutes" type="time" step={60} required />
                        </fieldset>
                    ) : (
                        <>
                            <fieldset>
                                <legend>Rank of importance</legend>
                                <input type="radio" name="activityRating" id="rating1" value="1" required /><label htmlFor="rating1">1</label>
                                <input type="radio" name="activityRating" id="rating2" value="2" /><label htmlFor="rating2">2</label>
                                <input type="radio" name="activityRating" id="rating3" value="3" /><label htmlFor="rating3">3</label>
                                <input type="radio" name="activityRating" id="rating4" value="4" /><label htmlFor="rating4">4</label>
                            </fieldset>
                            <fieldset>
                                <legend>Estimated Duration</legend>
                                <label htmlFor="hours">Hours</label>
                                <input name="hours" type="number" defaultValue={0} onBlur={handleBlur} />
                                <label htmlFor="minutes">Minutes</label>
                                <input name="minutes" type="number" defaultValue={0} onBlur={handleBlur} />
                            </fieldset>
                            <fieldset>
                                <legend>Time structure</legend>
                                <label htmlFor="activeTime">Active</label>
                                <input type="number" name="activeTime" defaultValue={25} />
                                <label htmlFor="breakTime">Break</label>
                                <input type="number" name="breakTime" defaultValue={5} />
                            </fieldset>
                        </>
                    )
                }
                <button type="submit">Add Activity</button>
            </form>
        </>
    )
}

export default ActivityForm;
