import { LineChart } from '@mui/x-charts/LineChart';
import { useMemo } from 'react';
import { getAverageStats } from './getAverageStats';
import { useActivityHistory } from "../../contexts/activityHistoryContext";

export default function EnergyChart({ mockData, useRealData = false }) {
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
    const data = useMemo(
        () => getAverageStats(source, "efficiency"),
        [source]
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
                '& .MuiChartsLabel-root': { color: 'var(--text) !important' },
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
                    max: 4,
                    tickNumber: 4,
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
