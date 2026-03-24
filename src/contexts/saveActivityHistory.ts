import type { ActivityType } from "../types";

export function saveActivityHistory(activities: ActivityType[],workdayData: any) {
  const today = new Date().toISOString().split("T")[0];

  const historyKey = "activityHistory";
  const existingHistory = JSON.parse(localStorage.getItem(historyKey) || "{}");

  if (!existingHistory[today]) {
    existingHistory[today] = {
      activities: [],
      workdayData: {}
    };
  }

  existingHistory[today].activities = activities;
  existingHistory[today].workdayData = workdayData;

  localStorage.setItem(historyKey, JSON.stringify(existingHistory));
}