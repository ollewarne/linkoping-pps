import Modal from "../components/Modal/Modal";
import ActivityForm from "../components/ActivityForm/ActivityForm";
import './ActivityPage.css';

function ActivityPage() {
    return (
        <>
            <div className="page-content">
                <div className="activity-timer">
                    <p>Current activity: Write CSS</p>
                    <p>Time left: 2h 20m</p>
                    <p>Next pause in: 6m</p>
                </div>
                <p>Next activity "Feed the dog" at: 13:00</p>
                <Modal trigger={<button>Create Activity</button>}>
                    {({ onClose }) => <ActivityForm onClose={onClose} />}
                </Modal>
            </div>
        </>
    )
}

export default ActivityPage;
