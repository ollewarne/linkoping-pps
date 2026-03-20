import React, { useMemo, useState } from "react";
import { mockData } from "../../constants/mockData";

export default function WorkEnvironmentInsights() {
    const [selectedLocation, setSelectedLocation] = useState(null);

    // 🔘 Hämta locations
    const locations = useMemo(() => {
        const set = new Set();

        Object.values(mockData).forEach(day => {
            const loc = day.workdayData?.workEnvironment?.location;
            if (loc) set.add(loc);
        });

        return Array.from(set);
    }, []);

    // 📊 Insights
    const insights = useMemo(() => {
    if (!selectedLocation) return null;

    const categoryStats = {};
    const categoryFactors = {};

    const allStats = []; // 🔥 för tid-analys

    Object.values(mockData).forEach(day => {
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

                    // 🔥 samla för tidsanalys
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

    // 🔥 TIDSANALYS

    // sortera tider
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
}, [selectedLocation]);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Work Environment Insights</h2>

            {/* 🔘 Buttons */}
            <div style={{ marginBottom: "20px" }}>
                {locations.map(loc => (
                    <button
                        key={loc}
                        onClick={() => setSelectedLocation(loc)}
                        style={{
                            marginRight: "10px",
                            padding: "8px 12px",
                            background:
                                selectedLocation === loc ? "#333" : "#eee",
                            color: selectedLocation === loc ? "#fff" : "#000",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        {loc}
                    </button>
                ))}
            </div>

            {/* 📊 Result */}
            {insights && (
                <div>
                    <h3>{selectedLocation}</h3>

                    <p>
                        <strong>Bästa kategori:</strong>{" "}
                        {insights.best.category} (
                        {insights.best.avg.toFixed(2)})
                    </p>
                    <p>
                        <strong>Påverkande faktor:</strong>{" "}
                        {insights.best.topFactor}
                    </p>

                    <br />

                    <p>
                        <strong>Sämsta kategori:</strong>{" "}
                        {insights.worst.category} (
                        {insights.worst.avg.toFixed(2)})
                    </p>
                    <p>
                        <strong>Påverkande faktor:</strong>{" "}
                        {insights.worst.topFactor}
                    </p>
                </div>
            )}

            {insights?.timeInsights && (
                <div style={{ marginTop: "20px" }}>
                    <p>
                        I work environment <strong>'{selectedLocation}'</strong> uppnår du
                        bäst produktivitet mellan{" "}
                        <strong>
                            {insights.timeInsights.productivityRange.start} -{" "}
                            {insights.timeInsights.productivityRange.end}
                        </strong>
                    </p>

                    <p>
                        Du har mest energi runt{" "}
                        <strong>{insights.timeInsights.peakEnergyTime}</strong>
                    </p>
                </div>
            )}
        </div>
    );
}