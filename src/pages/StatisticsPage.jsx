import ProductivityChart from "../components/Statistics/ProductivityChart";
import EnergyChart from "../components/Statistics/EnergyChart";
import TimeSpentChart from "../components/Statistics/TimeSpentChart";
import { mockData } from "../constants/mockData";
import CalendarApp from "../components/Calendar/CalendarApp";

function StatisticsPage() {
    return (
    <>
        <ProductivityChart mockData={mockData} />
        <EnergyChart mockData={mockData} />
        <TimeSpentChart />
        <CalendarApp />
    </>
    )
}

export default StatisticsPage;

