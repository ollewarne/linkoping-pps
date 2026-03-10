const KEY = "workdayData";

export function saveWorkdayToStorage(workdayData) {
  localStorage.setItem(KEY, JSON.stringify(workdayData));

  window.dispatchEvent(new Event("workdayDataUpdated"));
}

export function getWorkdayFromStorage() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}