import type { ActivityType } from "../types";

export function saveActivityHistory(activities: ActivityType[]) {
  const today = new Date().toISOString().split("T")[0];

  const historyKey = "activityHistory";
  const existingHistory = JSON.parse(localStorage.getItem(historyKey) || "{}");

  if (!existingHistory[today]) {
    existingHistory[today] = {
      activities: [],
    };
  }

  existingHistory[today].activities = activities;

  localStorage.setItem(historyKey, JSON.stringify(existingHistory));
}