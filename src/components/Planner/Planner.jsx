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

import { useTranslator } from "../../contexts/languageContext";
import { languageLibrary } from "../../locales/language.ts";


function Planner() {
    const { language } = useTranslator();
    const { activityDispatch, plannedActivities, plannerMode, setPlannerMode } = useActivities();
    const { activeActivity } = useTimer();
    const [currentTime, setCurrentTime] = useState(
        getCurrentTime()
    );
    const [historyOpen, setHistoryOpen] = useState(false);

    useEffect(() => {
        if (plannerMode) return;
        const interval = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.getHours() * 60 + now.getMinutes())
        }, 30000)

        return () => clearInterval(interval);
    }, [plannerMode])

    const { historyActivities, agendaActivities, activeActivities, missedIds } = useMemo(() => {
        const history = [];
        const agenda = [];
        const active = [];
        const missed = [];

        plannedActivities.forEach((a) => {
            if (a.category === "NonWork") {
                const end = +convertStringTimeToMinutes(a.scheduledTimeStop);
                if (currentTime >= end) {
                    history.push(a);
                    return;
                }
                agenda.push(a)
                return
            }

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

                if (!a.isMissed) {
                    missed.push(a.id);
                }

            } else {
                agenda.push(a);
            }
        })

        return { historyActivities: history, agendaActivities: agenda, activeActivities: active, missedIds: missed }

    }, [plannedActivities, currentTime, plannerMode])

    useEffect(() => {
        if (missedIds.length === 0) return;

        missedIds.forEach((id) => {
            activityDispatch({ type: "SET_MISSED", payload: { id } });
        });
    }, [missedIds, activityDispatch]);

    let workformData = getWorkdayFromStorage();
    const date = new Date().toLocaleDateString();

    return (
        <>

        {workformData ? (
            <>
            <div className={styles.plannerContainer}>
                <h2 className={styles.date}>{date}</h2>

                <div className={styles.plannerGrid}>

                    {/* --------------- HISTORY --------------- */}
                    <div className={styles.historyContainer}>
                        <p className={styles.historyTitle} onClick={() => setHistoryOpen(!historyOpen)}>
                            {languageLibrary[language].homeHistoryTitle} {window.innerWidth <= 768 && <img className={styles.historyExpandable} src={historyOpen ? "/collaps.svg" : "/expand.svg"} />}
                        </p>
                        {(historyOpen || window.innerWidth > 768) && historyActivities.map((a, index) => (
                            <HistoryCard key={a.id} activity={a} index={index} />
                        ))}
                    </div>

                    {/* --------------- AGENDA --------------- */}
                    <div className={styles.agendaContainer}>
                        {workformData &&
                            <p className={styles.agendaTime}><span>{languageLibrary[language].start}</span> {workformData.workHours.start}</p> // Start xx:xx
                        }

                        <CountdownDisplay />

                        {/* --------------- EMPTY PAGE --------------- */}
                        {agendaActivities.length === 0 && activeActivities.length === 0 && !activeActivity
                            ? <div className={styles.emptyContainer}>
                                <img src="/empty.svg" alt="Empty box" className={styles.emptyImg} />
                                <p className={styles.emptyText}>{languageLibrary[language].homeEmptyPage}</p> {/* A bit empty here...? */}
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
                        <p className={styles.endTime}><span>{languageLibrary[language].end}</span> {workformData.workHours.end}</p> {/* End */}
                    </div>

                    {/* --------------- START / STOP BTN --------------- */}
                    {agendaActivities.length === 0 && !plannerMode
                        ? <></>
                        : <button onClick={() => setPlannerMode(!plannerMode)} className={styles.startActivityBtn}>
                            <div className={styles.colorBlock} style={{ backgroundColor: plannerMode ? '#EF2917' : '#358C4E' }}></div>
                            <img src={plannerMode ? "/stop.svg" : "/play.svg"} alt="" />
                            <p>{plannerMode ? languageLibrary[language].homePageBtnStopPlanner : languageLibrary[language].homePageBtnStartPlanner}</p> {/* Stop Planned : Start Planned */}
                        </button>
                    }
                </div>
            </div>
            </>
        ) : (

                <div style={{display: 'flex', flexDirection: 'column'}}>
                <p style={{margin: '5% 0 0 0', fontSize: '1.5rem', textAlign: 'center'}}>
                    {languageLibrary[language].welcome} <span style={{fontWeight: '700'}}>BAE {languageLibrary[language].pageTitle}</span>
                </p>
                <p>{languageLibrary[language].prompt}</p>
                <p style={{margin: '0 0 3% 0', fontStyle: 'italic', fontSize: '0.9rem'}}>
                    {languageLibrary[language].change}</p>
                    <div style={{ padding: '18px', borderRadius: '16px', marginTop: '2%'} }
                        className={styles.firstPrompt}>
                        <WorkDayForm />
                    </div>

                </div>
                )}
    </>)};

export default Planner;
