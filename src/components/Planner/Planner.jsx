import styles from "./Planner.module.css";
import { useActivities } from "../../contexts/activityContext";
import ActivityCard from "../ActivityCard/ActivityCard";
import HistoryCard from "../HistoryCard/HistoryCard";
import ClockTimeline from "../ClockTimeline/ClockTimeline";
import ActivityForm from "../ActivityForm/ActivityForm";

import Modal from "../Modal/Modal";
import { getWorkdayFromStorage } from "../../utils/workdayStorage";
import WorkDayForm from "../WorkDayForm/WorkDayForm";
import { convertStringTimeToMinutes, getCurrentTime } from "../../utils/convertTime";
import { useEffect, useMemo, useState } from "react";
import { CountdownDisplay } from "../CountdownTimer/CountdownDisplay";
import { useTimer } from "../../contexts/TimerContext";

function Planner() {
    const { activities, activityDispatch, plannedActivities, plannerMode, setPlannerMode } = useActivities();
    const {activeActivity } = useTimer();
    const [currentTime, setCurrentTime] = useState(
        getCurrentTime()
    );
    // const [isScheduled, setIsScheduled] = useState(defaultMode === "scheduled");

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

            if (!plannerMode && start <= currentTime) {
                history.push(a);
                activityDispatch({type: "SET_MISSED", payload: {id: a.id}})
            } else {
                agenda.push(a);
            }
        })

        return { historyActivities: history, agendaActivities: agenda, activeActivities: active }
    }, [plannedActivities, currentTime, plannerMode])

    let workformData = getWorkdayFromStorage();

    const date = new Date().toLocaleDateString();

    return (
        <div className={styles.plannerContainer}>

            <h2 className={styles.date}>{date}</h2>

            {workformData &&
                <div className={`${styles.plannerGridTitles} ${styles.plannerGridTitlesTop}`}>
                    <p className={`${styles.historyTitle} ${styles.plannerTitles}`}>History</p>
                    <p className={styles.agendaTime}><span>Start</span> {workformData.workHours.start}</p>
                </div>
            }


            <div className={styles.plannerGrid}>

                {/* --------------- HISTORY --------------- */}
                <div className={styles.historyContainer}>

                        {
                            historyActivities.map((a, index) => (
                                <HistoryCard key={a.id} activity={a} index={index} />
                            ))
                        }

                </div>

                {/* --------------- AGENDA --------------- */}
                <div className={styles.agendaContainer}>

                    <CountdownDisplay/>

                    
                    {/* --------------- EMPTY PAGE --------------- */}
                    {agendaActivities.length === 0 && activeActivities.length === 0 && !activeActivity
                        ? <div className={styles.emptyContainer}>
                            <img src="/empty.svg" alt="Empty box" className={styles.emptyImg} />
                            <p className={styles.emptyText}>A bit empty here...?</p>
                        </div>
                        
                    // --------------- ACTIVITY CARDS PAGE ---------------
                        : <>
                            {
                                agendaActivities.map((a, index) => (
                                    <ActivityCard key={a.id} activity={a} index={index} />
                                ))
                            }
                        </>
                    }

                    
                </div>

                {/* --------------- BUTTONS --------------- */}
                <div className={styles.buttonsContainer}>


                  
                    {/* --------------- START ACTIVITY BTN --------------- */}
                    <Modal trigger={(
                        <button
                            id='start-activity'
                            className={styles.startActivityBtn}
                            // onClick={() => {
                            //     setIsScheduled(false)
                            //     // setShowForm(true)
                            // }}
                            >
                            <div className={styles.colorBlock} style={{backgroundColor: '#358C4E'}}></div>
                            <img src="/timer.svg" alt="" />
                            <p>Starta Aktivitet</p>
                        </button>
                    )}>
                        <ActivityForm
                            planMode={false}
                        />

                    </Modal>


                    {/* --------------- ADD BTN --------------- */}
                    <Modal trigger={(
                        <button className={styles.addActivityBtn}>
                            <div className={styles.colorBlock} style={{backgroundColor: '#358C4E'}}></div>
                            <img src="/add-large.svg" alt="" />
                            <p>Lägg till</p>
                        </button>)}
                    >

                        {workformData ? (
                            <ActivityForm
                                planMode={true}
                            />
                        ) : (
                            <>
                                <p>Please enter the specifics for your workday before registering activities</p>
                                <WorkDayForm />
                            </>
                        )}
                    </Modal>

                    {/* --------------- START / STOP BTN --------------- */}
                    {agendaActivities.length === 0 && !plannerMode
                        ? <></>
                        : <button onClick={() => setPlannerMode(!plannerMode)} className={styles.startActivityBtn}>
                            <div className={styles.colorBlock} style={{backgroundColor: plannerMode ? '#EF2917' : '#358C4E'}}></div>
                            <img src={ plannerMode ? "/stop.svg" : "/play.svg"} alt="" />
                            <p>{plannerMode ? "Stop planner" : "Start planner"}</p>
                        </button>
                    }

                </div>

            </div>


            {workformData &&
                <div className={`${styles.plannerGridTitles} ${styles.plannerGridTitlesBottom}`}>
                    <p className={`${styles.agendaTime} ${styles.endTime}`}><span>End</span> {workformData.workHours.end}</p>
                </div>
            }

        </div>
    );
}

export default Planner;
