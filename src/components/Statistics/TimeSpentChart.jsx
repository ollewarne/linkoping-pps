import { useMemo } from "react";
import { PieChart } from "@mui/x-charts";
import { mockData as defaultMockData } from "../../constants/mockData";
import { useActivityHistory } from "../../contexts/activityHistoryContext";

const formatTime = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

export default function TimeSpentChart({ mockData = defaultMockData, useRealData = false }) {

    //ändrade komponenten så att den kan använda riktig data från useActivityHistory 
    // via useRealData-flagga istället för att alltid använda mockData.
    const { historyActivities } = useActivityHistory();

    const realData = useMemo(() => {
        return {
            all: {
                activities: historyActivities ?? []
            }
        };
    }, [historyActivities]);

    const source = useRealData ? realData : mockData;

    const aggregatedData = useMemo(() => {
        return Object.values(source ?? {}).reduce((acc, day) => {
            (day.activities ?? []).forEach(activity => {
                const { category, totalTimeSpent } = activity;
                acc[category] = (acc[category] || 0) + (totalTimeSpent || 0);
            });
            return acc;
        }, {});
    }, [source]);

    const finalChartData = useMemo(() => {
        return Object.entries(aggregatedData)
            .filter(([, totalTimeSpent]) => totalTimeSpent > 60)
            .map(([category, totalTimeSpent], index) => ({
                id: index,
                value: totalTimeSpent,
                label: `${category} (${formatTime(totalTimeSpent)})`
            }));
    }, [aggregatedData]);

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
    );
}