import type { ActivityType } from "../types";
import { useActivities } from "../contexts/activityContext";
import { calculateDuration, convertStringTimeToMinutes } from "../utils/convertTime";

function generateId(): string {
    return Math.random().toString(36).substring(2, 6);
}

export function useActivityForm() {
    const { activityDispatch, timeBlocks } = useActivities();



    function addActivityToPlanner(form: HTMLFormElement) {
        let hoursInput = form.hours.value;
        let minutesInput = form.minutes.value;

        // console.log(hoursInput.value, minutesInput.)

        if(hoursInput.value.includes(':')) {
            const start = convertStringTimeToMinutes(hoursInput);
            const end = convertStringTimeToMinutes(minutesInput);

            if(start < timeBlocks[0] || end > timeBlocks.slice(-1)) {
                throw new Error("You can't plan an acitivty outside of your registered working day hours")
            } else if(timeBlocks.length < 2) {
                timeBlocks.forEach(item => {
                    if(typeof item === 'object') {
                        if(start > item.end) {
                            let check = calculateDuration(start, end);
                            let space = calculateDuration(item.end, );
                        }

                    } else if (typeof item === 'number') {

                    }
                })
            }
                
        
        }

        const newActivity: ActivityType = {
            scheduledTime: { start: hoursInput, end: minutesInput },
            id: generateId(),
            category: form.category.value,
            title: form.activityTitle.value,
            estimatedDuration: calculateDuration(hoursInput, minutesInput),
            activeTime: form.activeTime.value,
            breakTime: form.breakTime.value,
            isActive: false,
            totalTimeSpent: 0,
            statistics: {}
        };
        activityDispatch({ type: "ADD_ACTIVITY", payload: { ...newActivity } })
    }

    function startActivity(form: HTMLFormElement) {
        const hoursInput = form.hours;
        const minutesInput = form.minutes;
        const newActivity: ActivityType = {
            scheduledTime: null,
            id: generateId(),
            category: form.category.value,
            title: form.activityTitle.value,
            estimatedDuration: calculateDuration(hoursInput.value, minutesInput.value),
            activeTime: form.activeTime.value,
            breakTime: form.breakTime.value,
            isActive: true,
            totalTimeSpent: 0,
            statistics: {}
        };
        activityDispatch({ type: "ADD_ACTIVITY", payload: { ...newActivity } })
    }

    return ({ addActivityToPlanner, startActivity })

}
