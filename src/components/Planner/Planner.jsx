import styles from "./Planner.module.css";
import { useActivities } from "../../contexts/activityContext";
import ActivityCard from "../ActivityCard/ActivityCard";
import ClockTimeline from "../ClockTimeline/ClockTimeline";
import ActivityForm from "../ActivityForm/ActivityForm";

import Modal from "../Modal/Modal";
import { getWorkdayFromStorage } from "../../utils/workdayStorage";
import WorkDayForm from "../WorkDayForm/WorkDayForm";

function Planner() {
    const { activities, plannedActivities } = useActivities();

    let workformData = getWorkdayFromStorage();

    return (
        <>
            <div className={styles.container}>

                {workformData && 
                    <p className={`${styles.workTime} ${styles.start}`}><span>Start</span> {workformData.workHours.start}</p>
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

                {plannedActivities.length === 0 
                ?  <div className={styles.emptyContainer}>
                    <p className={styles.emptyAdd}>Add activity to planner<span>⤴</span></p>
                    <img src="/empty.svg" alt="Empty box" className={styles.emptyImg}/>
                    <p className={styles.emptyText}>A bit empty here...?</p>
                    </div>
                :  <>
                {plannedActivities.map((a, index) => (
                    <ActivityCard key={a.id} activity={a} index={index} />
                ))}</>
                }

                {workformData && 
                    <p className={`${styles.workTime} ${styles.end}`}><span>End</span> {workformData.workHours.end}</p>
                }
            </div>

        </>
    );
}

export default Planner;
