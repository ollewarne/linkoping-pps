// import { mockData } from "../../constants/mockData";
// import { useState } from "react";
// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   LinearScale,
//   CategoryScale,
//   Legend,
//   Tooltip
// } from "chart.js";
// import { Line } from "react-chartjs-2";

// // Chart.js registration
// ChartJS.register(
//   LineElement,
//   PointElement,
//   LinearScale,
//   CategoryScale,
//   Legend,
//   Tooltip
// );

// /* ---------- Helper functions ---------- */

// // 1. Best productivity category
// function getBestCategory(activities) {
//   const categoryStats = {};

//   activities.forEach(activity => {
//     const values = Object.values(activity.statistics);

//     const totalProductivity = values.reduce(
//       (sum, v) => sum + v.productivity,
//       0
//     );

//     if (!categoryStats[activity.category]) {
//       categoryStats[activity.category] = { total: 0, count: 0 };
//     }

//     categoryStats[activity.category].total += totalProductivity;
//     categoryStats[activity.category].count += values.length;
//   });

//   let bestCategory = null;
//   let bestAvg = 0;

//   Object.entries(categoryStats).forEach(([category, data]) => {
//     const avg = data.total / data.count;
//     if (avg > bestAvg) {
//       bestAvg = avg;
//       bestCategory = category;
//     }
//   });

//   return bestCategory;
// }

// // 2. Best energy time (efficiency + productivity)
// function getBestEnergyTime(flattenedStats) {
//   let bestTime = null;
//   let bestScore = 0;

//   flattenedStats.forEach(stat => {
//     const score = stat.efficiency + stat.productivity;
//     if (score > bestScore) {
//       bestScore = score;
//       bestTime = stat.time;
//     }
//   });

//   return bestTime;
// }

// /* ---------- Component ---------- */

// export default function Statistics() {
//   const keys = Object.keys(mockData);
//   const [selectedKey, setSelectedKey] = useState(null);

//   // Get activities for selected day
//   const activities = selectedKey
//     ? mockData[selectedKey].activities
//     : [];

//   // Flatten statistics timeline
//   const flattenedStats = activities
//     .flatMap(activity =>
//       Object.entries(activity.statistics).map(([time, values]) => ({
//         time,
//         efficiency: values.efficiency,
//         productivity: values.productivity
//       }))
//     )
//     .sort((a, b) => a.time.localeCompare(b.time));

//   // Chart data
//   const chartData = {
//     labels: flattenedStats.map(s => s.time),
//     datasets: [
//       {
//         label: "Efficiency",
//         data: flattenedStats.map(s => s.efficiency),
//         borderColor: "purple",
//         tension: 0.3
//       },
//       {
//         label: "Productivity",
//         data: flattenedStats.map(s => s.productivity),
//         borderColor: "yellow",
//         tension: 0.3
//       }
//     ]
//   };

//   // Chart options
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         labels: { color: "white" },
//         position: "top"
//       }
//     },
//     scales: {
//       x: {
//         ticks: { color: "white" },
//         title: {
//           display: true,
//           text: "Time",
//           color: "white"
//         }
//       },
//       y: {
//         min: 0,
//         max: 5,
//         ticks: {
//           stepSize: 1,
//           color: "white"
//         },
//         title: {
//           display: true,
//           text: "Score",
//           color: "white"
//         }
//       }
//     }
//   };

//   // Insights
//   const bestCategory = selectedKey
//     ? getBestCategory(activities)
//     : null;

//   const bestEnergyTime = selectedKey
//     ? getBestEnergyTime(flattenedStats)
//     : null;

//   return (
//     <>
//       {/* Date buttons */}
//       <div style={{ marginBottom: "1rem" }}>
//         {keys.map(key => (
//           <button
//             key={key}
//             onClick={() => setSelectedKey(key)}
//             style={{ marginRight: "0.5rem" }}
//           >
//             {key}
//           </button>
//         ))}
//       </div>

//       {/* Chart */}
//       {selectedKey && flattenedStats.length > 0 && (
//         <div>
//           <h3>Statistics for {selectedKey}</h3>
//           <Line data={chartData} options={options} />
//         </div>
//       )}

//       {/* Insights */}
//       <div>


// {selectedKey && bestEnergyTime && bestCategory && (
//   <p>
//     Idag {selectedKey} när du jobbade mellan {mockData[selectedKey].workdayData.workHours.start} - {mockData[selectedKey].workdayData.workHours.end} i arbetsmiljö: {mockData[selectedKey].workdayData.workEnvironment.location}. Hade du bäst energi {bestEnergyTime} ???? och var som mest produktiv när du arbetade med kategori: { bestCategory}.
//   </p>
// )}
//       </div>
//     </>
//   );
// }


import { LineChart } from '@mui/x-charts/LineChart';

export default function BasicLineChart() {
  return (
    <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
        },
      ]}
      height={300}
    />
  );
}