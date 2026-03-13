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
import { useEffect, useState } from "react";

function Planner() {
    const { activities, plannedActivities } = useActivities();
    const [, forceUpdate] = useState(0);

    const now = new Date();
    const currentTime = (now.getHours() * 60 + now.getMinutes()); //minus 60 för svensk tidzon???


    const historyActivities = [];
    const agendaActivities = [];
    const activeActivities = [];

    plannedActivities.forEach((a) => {
        if(a.isActive) {
            activeActivities.push(a);
            return;
        }

        if(a.isCompleted) {
            historyActivities.push(a);
            return;
        }

        if(!a.scheduledTimeStart) return;

        const start = +convertStringTimeToMinutes(a.scheduledTimeStart) + 15;

        if(start <= currentTime) {
            historyActivities.push(a);
        } else {
            agendaActivities.push(a);
        }
    })
  


    let workformData = getWorkdayFromStorage();

    // -----------------------------------------------------------------------------------------------
    // ------------------------- AVKOMMENTERTA FÖR AUTO UPPDATERING 1ggr/min -------------------------
    // -----------------------------------------------------------------------------------------------

    // useEffect(() => {

    //     // let test = 0;

    //     const interval = setInterval(() => {
    //         forceUpdate(n => n +1);
    //         // test = test + 1
    //         // console.log(test)
    //     }, 60000); // 1ggr i min??

    //     return () => clearInterval(interval);
    
    // }, []);

    // -----------------------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------------------


    return (
        <div className={styles.plannerGrid}>
            <div className={styles.historyContainer}>

                <div className={styles.historyCard}>

                    <p className={`${styles.historyTitle} ${styles.plannerTitles}`}>HISTORY</p>
                  {
                    
                    historyActivities.map((a, index) => (
                        <HistoryCard key={a.id} activity={a} index={index}/>
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
                        <WorkDayForm/>
                        </>
                    )}
                </Modal>

                {agendaActivities.length === 0 
                ? <div className={styles.emptyContainer}>
                    <p className={styles.emptyAdd}>Add activity to planner<span>⤴</span></p>
                    <img src="/empty.svg" alt="Empty box" className={styles.emptyImg}/>
                    <p className={styles.emptyText}>A bit empty here...?</p>
                </div>
                :  <>
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
                        <ActivityCard key={a.id} activity={a} index={index}/>
                    ))
                }
                <p>ACTIVE</p>
                <p>Work in progress</p>

            </div>

        </div>
    );
}

export default Planner;
