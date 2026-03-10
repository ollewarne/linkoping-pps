import WorkDayForm from "../WorkDayForm/WorkDayForm";
import Modal from "../Modal/Modal";
// import styles from "./SettingsMenu.module.css";

function SettingsMenu() {
    return (
        <Modal trigger={
            <button className='header-btn'>
                <img src="/settings.svg" alt="Cogwheel settings button" />
            </button>
        }>
            <WorkDayForm />
        </Modal>
    );
}

export default SettingsMenu;
