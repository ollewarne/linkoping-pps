import { useMemo } from "react";
import { PieChart } from "@mui/x-charts";
import { categoryColors } from "../../constants/categoryColors";

const formatTime = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

export default function TimeSpentChart({ mockData, historyData, useRealData = false }) {
  const source = useRealData ? (historyData ?? {}) : mockData;

  const aggregatedData = useMemo(() => {
    const activities = Array.isArray(source)
      ? source
      : Object.values(source).flatMap((day) => day.activities || []);

    return activities.reduce((acc, activity) => {
      const { category, totalTimeSpent } = activity;
      // ändrat: totalTimeSpent är i sekunder nu (inte minuter) så annars det räknade ner mins istälet för sec 
      // vi behöver ändra tillbaka sen 
      // acc[category] = (acc[category] || 0) + (totalTimeSpent || 0);
      acc[category] = (acc[category] || 0) + Math.floor((totalTimeSpent || 0) / 60);
      return acc;
    }, {});
  }, [source]);

  const finalChartData = Object.entries(aggregatedData)
  // ändrat: totalTimeSpent är i sekunder nu (inte minuter),vi behöver ändra tillbaka sen 
    .filter(([, totalTimeSpent]) => totalTimeSpent > 0)
    .map(([category, totalTimeSpent], index) => ({
      id: index,
      value: totalTimeSpent,
      label: `${category} (${formatTime(totalTimeSpent)})`,
      color: categoryColors[category] || "pink",
    }));

  return (
    <PieChart
      series={[
        {
          data: finalChartData,
          innerRadius: 45,
          arcLabelMinAngle: 25,
        },
      ]}
      slotProps={{
        pieArc: { stroke: "none" },
      }}
      width={400}
      height={300}
      sx={{
        "& .MuiChartsLabel-root": { color: "var(--text) !important" },
      }}
    />
  );
}
