import { roundTime } from "./roundTime";

export function getAverageStats(data, key) {
  const timeSlot = {};

  Object.values(data).forEach((day) => {

    day.activities.forEach((activity) => {

      if (!activity.statistics) return;

      Object.entries(activity.statistics).forEach(([time, statData]) => {
        const roundedTime = roundTime(time);

        if(!timeSlot[roundedTime]) {
          timeSlot[roundedTime] = [];
        };

        timeSlot[roundedTime].push(statData[key]);

      });

    });

  });


const averages = Object.entries(timeSlot).map(([time, values]) => {
  const averageValue = values.reduce((sum, val) => sum + val, 0) / values.length;

  return {
    time,
    average: Number(averageValue.toFixed(2))
  };
});

averages.sort((a,b) => a.time.localeCompare(b.time));

return averages;

};