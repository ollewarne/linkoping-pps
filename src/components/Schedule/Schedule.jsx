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
                    <button className={styles.addActivityBtn}>+</button>)}
                >
                    <ActivityForm
                        defaultMode="scheduled"
                    />
                </Modal>

                {activities.filter(a => a.scheduledTime).map((a, index) => (
                    <ActivityCard key={a.id} activity={a} index={index} />
                ))}
            </div>

        </>
    );
}

export default Schedule;
