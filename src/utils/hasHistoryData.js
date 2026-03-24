export function hasHistoryData(historyData) {
  return Object.values(historyData).some(
    (day) => day.activities && day.activities.length > 0
  );
}