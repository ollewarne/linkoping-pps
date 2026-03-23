import React, { useMemo, useState } from "react";
import { getHistorydataFromStorage } from "../../utils/workdayStorage";
import styles from "./LocationStats.module.css";
import { useTranslator } from "../../contexts/languageContext";
import { languageLibrary } from "../../locales/language";


export default function WorkEnvironmentInsights({ mockData, useRealData = false }) {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [show, setShow] = useState(false);
    const historyData = getHistorydataFromStorage();

    const language = useTranslator();

    const source = useRealData ? (historyData ?? {}) : mockData;

    // ---------- LOCATIONS ----------

    const locations = useMemo(() => {
        const set = new Set();

        Object.values(source).forEach(day => {
            const loc = day.workdayData?.workEnvironment?.location;
            if (loc) set.add(loc);
        });

        return Array.from(set);
    }, [source]);


    // ---------- INSIGHTS ----------
    const insights = useMemo(() => {
    if (!selectedLocation) return null;

    const categoryStats = {};
    const categoryFactors = {};

    const allStats = []; // 🔥 för tid-analys

    Object.values(source).forEach(day => {
        const loc = day.workdayData?.workEnvironment?.location;
        if (loc !== selectedLocation) return;

        day.activities.forEach(activity => {
            const category = activity.category;

            if (!categoryStats[category]) {
                categoryStats[category] = {
                    totalProductivity: 0,
                    count: 0
                };
                categoryFactors[category] = {};
            }

            Object.entries(activity.statistics || {}).forEach(
                ([time, stat]) => {
                    // produktivitet
                    categoryStats[category].totalProductivity += stat.productivity;
                    categoryStats[category].count += 1;

                    // factor
                    if (stat.factor) {
                        categoryFactors[category][stat.factor] =
                            (categoryFactors[category][stat.factor] || 0) + 1;
                    }

                    // tidsanalys
                    allStats.push({
                        time,
                        productivity: stat.productivity,
                        energy: stat.energy
                    });
                }
            );
        });
    });

    const categoryAverages = Object.entries(categoryStats).map(
        ([category, data]) => ({
            category,
            avg: data.totalProductivity / data.count
        })
    );

    if (categoryAverages.length === 0) return null;

    const best = categoryAverages.reduce((a, b) => (b.avg > a.avg ? b : a));
    const worst = categoryAverages.reduce((a, b) => (b.avg < a.avg ? b : a));

    const getTopFactor = (category) => {
        const factors = categoryFactors[category] || {};
        return Object.entries(factors).sort((a, b) => b[1] - a[1])[0]?.[0] || "Ingen";
    };


    // ---------- TIME ANALYSIS ----------

    // sort times
    const sortedStats = [...allStats].sort((a, b) =>
        a.time.localeCompare(b.time)
    );

    // max productivity
    const maxProd = Math.max(...sortedStats.map(s => s.productivity));

    const bestProdTimes = sortedStats
        .filter(s => s.productivity === maxProd)
        .map(s => s.time);

    const prodStart = bestProdTimes[0];
    const prodEnd = bestProdTimes[bestProdTimes.length - 1];

    // max energy
    const maxEnergy = Math.max(...sortedStats.map(s => s.energy));

    const energyTimes = sortedStats
        .filter(s => s.energy === maxEnergy)
        .map(s => s.time);

    const peakEnergyTime = energyTimes[0];

    return {
        best: {
            ...best,
            topFactor: getTopFactor(best.category)
        },
        worst: {
            ...worst,
            topFactor: getTopFactor(worst.category)
        },
        timeInsights: {
            productivityRange: { start: prodStart, end: prodEnd },
            peakEnergyTime
        }
    };
}, [source, selectedLocation]);


    return (
        <div 
            className={styles.locStatContainer}
            >
            <h2
                className={styles.locStatTitle}
                onClick={() => setShow(prev => !prev)}
                >
                    {languageLibrary[language.language].locTitle}
                    < img 
                        src={show ? "/collaps.svg" : "/expand.svg"}
                        className={styles.locStatTitleSvg} />
              </h2> 

            {show && ( 
            <div >
                {locations.length === 0 && (
                    <p>{languageLibrary[language.language].locNoData}</p>
                )}

                {/* Buttons */}
                <div>
                    {locations.map(loc => (
                        <button
                            key={loc}
                            onClick={() => setSelectedLocation(loc)}
                            className={`${styles.locStatBtn} 
                            ${selectedLocation === loc ? styles.btnActive : styles.btnNoActive}`}
                        >
                            {loc}
                        </button>
                    ))}
                </div>

                

                {/* Result */}
                {insights && (
                    <div 
                    className={styles.locStatInsightsContainer}>
                        <h3
                            className={styles.locStatLocation}>
                                {selectedLocation}</h3>

                        <p>
                            <strong>{languageLibrary[language.language].locBestCategory}</strong>{" "}
                            {insights.best.category} (
                            {insights.best.avg.toFixed(2)})
                        </p>
                        <p>
                            <strong>{languageLibrary[language.language].locFactor}</strong>{" "}
                            {insights.best.topFactor}
                        </p>

                        <br />

                        <p>
                            <strong>{languageLibrary[language.language].locWorstCategory}</strong>{" "}
                            {insights.worst.category} (
                            {insights.worst.avg.toFixed(2)})
                        </p>
                        <p>
                            <strong>{languageLibrary[language.language].locFactor}</strong>{" "}
                            {insights.worst.topFactor}
                        </p>
                    </div>
                )}

                {insights?.timeInsights && (
                    <div style={{ marginTop: "20px" }}>
                        <p>
                            {languageLibrary[language.language].locExplain1}
                            <strong>
                                {insights.timeInsights.productivityRange.start} -{" "}
                                {insights.timeInsights.productivityRange.end}
                            </strong>
                        </p>

                        <p>
                            {languageLibrary[language.language].locExplain2}
                            <strong>{insights.timeInsights.peakEnergyTime}</strong>
                        </p>
                    </div>
                )}
            </div>

            )}
        </div>
    );
}