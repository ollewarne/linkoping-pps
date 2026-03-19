import ProductivityChart from "../components/Statistics/ProductivityChart";
import EnergyChart from "../components/Statistics/EnergyChart";
import TimeSpentChart from "../components/Statistics/TimeSpentChart";
import { mockData } from "../constants/mockData";
import { useActivities } from "../contexts/activityContext";
import { useState } from "react";
import CalendarApp from "../components/Calendar/CalendarApp";
import "./StatisticsPage.css";

function StatisticsPage() {
  const { activities } = useActivities();
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
          historyData={activities}
          useRealData={useRealData}
        />
        <div className="TimeSpentChart">
          <TimeSpentChart
            mockData={mockData}
            historyData={activities}
            useRealData={useRealData}
          />
        </div>

        <EnergyChart
          mockData={mockData}
          historyData={activities}
          useRealData={useRealData}
        />
      </div>
    </>
  );
}

export default StatisticsPage;
