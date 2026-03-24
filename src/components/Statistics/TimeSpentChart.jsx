import { useMemo } from "react";
import { PieChart } from "@mui/x-charts";
import { useMediaQuery } from "@mui/material";
import { categoryColors } from "../../constants/categoryColors";
import { userOptions } from "../../constants/userOptions";
import { useTranslator } from "../../contexts/languageContext";
import { languageLibrary } from "../../locales/language";

import { getHistorydataFromStorage } from "../../utils/workdayStorage";

const formatTime = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};


  const getCategoryLabel = (category, language) => {
  const enCategories = userOptions.en.category;
  const index = enCategories.indexOf(category);

  if (index === -1) return category;

  return userOptions[language].category[index];
}

export default function TimeSpentChart({
  mockData,
  // historyData,
  useRealData = false
}) {
  const languageObj = useTranslator();
  const language = languageObj.language;

  const historyData = getHistorydataFromStorage();

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
      acc[category] =
        (acc[category] || 0) + Math.floor((totalTimeSpent || 0) / 60);
      return acc;
    }, {});
  }, [source]);

  const finalChartData = Object.entries(aggregatedData)
    // ändrat: totalTimeSpent är i sekunder nu (inte minuter),vi behöver ändra tillbaka sen
    .filter(([, totalTimeSpent]) => totalTimeSpent > 0)
    .map(([category, totalTimeSpent], index) => ({
      id: index,
      value: totalTimeSpent,
      label: `${getCategoryLabel(category, language)} (${formatTime(totalTimeSpent)})`,
      color: categoryColors[category] || "pink",
    }));

  const isTabletOrDown = useMediaQuery("(max-width:1200px)");

  return (
    <>
    <h2 style={{textAlign: 'center', fontSize: '1.3rem', borderBottom: '2px solid var(--text)', paddingBottom: '1%'}}>{languageLibrary[language].statsPieTitle}</h2>
    
    <PieChart
      series={[
        {
          data: finalChartData,
          innerRadius: 45,
          arcLabelMinAngle: 25,
        },
      ]}
      slotProps={{
        legend: isTabletOrDown
          ? {
              direction: "row",
              position: { vertical: "bottom", horizontal: "middle" },
            }
          : undefined,
        pieArc: { stroke: "none" },
      }}
      width={isTabletOrDown ? 300 : 400}
      height={isTabletOrDown ? 260 : 300}
      sx={{
        "& .MuiChartsLegend-root": {
          marginTop: isTabletOrDown ? "16px" : 0,
          justifyContent: "center",
          flexWrap: "wrap",
        },
        "& .MuiChartsLabel-root": {
          color: "var(--text) !important",
        },
      }}
    />
    </>
  );
}