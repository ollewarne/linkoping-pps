import Modal from "../components/Modal/Modal";
import ActivityForm from "../components/ActivityForm/ActivityForm";
import './ActivityPage.css';
import { CountdownDisplay } from "../components/CountdownTimer/CountdownDisplay";

function ActivityPage() {
    return (
        <>
            <div className="page-content">
                <CountdownDisplay />
                <p>Next activity "Feed the dog" at: 13:00</p>
                <Modal trigger={<button>Create Activity</button>}>
                    {({ onClose }) => <ActivityForm onClose={onClose} />}
                </Modal>
            </div>
        </>
    )
}

export default ActivityPage;
