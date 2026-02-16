import { useState } from "react";
import ActivityForm from "../components/ActivityForm/ActivityForm";
import './ActivityPage.css';

function ActivityPage() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className="page-content">
                <div className="activity-timer">
                    <p>Current activity: Write CSS</p>
                    <p>Time left: 2h 20m</p>
                    <p>Next pause in: 6m</p>
                </div>
                <p>Next activity "Feed the dog" at: 13:00</p>
                <button onClick={() => setIsOpen(true)}>Create Activity</button>
            </div>
            {
                isOpen && (
                    <div className="modal-overlay" onClick={() => setIsOpen(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="modal-close" onClick={() => setIsOpen(false)}>×</button>
                            <ActivityForm onClose={() => setIsOpen(false)} />
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ActivityPage;
