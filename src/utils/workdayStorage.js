const KEY = "workdayData";

export function saveWorkdayToStorage(workdayData) {
    localStorage.setItem(KEY, JSON.stringify(workdayData));

    window.dispatchEvent(new Event("workdayDataUpdated"));
}

export function getWorkdayFromStorage() {
    const raw = localStorage.getItem(KEY);

    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

const historyKey = 'activityHistory';

export function getHistorydataFromStorage() {
    const raw = localStorage.getItem(historyKey);

    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}
