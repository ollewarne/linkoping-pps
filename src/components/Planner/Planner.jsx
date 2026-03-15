import styles from "./Planner.module.css";
import { useActivities } from "../../contexts/activityContext";
import ActivityCard from "../ActivityCard/ActivityCard";
import HistoryCard from "../HistoryCard/HistoryCard";
import ClockTimeline from "../ClockTimeline/ClockTimeline";
import ActivityForm from "../ActivityForm/ActivityForm";

import Modal from "../Modal/Modal";
import { getWorkdayFromStorage } from "../../utils/workdayStorage";
import WorkDayForm from "../WorkDayForm/WorkDayForm";
import { convertStringTimeToMinutes } from "../../utils/convertTime";
import { useEffect, useMemo, useState } from "react";

function Planner() {
    const { activities, plannedActivities, plannerMode, setPlannerMode } = useActivities();
    const [currentTime, setCurrentTime] = useState(
        () => {
            const now = new Date();
            return now.getHours() * 60 + now.getMinutes();
        }
    );

    useEffect(() => {
        if (plannerMode) return;
        const interval = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.getHours() * 60 + now.getMinutes())
        }, 30000)

        return () => clearInterval(interval);
    }, [plannerMode])

    const { historyActivities, agendaActivities, activeActivities } = useMemo(() => {
        const history = [];
        const agenda = [];
        const active = [];

        plannedActivities.forEach((a) => {
            if (a.isActive) {
                active.push(a);
                return;
            }

            if (a.isCompleted) {
                history.push(a);
                return;
            }

            if (!a.scheduledTimeStart) return;

            const start = +convertStringTimeToMinutes(a.scheduledTimeStart) + 15;

            if (start <= currentTime) {
                history.push(a);
            } else {
                agenda.push(a);
            }
        })

        return { historyActivities: history, agendaActivities: agenda, activeActivities: active }
    }, [plannedActivities, currentTime])

    let workformData = getWorkdayFromStorage();

    return (
        <div className={styles.plannerGrid}>
            <div className={styles.historyContainer}>

                <div className={styles.historyCard}>

                    <p className={`${styles.historyTitle} ${styles.plannerTitles}`}>HISTORY</p>
                    {

                        historyActivities.map((a, index) => (
                            <HistoryCard key={a.id} activity={a} index={index} />
                        ))
                    }
                </div>

            </div>
            <div className={styles.agendaContainer}>

                {workformData &&
                    <>
                        <div className={styles.agendaTitelContainer}>
                            <p className={styles.agendaTime}>{workformData.workHours.start} <span>Start</span></p>
                            <p className={`${styles.agendaTitle} ${styles.plannerTitles}`}>Planner</p>
                            <p className={styles.agendaDate}><span>Date</span> 2025-07-08 </p>
                        </div>

                    </>
                }
                <Modal trigger={(
                    <button className={styles.addActivityBtn}>
                        <img src="/add.svg" alt="" />
                    </button>)}
                >

                    {workformData ? (
                        <ActivityForm
                            defaultMode="scheduled"
                        />
                    ) : (
                        <>
                            <p>Please enter the specifics for your workday before registering activities</p>
                            <WorkDayForm />
                        </>
                    )}
                </Modal>

                {agendaActivities.length === 0
                    ? <div className={styles.emptyContainer}>
                        <p className={styles.emptyAdd}>Add activity to planner<span>⤴</span></p>
                        <img src="/empty.svg" alt="Empty box" className={styles.emptyImg} />
                        <p className={styles.emptyText}>A bit empty here...?</p>
                    </div>
                    : <>
                        {/* {
                    plannedActivities.map((a, index) => (
                        <ActivityCard key={a.id} activity={a} index={index} />
                    ))
                    } */}
                        {
                            agendaActivities.map((a, index) => (
                                <ActivityCard key={a.id} activity={a} index={index} />
                            ))
                        }
                    </>
                }

                {workformData &&
                    <p className={`${styles.workTime} ${styles.end}`}><span>End</span> {workformData.workHours.end}</p>
                }
            </div>

            <div className={styles.activeContainer}>
                {
                    activeActivities.map((a, index) => (
                        <ActivityCard key={a.id} activity={a} index={index} />
                    ))
                }
                <p>ACTIVE</p>
                <button onClick={() => setPlannerMode(!plannerMode)}>
                {plannerMode ? "Stop planner" : "Start planner"}
                </button>

            </div>

        </div>
    );
}

export default Planner;
