import { roundTime } from "./roundTime";

export function getAverageStats(data, key) {
  const timeSlot = {};

  Object.values(data).forEach((day) => {

    day.activities.forEach((activity) => {

      if (!activity.statistics) return;

      Object.entries(activity.statistics).forEach(([time, statData]) => {
        //ändrade så att bara tiden (HH:MM) plockas ut från ISO-timestampen innan roundTime körs, 
        // eftersom funktionen inte kan hantera hela datumsträngen.
        const timeOnly = time.includes("T") ? time.split("T")[1].slice(0, 5) : time;
        const roundedTime = roundTime(timeOnly);

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