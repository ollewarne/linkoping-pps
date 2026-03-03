import type { ActivityType } from "../types";
import { useActivities } from "../contexts/activityContext";
import { calculateDuration } from "../utils/convertTime";
// import { calculateDuration, toTotalMinutes } from "../utils/validateTime";

function generateId(): string {
    return Math.random().toString(36).substring(2, 6);
}

export function useActivityForm() {
    const { activityDispatch } = useActivities();

   // function findScheduleGap(duration) {
   //     let start: string = "";
   //     let end: string = "";

   //     return [
   //         start,
   //         end
   //     ]
   // }

    function addActivityToPlanner(form: HTMLFormElement) {
        let hoursInput = form.hours;
        let minutesInput = form.minutes;
//        if (hoursInput.includes(":")) {
 //           [hoursInput, minutesInput] = findScheduleGap(toTotalMinutes(+hoursInput, +minutesInput))
  //      }
        const newActivity: ActivityType = {
            scheduledTime: { start: hoursInput.value, end: minutesInput.value },
            id: generateId(),
            category: form.category.value,
            title: form.activityTitle.value,
            estimatedDuration: calculateDuration(hoursInput.value, minutesInput.value),
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
            // estimatedDuration: toTotalMinutes(+hoursInput.value, +minutesInput.value),
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
