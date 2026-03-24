import { LineChart } from '@mui/x-charts/LineChart';
import { useMemo } from 'react';
import { getAverageStats } from './getAverageStats';
import { languageLibrary } from '../../locales/language';
import { useTranslator } from '../../contexts/languageContext';

export default function EnergyChart({ mockData, historyData, useRealData = false }) {

    const language = useTranslator();
    const source = useRealData ? (historyData ?? {}) : mockData;

    const data = useMemo(
        () => getAverageStats(source, "energy"),
        [source]
    );

    const xLables = data.map((d) => d.time);
    const yValues = data.map((d) => d.average);

    return (
        <>
        <h2 style={{textAlign: 'center', fontSize: '1.3rem', borderBottom: '2px solid #f50057', paddingBottom: '1%'}}>{languageLibrary[language.language].statsAverageEnergy}</h2>
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
                    label: languageLibrary[language.language].time,
                }
            ]}
            yAxis={[
                {
                    min: 1,
                    max: 4,
                    tickNumber: 4,
                    label: languageLibrary[language.language].score,
                }
            ]}
            series={[
                {
                    data: yValues,
                    // label: languageLibrary[language.language].statsAverageEnergy,
                    color: '#f50057'
                }
            ]}
            height={350}
        />
        </>
    );
}
