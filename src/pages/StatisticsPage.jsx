import ProductivityChart from "../components/Statistics/ProductivityChart";
import EnergyChart from "../components/Statistics/EnergyChart";
import TimeSpentChart from "../components/Statistics/TimeSpentChart";
import LocationStats from "../components/Statistics/LocationStats";
import { mockData } from "../constants/mockData";
import { useActivities } from "../contexts/activityContext";
import { useState } from "react";
import CalendarApp from "../components/Calendar/CalendarApp";
import "./StatisticsPage.css";
import { hasHistoryData } from "../utils/hasHistoryData";

function StatisticsPage() {
  const [useRealData, setUseRealData] = useState(false);
  const historyData = JSON.parse(localStorage.getItem("activityHistory") || "{}");
  const hasRealData = hasHistoryData(historyData);
  return (
    <>
      {hasRealData && (
        <button type="button" onClick={() => setUseRealData((v) => !v)}>
          {useRealData ? "Mock data" : "Real data"}
        </button>
      )}

      <div className="statistics-wrapper">
        <div className="left-column-statistics">
           <div className="statistics-item CalendarApp">
            <CalendarApp
              useRealData={useRealData}/>
          </div>
           <div className="statistics-item ProductivityChart">
            <ProductivityChart
              mockData={mockData}
              historyData={historyData}
              useRealData={useRealData}
            />
          </div>
          
         
        </div>

        <div className="right-column-statistics">
          <div className="statistics-item TimeSpentChart">
            <TimeSpentChart
              mockData={mockData}
              historyData={historyData}
              useRealData={useRealData}
            />
          </div>
          <div className="statistics-item EneryChart">
            <EnergyChart
              mockData={mockData}
              historyData={historyData}
              useRealData={useRealData}
            />
          </div>
        </div>
      </div>

    <LocationStats
      mockData={mockData}
      // historyData={activities}
      useRealData={useRealData}/>

    </>
  );
}

export default StatisticsPage;