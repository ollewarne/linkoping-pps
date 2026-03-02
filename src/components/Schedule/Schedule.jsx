import styles from "./Schedule.module.css";
import { useActivities } from "../../contexts/activityContext";
import ActivityCard from "../ActivityCard/ActivityCard";
import ClockTimeline from "../ClockTimeline/ClockTimeline";
import ActivityForm from "../ActivityForm/ActivityForm";
import { useState } from "react";
import Modal from "../Modal/Modal";

function Schedule() {
    const { activities } = useActivities();

    return (
        <>
            <div className={styles.container}>
                <Modal trigger={(
                    <button className={styles.addActivityBtn}>
                        <img src="/add.svg" alt="" />
                    </button>)}
                >
                    <ActivityForm
                        defaultMode="scheduled"
                    />
                </Modal>

                {activities.length === 0 
                ?  <div className={styles.emptyContainer}>
                    <p className={styles.emptyText}>Add activity to planner<span>⤴</span></p>
                    <img src="/empty.svg" alt="Empty box" className={styles.emptyImg}/>
                    <p>A bit empty here...?</p>
                    </div>
                :  <>
                {activities.filter(a => a.scheduledTime).map((a, index) => (
                    <ActivityCard key={a.id} activity={a} index={index} />
                ))}</>
                }
            </div>

        </>
    );
}

export default Schedule;
