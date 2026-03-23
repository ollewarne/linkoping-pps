const KEY = "workdayData";

export function saveWorkdayToStorage(workdayData) {
    localStorage.setItem(KEY, JSON.stringify(workdayData));

    window.dispatchEvent(new Event("workdayDataUpdated"));
}

export function getWorkdayFromStorage() {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
        const workday = {
            workHours: { start: "08:00", end: "18:00" },
            nonWorkHours: null,
            workEnvironment: { location: "" }
        }
        saveWorkdayToStorage(workday)
        return workday;
    };

    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

const historyKey = 'activityHistory';

export function getHistorydataFromStorage() {
    const raw = localStorage.getItem(historyKey);
    if (!raw) {
        const workday = {
            workHours: { start: "08:00", end: "18:00" },
            nonWorkHours: null,
            workEnvironment: { location: "" }
        }
        saveWorkdayToStorage(workday)
        return workday;
    };

    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}
