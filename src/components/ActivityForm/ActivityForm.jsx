import { useRef, useState } from "react";
import styles from "./ActivityForm.module.css"

const categories = ["Administrative", "Creative", "Technical", "Analytical", "Communication", "Planning", "Learning", "Sales & Marketing", "Support", "Operations"]

function ActivityForm() {
    const [activities, setActivities] = useState(null)
    const activityId = useRef(1)

    function handleSubmit(e) {
        e.preventDefault()
        const newActivity = {
            id: activityId.current,
            category: e.target.category.value,
            title: e.target.activityTitle.value,
            ranking: e.target.activityRating.value,
            estimatedDuration: {hours: e.target.hours.value, minutes: e.target.minutes.value},
            activeTime: e.target.activeTime.value,
            breakTime: e.target.breakTime.value,
            currentlyActive: false,
            totalTimeSpent: 0
        }

        activityId.current++

        setActivities({...activities, newActivity});
        console.log(activities);
    }

    return (
        <div className={styles.container}>
            <h2>Register Activity</h2>
            <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Activity</legend>
                    <label htmlFor="category">Category</label>
                    <select name="category" className="category">
                        <option value="">Pick a category</option>
                        {
                            categories.map(category => <option value={category}>{category}</option>)
                        }
                    </select>
                    <label htmlFor="activityTitle">Title</label>
                    <input name="activityTitle" type="text" placeholder="Enter a title" />
                </fieldset>
                <fieldset>
                    <legend>Rank of importance</legend>
                    <input type="radio" name="activityRating" id="rating1" value="1" /><label htmlFor="rating1">1</label>
                    <input type="radio" name="activityRating" id="rating2" value="2" /><label htmlFor="rating2">2</label>
                    <input type="radio" name="activityRating" id="rating3" value="3" /><label htmlFor="rating3">3</label>
                    <input type="radio" name="activityRating" id="rating4" value="4" /><label htmlFor="rating4">4</label>
                </fieldset>
                <fieldset>
                    <legend>Estimated duration</legend>
                    <label htmlFor="hours">Hours</label>
                    <input name="hours" type="number" value={0} />
                    <label htmlFor="minutes">Minutes</label>
                    <input name="minutes" type="number" value={0} />
                </fieldset>
                <fieldset>
                    <legend>Time structure</legend>
                    <label htmlFor="activeTime">Active</label>
                    <input type="number" name="activeTime" value={25} />
                    <label htmlFor="breakTime">Break</label>
                    <input type="number" name="breakTime" value={5} />
                </fieldset>
                <button type="submit">Add Activity</button>
            </form>
        </div>
    )
}

export default ActivityForm;
