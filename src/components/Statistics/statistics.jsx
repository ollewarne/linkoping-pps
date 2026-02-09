import { mockData } from "../../constants/mockData";
import { useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip
} from "chart.js";
import { Line } from "react-chartjs-2";

// Chart.js registration (required)
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip
);

export default function Statistics() {
  const keys = Object.keys(mockData);
  const [selectedKey, setSelectedKey] = useState(null);

  // 1: Get activities for selected day
  const activities = selectedKey
    ? mockData[selectedKey].activities
    : [];

  // 2: Flatten all activity statistics into a timeline
  const flattenedStats = activities
    .flatMap(activity =>
      Object.entries(activity.statistics).map(
        ([time, values]) => ({
          time,
          efficiency: values.efficiency,
          productivity: values.productivity
        })
      )
    )
    .sort((a, b) => a.time.localeCompare(b.time));

  // 3: Build chart data
  const chartData = {
    labels: flattenedStats.map(s => s.time),
    datasets: [
      {
        label: "Efficiency",
        data: flattenedStats.map(s => s.efficiency),
        borderColor: "purple",
        tension: 0.3,
      },
      {
        label: "Productivity",
        data: flattenedStats.map(s => s.productivity),
        borderColor: "yellow",
        tension: 0.3
      }
    ]
  };

  // 4: Chart Options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
            color: 'white'
        },
        position: "top"
      }
    },
    scales: {
      x: {
        ticks: {
            color: 'white'
        },
        title: {
          display: true,
          text: "Time",
          color: 'white'
        }
      },
      y: {
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
          color: 'white'
        },
        title: {
          display: true,
          text: "Score",
          color: 'white'
        }
      }
    }
  };

  return (
    <>
      {/* Date buttons */}
      <div style={{ marginBottom: "1rem" }}>
        {keys.map(key => (
          <button
            key={key}
            onClick={() => setSelectedKey(key)}
            style={{ marginRight: "0.5rem" }}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Chart */}
      {selectedKey && flattenedStats.length > 0 && (
        <div>
          <h3>Statistics for {selectedKey}</h3>
          <Line data={chartData} options={options} />
        </div>
      )}
    </>
  );
}
