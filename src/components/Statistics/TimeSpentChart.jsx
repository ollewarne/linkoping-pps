import { mockData } from "../../constants/mockData";
import { PieChart } from "@mui/x-charts";


const categoryColors = {
    'Meeting': 'var(--purple-meeting)',
    'Administrative': 'var(--pink-admin)',
    'Creative': 'var(--orange-creative)',
    'Technical': 'var(--dark-blue-tech)',
    'Analytical': 'var(--light-green-analytical)',
    'Communication': 'var(--gold-communication)',
    'Planning': 'var(--light-blue-planning)',
    'Learning': 'var(--fuschsia-learning)',
    'Sales & Marketing': 'var(--red-pink-sales)',
    'Support': 'var(--dark-green-support)',
    'Operations': 'var(--yellow-operations)',
    'Other': 'var(--red-other)',
}


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

const finalChartData = Object.entries(aggregatedData)
    .filter(([, totalTimeSpent]) => totalTimeSpent > 60)
    .map(([category, totalTimeSpent], index) => ({
        id: index,
        value: totalTimeSpent,
        label: `${category} (${formatTime(totalTimeSpent)})`,
        color: categoryColors[category] || 'pink'
}))

export default function TimeSpentChart() {


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
                pieArc: {
                stroke: 'none',
                },
            }}
            width={400}
            height={300}
            />
    )

}
