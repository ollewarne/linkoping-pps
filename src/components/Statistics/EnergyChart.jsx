import { LineChart } from '@mui/x-charts/LineChart';
import { useMemo } from 'react';
import { getAverageStats } from './getAverageStats';



// function getAverageEnergy(data) {
//   const timeSlot = {};

//   Object.values(data).forEach((day) => {

//     day.activities.forEach((activity) => {

//       if (!activity.statistics) return;

//       Object.entries(activity.statistics).forEach(([time, statData]) => {
//         const roundedTime = roundTime(time);

//         if(!timeSlot[roundedTime]) {
//           timeSlot[roundedTime] = [];
//         };

//         timeSlot[roundedTime].push(statData.efficiency);

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


export default function EnergyChart({ mockData }) {

    const data = useMemo(
        () => getAverageStats(mockData, 'efficiency'), [mockData]
    );

    const xLables = data.map((d) => d.time);
    const yValues = data.map((d) => d.average);

    return (
        <LineChart
            sx={{
                '& .MuiChartsAxis-tickLabel': { fill: 'var(--text) !important' },
                '& .MuiChartsAxis-label': { fill: 'var(--text) !important' },
                '& .MuiChartsAxis-line': { stroke: 'var(--text) !important' },
                '& .MuiChartsAxis-tick': { stroke: 'var(--text) !important' },
                '& .MuiChartsLabel-root': { fill: 'var(--text) !important' },
            }}
            xAxis={[
                {
                    scaleType: 'point',
                    data: xLables,
                    label: 'Time',
                }
            ]}
            yAxis={[
                {
                    min: 1,
                    max: 5,
                    tickNumber: 5,
                    label: 'Score',
                }
            ]}
            series={[
                {
                    data: yValues,
                    label: 'Average Energy',
                    color: '#f50057'
                }
            ]}
            height={350}
        />
    );

}
