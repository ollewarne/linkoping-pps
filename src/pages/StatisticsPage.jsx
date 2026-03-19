import ProductivityChart from "../components/Statistics/ProductivityChart";
import EnergyChart from "../components/Statistics/EnergyChart";
import TimeSpentChart from "../components/Statistics/TimeSpentChart";
import { mockData } from "../constants/mockData";
import { useActivities } from "../contexts/activityContext";
import { useState, useEffect } from "react";
import CalendarApp from "../components/Calendar/CalendarApp";
import "./StatisticsPage.css";

function StatisticsPage() {
const [historyData, setHistoryData] = useState({});
useEffect(() => {
  const data = JSON.parse(localStorage.getItem("activityHistory") || "{}");
  setHistoryData(data);
}, []);
  const [useRealData, setUseRealData] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setUseRealData((v) => !v)}>
        {useRealData ? "Mock data" : "Real data"}
      </button>
  
      <div className="statistics-wrapper">
        <div className="CalendarApp">
          <CalendarApp />
        </div>

        <ProductivityChart
          mockData={mockData}
          historyData={historyData}
          useRealData={useRealData}
        />
        <div className="TimeSpentChart">
          <TimeSpentChart
            mockData={mockData}
            historyData={historyData}
            useRealData={useRealData}
          />
        </div>

        <EnergyChart
          mockData={mockData}
          historyData={historyData}
          useRealData={useRealData}
        />
      </div>
    </>
  );
}

export default StatisticsPage;
