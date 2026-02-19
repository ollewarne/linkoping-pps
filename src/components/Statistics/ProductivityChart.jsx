import { LineChart } from '@mui/x-charts/LineChart';
import { useMemo } from 'react';
import { getAverageStats } from './getAverageStats';


// function getAverageProductivity(data) {
//   const timeSlot = {};

//   Object.values(data).forEach((day) => {

//     day.activities.forEach((activity) => {

//       if (!activity.statistics) return;

//       Object.entries(activity.statistics).forEach(([time, statData]) => {
//         const roundedTime = roundTime(time);

//         if(!timeSlot[roundedTime]) {
//           timeSlot[roundedTime] = [];
//         };

//         timeSlot[roundedTime].push(statData.productivity);

//       });

//     });

//   });


// const averages = Object.entries(timeSlot).map(([time, values]) => {
//   const averageValue = values.reduce((sum, val) => sum + val, 0) / values.length;

//   return {
//     time,
//     average: Number(averageValue.toFixed(2))
//   };
// });

// averages.sort((a,b) => a.time.localeCompare(b.time));

// return averages;

// };


export default function ProductivityChart({mockData}) {

  const data = useMemo(
    () => getAverageStats(mockData, 'productivity'), [mockData]
  );

  const xLables = data.map((d) => d.time);
  const yValues = data.map((d) => d.average);

  return (
    <LineChart
      xAxis={[
        {
          scaleType: 'point',
          data: xLables,
          label: 'Time'
        }
      ]}
      yAxis={[
        {
          min: 1,
          max: 5,
          tickNumber: 5,
          label: 'Score'
        }
      ]}
      series = {[
        {
          data: yValues,
          label: 'Average Productivity'
        }
      ]}
      height={350}
    />
  );

}