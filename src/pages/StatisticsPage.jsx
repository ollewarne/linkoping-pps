import ProductivityChart from "../components/Statistics/ProductivityChart";
import EnergyChart from "../components/Statistics/EnergyChart";
import TimeSpentChart from "../components/Statistics/TimeSpentChart";
import { mockData } from "../constants/mockData";
import { useActivityHistory } from "../contexts/activityHistoryContext";
import { useState } from "react";

function StatisticsPage() {
    const { historyActivities, historyDispatch } = useActivityHistory();
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
                    "2026-02-25T08:30:00.000Z": { efficiency: 3, energy: 3, productivity: 3, factor: "focused" },
                    "2026-02-25T09:00:00.000Z": { efficiency: 4, energy: 3, productivity: 4, factor: null },
                    "2026-02-25T09:30:00.000Z": { efficiency: 3, energy: 2, productivity: 3, factor: "notifications" },
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
                    "2026-02-25T10:00:00.000Z": { efficiency: 4, energy: 4, productivity: 4, factor: null },
                    "2026-02-25T10:30:00.000Z": { efficiency: 4, energy: 3, productivity: 4, factor: "energized" },
                    "2026-02-25T11:00:00.000Z": { efficiency: 3, energy: 3, productivity: 3, factor: null },
                    "2026-02-25T11:30:00.000Z": { efficiency: 3, energy: 2, productivity: 3, factor: "noise" },
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
                    "2026-02-25T12:00:00.000Z": { efficiency: 2, energy: 2, productivity: 2, factor: "hungry" },
                    "2026-02-25T12:15:00.000Z": { efficiency: 3, energy: 2, productivity: 3, factor: null },
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
                    "2026-02-25T13:30:00.000Z": { efficiency: 4, energy: 4, productivity: 4, factor: "focused" },
                    "2026-02-25T14:00:00.000Z": { efficiency: 4, energy: 4, productivity: 4, factor: null },
                    "2026-02-25T14:30:00.000Z": { efficiency: 4, energy: 3, productivity: 4, factor: null },
                    "2026-02-25T15:00:00.000Z": { efficiency: 3, energy: 3, productivity: 3, factor: "tired" },
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
                    "2026-02-25T15:30:00.000Z": { efficiency: 3, energy: 2, productivity: 2, factor: "tired" },
                    "2026-02-25T15:55:00.000Z": { efficiency: 2, energy: 2, productivity: 2, factor: null },
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
                    "2026-02-26T09:00:00.000Z": { efficiency: 3, energy: 3, productivity: 3, factor: null },
                    "2026-02-26T09:30:00.000Z": { efficiency: 4, energy: 4, productivity: 4, factor: "energized" },
                    "2026-02-26T10:00:00.000Z": { efficiency: 3, energy: 3, productivity: 3, factor: null },
                    },
                },
                ];

                samples.forEach((a) => {
                historyDispatch({ type: "ADD_TO_HISTORY", payload: a });
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

            <ProductivityChart mockData={mockData} useRealData={useRealData} />
            <EnergyChart mockData={mockData} useRealData={useRealData} />
            <TimeSpentChart mockData={mockData} useRealData={useRealData} />
        </>
    );
}

export default StatisticsPage;