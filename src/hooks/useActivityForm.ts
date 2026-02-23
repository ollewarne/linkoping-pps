import type { ActivityType } from "../types";
import { useActivities } from "../contexts/activityContext";
import { calculateDuration, toTotalMinutes } from "../utils/validateTime";

function generateId(): string {
    return Math.random().toString(36).substring(2, 6);
}

function getCurrentHHMMTime(): string {
    return new Date().toTimeString().slice(0, 5);
}

export function useActivityForm() {
    const { activityDispatch } = useActivities();

    function addMeetingActivityToPlanner(form: HTMLFormElement) {
        const hoursInput = form.hours;
        const minutesInput = form.minutes;
        const newActivity: ActivityType = {
            scheduledTime: null,
            id: generateId(),
            category: form.category.value,
            isMeeting: true,
            title: form.activityTitle.value,
            meetingTimes: { start: hoursInput.value, end: minutesInput.value },
            activeTime: 0,
            breakTime: 0,
            estimatedDuration: calculateDuration(hoursInput.value, minutesInput.value),
            isActive: false,
            totalTimeSpent: 0,
            statistics: {}
        };
        activityDispatch({ type: "ADD_MEETING", payload: { ...newActivity } })

    }

    function addActivityToPlanner(form: HTMLFormElement) {
        const hoursInput = form.hours;
        const minutesInput = form.minutes;
        const newActivity = {
            scheduledTime: null,
            id: generateId(),
            category: form.category.value,
            isMeeting: false,
            title: form.activityTitle.value,
            estimatedDuration: toTotalMinutes(+hoursInput.value, +minutesInput.value),
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
        const newActivity = {
            scheduledTime: getCurrentHHMMTime(),
            id: generateId(),
            category: form.category.value,
            isMeeting: false,
            title: form.activityTitle.value,
            estimatedDuration: toTotalMinutes(+hoursInput.value, +minutesInput.value),
            activeTime: form.activeTime.value,
            breakTime: form.breakTime.value,
            isActive: true,
            totalTimeSpent: 0,
            statistics: {}
        };
        activityDispatch({ type: "ADD_ACTIVITY", payload: { ...newActivity } })
    }

    function startMeetingActivity(form: HTMLFormElement) {
        const hoursInput = form.hours;
        const minutesInput = form.minutes;
        const newActivity: ActivityType = {
            scheduledTime: getCurrentHHMMTime(),
            id: generateId(),
            category: form.category.value,
            isMeeting: true,
            title: form.activityTitle.value,
            meetingTimes: { start: hoursInput.value, end: minutesInput.value },
            activeTime: 0,
            breakTime: 0,
            estimatedDuration: calculateDuration(hoursInput.value, minutesInput.value),
            isActive: true,
            totalTimeSpent: 0,
            statistics: {}
        };
        activityDispatch({ type: "ADD_MEETING", payload: { ...newActivity } })
    }

    return ({ addMeetingActivityToPlanner, addActivityToPlanner, startActivity, startMeetingActivity })

}
