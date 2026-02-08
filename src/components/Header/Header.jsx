import styles from "./Header.module.css"
import DndToggle from "../PopupManager/DndToggle";
import { ChangeLanguage } from '../ChangeLanguage/ChangeLanguage';
import ColorMode from '../ThemeToggle/ThemeToggle';

function Header({children,isDndEnabled,toggleDnd}) {
    return (
        <header className={styles.container}>
            <h1>BAE Productivity</h1>
             <DndToggle isOn={isDndEnabled} onToggle={toggleDnd} />
             <div className={styles.buttonGroup}>
            <ChangeLanguage />
            <ColorMode />
            {children}
            </div>
        </header>
    );
}

export default Header;
