import type { ActivityType } from "../types";
import { useActivities } from "../contexts/activityContext";
import type { TimeSlot } from "../contexts/activityContext";
import { calculateDuration, convertStringTimeToMinutes } from "../utils/convertTime";

function generateId(): string {
    return Math.random().toString(36).substring(2, 6);
}

function checkIfGapExists(timeSlots: TimeSlot[], timesToCheck: {start: number, end: number}): boolean {
    if (timeSlots.length < 2 || !timeSlots) return false
    const lowerTimeLimit = timeSlots[0].start;
    const upperTimeLimit = timeSlots[timeSlots.length - 1].end;

    const timeGaps: {gapStart: number, gapEnd: number}[] = [];
    let prevEnd = lowerTimeLimit;

    for (let i = 1; i < timeSlots.length - 1; i++) {
        const slot = timeSlots[i];
        if (!slot) continue;
        timeGaps.push({gapStart: prevEnd, gapEnd: slot.start});
        prevEnd = slot.end;
    }

    timeGaps.push({gapStart: prevEnd, gapEnd: upperTimeLimit});

    return timeGaps.some(gap => gap.gapStart <= timesToCheck.start && gap.gapEnd >= timesToCheck.end)

}

export function useActivityForm() {
    const { activityDispatch, timeBlocks } = useActivities();

    function addActivityToPlanner(form: HTMLFormElement) {
        let startInput = form.hours.value;
        let endInput = form.minutes.value;

        if (!startInput || !endInput) return;

        if (startInput.includes(':')) {
            const start = convertStringTimeToMinutes(startInput);
            const end = convertStringTimeToMinutes(endInput);

            if (!start || !end) throw new Error("Start time or end time must not be null");

            const lowerTimeLimit = timeBlocks[0].start;
            const upperTimeLimit = timeBlocks[timeBlocks.length - 1].end;

            if (!lowerTimeLimit || !upperTimeLimit) throw new Error("for some reason timeblocks is broken");

            if (start < lowerTimeLimit || end > upperTimeLimit) {
                throw new Error("You can't plan an acitivty outside of your registered working day hours")
            } else if (timeBlocks.length > 2) {
                if(!checkIfGapExists(timeBlocks, {start: start, end: end})) throw new Error(`no timeslot exists for the time ${startInput} - ${endInput}`);
            }
        }

        const newActivity: ActivityType = {
            scheduledTime: { start: startInput, end: endInput },
            id: generateId(),
            category: form.category.value,
            title: form.activityTitle.value,
            estimatedDuration: calculateDuration(startInput, endInput),
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
