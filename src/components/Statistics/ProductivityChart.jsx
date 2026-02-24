import { LineChart } from '@mui/x-charts/LineChart';
import { useMemo } from 'react';
import { getAverageStats } from './getAverageStats';

export default function ProductivityChart({ mockData }) {

    const data = useMemo(
        () => getAverageStats(mockData, 'productivity'), [mockData]
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
            series={[
                {
                    data: yValues,
                    label: 'Average Productivity'
                }
            ]}
            height={350}
        />
    );
}
