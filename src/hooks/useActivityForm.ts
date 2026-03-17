import type { ActivityType } from "../types";
import { useActivities } from "../contexts/activityContext";
import type { TimeSlot } from "../contexts/activityContext";
import { calculateDuration, convertStringTimeToMinutes, minutesToHHMM, getCurrentTime } from "../utils/convertTime";

function generateId(): string {
    return Math.random().toString(36).substring(2, 6);
}



export function createTimegapsArray(timeSlots: TimeSlot[]) {
    const lowerTimeLimit = timeSlots[0].start;
    const upperTimeLimit = timeSlots[timeSlots.length - 1].end;

    const currentTime = getCurrentTime();

    const timeGaps: {start: number, end: number}[] = [];
    let prevEnd = lowerTimeLimit;

    for (let i = 1; i < timeSlots.length - 1; i++) {
        const slot = timeSlots[i];

        const gapStart = Math.max(prevEnd, currentTime);
        const gapEnd = slot.start;

        if (gapStart < gapEnd) {
            timeGaps.push({start: gapStart, end: gapEnd})
        }

        // timeGaps.push({start: prevEnd, end: slot.start});
        prevEnd = slot.end;
    }

    const finalStart = Math.max(prevEnd, currentTime);

    if(finalStart < upperTimeLimit) {
        timeGaps.push({start: finalStart, end: upperTimeLimit});
    }
    // timeGaps.push({start: prevEnd, end: upperTimeLimit});

    return timeGaps
}

function getTimeSlot(timeSlots: TimeSlot[], durationHours: number, durationMinutes: number): {start: number, end: number}{
    const totalDuration = (durationHours * 60) + durationMinutes;

    const gap = timeSlots.find((gap) => gap.start + totalDuration <= gap.end)
    if (gap) return {start: gap.start, end: gap.start + totalDuration};

    throw new Error(`There is no slot in the schedule to fit ${totalDuration} minutes. Have you tried not being stupid?`);
}

export function useActivityForm() {
    const { activityDispatch, timeBlocks } = useActivities();

    function addActivityToPlanner(form: HTMLFormElement) {
        let startInput = form.hours.value;
        let endInput = form.minutes.value;

        const timeGaps = createTimegapsArray(timeBlocks);

        if (startInput.includes(':')) {
            const start = convertStringTimeToMinutes(startInput);
            const end = convertStringTimeToMinutes(endInput);
            const currentTime = getCurrentTime();

            if (start < currentTime) {
                throw new Error("Entered hours have already passed")
            }

            const lowerTimeLimit = timeBlocks[0].start;
            const upperTimeLimit = timeBlocks[timeBlocks.length - 1].end;

            if (start < lowerTimeLimit || end > upperTimeLimit) {
                throw new Error("You can't plan an acitivty outside of your registered working day hours")
            } else if (timeBlocks.length > 2) {
                if(!timeGaps.some(gap => gap.start <= start && gap.end >= end))
                   throw new Error(`No timeslot exists for the time ${startInput} - ${endInput}`)
            }
        } else {
            const timeSlotFound = getTimeSlot(timeGaps, +startInput, +endInput);

            startInput = minutesToHHMM(timeSlotFound.start);
            endInput = minutesToHHMM(timeSlotFound.end);
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
            isCompleted: false,
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
            isCompleted: false,
            totalTimeSpent: 0,
            statistics: {}
        };
        activityDispatch({ type: "ADD_ACTIVITY", payload: { ...newActivity } })
    }

    return ({ addActivityToPlanner, startActivity })

}
