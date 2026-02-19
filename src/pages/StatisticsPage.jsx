
import ProductivityChart from "../components/Statistics/ProductivityChart";
import EnergyChart from "../components/Statistics/EnergyChart";
import { mockData } from "../constants/mockData";

function StatisticsPage() {
    return (
    <>
        <ProductivityChart mockData={mockData} />
        <EnergyChart mockData={mockData} />
    </>
    )
}

export default StatisticsPage;

