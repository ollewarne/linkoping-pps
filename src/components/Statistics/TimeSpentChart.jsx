import { mockData } from "../../constants/mockData";
import { PieChart } from "@mui/x-charts";

const aggregatedData = Object.values(mockData).reduce((acc, day) => {
    day.activities.forEach(activity => {
        const { category, totalTimeSpent } = activity;
        acc[category] = (acc[category] || 0) + totalTimeSpent;
    });
    return acc;
}, {});

const formatTime = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

const finalChartData = Object.entries(aggregatedData).filter(([, totalTimeSpent]) => totalTimeSpent > 60).map(([category, totalTimeSpent], index) => ({
    id: index,
    value: totalTimeSpent,
    label: `${category} (${formatTime(totalTimeSpent)})`
}))

export default function TimeSpentChart() {


    return (
        <PieChart
            series={[
                {
                    data: finalChartData,
                    innerRadius: 45,
                    valueFormatter: (item) => formatTime(item.value),
                    arcLabelMinAngle: 25,
                }
            ]}
            width={400}
            height={300}
            sx={{
                '& .MuiChartsLabel-root': { color: 'var(--text) !important' },
            }}
        />
    )

}
