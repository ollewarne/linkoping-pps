import WorkDayForm from "../WorkDayForm/WorkDayForm";
import { useState } from "react";
import styles from "./SettingsMenu.module.css";

function SettingsMenu() {
    const [isOpen, setIsOpen] = useState(false);

    function toggleMenu() {
        setIsOpen(!isOpen);
    }

    function closeMenu() {
        setIsOpen(false);
    }

    const handleBackdropClick = () => {
        closeMenu();
    };

    const handlePanelClick = (e) => {
        e.stopPropagation();
    };

    return (
        <>
            <button onClick={toggleMenu} className={styles.settingsButton}>
                <img src="/settings.svg" alt="Cogwheel settings button" />
            </button>

            {isOpen && (
                <div className={styles.overlay} onClick={handleBackdropClick}>
                    <div className={styles.menuPanel} onClick={handlePanelClick}>
                        <button onClick={closeMenu} className={styles.closeButton}>
                            ✕
                        </button>
                        <WorkDayForm />
                    </div>
                </div>
            )}
        </>
    );
}

export default SettingsMenu;
