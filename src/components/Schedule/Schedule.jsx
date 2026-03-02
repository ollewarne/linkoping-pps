import styles from "./Schedule.module.css";
import { useActivities } from "../../contexts/activityContext";
import ActivityCard from "../ActivityCard/ActivityCard";
import ClockTimeline from "../ClockTimeline/ClockTimeline";
import ActivityForm from "../ActivityForm/ActivityForm";
import { useState } from "react";
import Modal from "../Modal/Modal";

function Schedule() {
    const { activities } = useActivities();
    const [showForm, setShowForm] = useState(false);

    return (
        <>
        <div className={styles.container}>
                <Modal trigger={(
                <button className={styles.addActivityBtn}>+</button>)}
                >

                  {(onClose) => 
                    <ActivityForm
                        defaultMode="scheduled"
                        onClose={onClose}
                    />}
                
                    
                </Modal>

                {activities.filter(a => a.scheduledTime).map((a, index) => (
                    <ActivityCard key={a.id} activity={a} index={index} />
                ))}
        </div>

     
        </>
    );
}


// onClick={() => setShowForm(true)

export default Schedule;
