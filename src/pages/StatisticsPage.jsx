import ProductivityChart from "../components/Statistics/ProductivityChart";
import EnergyChart from "../components/Statistics/EnergyChart";
import TimeSpentChart from "../components/Statistics/TimeSpentChart";
import { mockData } from "../constants/mockData";
import { useActivityHistory } from "../contexts/activityHistoryContext";
import { useState } from "react";
import CalendarApp from "../components/Calendar/CalendarApp";

function StatisticsPage() {
    const { historyData, historyDispatch } = useActivityHistory();
    const [useRealData, setUseRealData] = useState(false);

    return (
        <>
            <button type="button" onClick={() => setUseRealData((v) => !v)}>
                {useRealData ? "Mock data" : "Real data"}
            </button>

            {/* knapp för fixa lite "real Date" */}
            <button
                type="button"
                onClick={() => {
                    const samples = [
                        {
                            id: `test-${Date.now()}-1`,
                            title: "Planning session",
                            category: "Planning",
                            estimatedDuration: 90,
                            totalTimeSpent: 95,
                            isMeeting: false,
                            scheduledTime: null,
                            activeTime: 25,
                            breakTime: 5,
                            isActive: false,
                            statistics: {
                                "08:30": { efficiency: 3, energy: 3, productivity: 3, factor: "focused" },
                                "09:00": { efficiency: 4, energy: 3, productivity: 4, factor: null },
                                "09:30": { efficiency: 3, energy: 2, productivity: 3, factor: "notifications" },
                            },
                        },
                        {
                            id: `test-${Date.now()}-2`,
                            title: "API work",
                            category: "Technical",
                            estimatedDuration: 120,
                            totalTimeSpent: 118,
                            isMeeting: false,
                            scheduledTime: null,
                            activeTime: 25,
                            breakTime: 5,
                            isActive: false,
                            statistics: {
                                "10:00": { efficiency: 4, energy: 4, productivity: 4, factor: null },
                                "10:30": { efficiency: 4, energy: 3, productivity: 4, factor: "energized" },
                                "11:00": { efficiency: 3, energy: 3, productivity: 3, factor: null },
                                "11:30": { efficiency: 3, energy: 2, productivity: 3, factor: "noise" },
                            },
                        },
                        {
                            id: `test-${Date.now()}-3`,
                            title: "Emails",
                            category: "Communication",
                            estimatedDuration: 30,
                            totalTimeSpent: 32,
                            isMeeting: false,
                            scheduledTime: null,
                            activeTime: 25,
                            breakTime: 5,
                            isActive: false,
                            statistics: {
                                "12:00": { efficiency: 2, energy: 2, productivity: 2, factor: "hungry" },
                                "12:15": { efficiency: 3, energy: 2, productivity: 3, factor: null },
                            },
                        },
                        {
                            id: `test-${Date.now()}-4`,
                            title: "UI mockups",
                            category: "Creative",
                            estimatedDuration: 120,
                            totalTimeSpent: 125,
                            isMeeting: false,
                            scheduledTime: null,
                            activeTime: 25,
                            breakTime: 5,
                            isActive: false,
                            statistics: {
                                "13:30": { efficiency: 4, energy: 4, productivity: 4, factor: "focused" },
                                "14:00": { efficiency: 4, energy: 4, productivity: 4, factor: null },
                                "14:30": { efficiency: 4, energy: 3, productivity: 4, factor: null },
                                "15:00": { efficiency: 3, energy: 3, productivity: 3, factor: "tired" },
                            },
                        },
                        {
                            id: `test-${Date.now()}-5`,
                            title: "Timesheet",
                            category: "Administrative",
                            estimatedDuration: 60,
                            totalTimeSpent: 55,
                            isMeeting: false,
                            scheduledTime: null,
                            activeTime: 25,
                            breakTime: 5,
                            isActive: false,
                            statistics: {
                                "15:30": { efficiency: 3, energy: 2, productivity: 2, factor: "tired" },
                                "15:55": { efficiency: 2, energy: 2, productivity: 2, factor: null },
                            },
                        },
                        {
                            id: `test-${Date.now()}-6`,
                            title: "Study",
                            category: "Learning",
                            estimatedDuration: 60,
                            totalTimeSpent: 70,
                            isMeeting: false,
                            scheduledTime: null,
                            activeTime: 25,
                            breakTime: 5,
                            isActive: false,
                            statistics: {
                                "09:00": { efficiency: 3, energy: 3, productivity: 3, factor: null },
                                "09:30": { efficiency: 4, energy: 4, productivity: 4, factor: "energized" },
                                "10:00": { efficiency: 3, energy: 3, productivity: 3, factor: null },
                            },
                        },
                    ];

                    samples.forEach((a, idx) => {
                        const dateKey = idx < 5 ? "26-02-25" : "26-02-26";

                        historyDispatch({
                            type: "ADD_TO_HISTORY",
                            payload: {
                                dateKey,
                                activity: a,
                            },
                        });
                    });
                }}
            >
                Add some real date
            </button>

            <button
                type="button"
                onClick={() => historyDispatch({ type: "CLEAR_HISTORY" })}
            >
                Clear history
            </button>
            

            <ProductivityChart mockData={mockData} historyData={historyData} useRealData={useRealData} />
            <EnergyChart mockData={mockData} historyData={historyData} useRealData={useRealData} />
            <TimeSpentChart mockData={mockData} historyData={historyData} useRealData={useRealData} />
            <CalendarApp />
        </>
    );
}

export default StatisticsPage;