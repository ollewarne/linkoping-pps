import styles from "./Header.module.css"
import { ChangeLanguage } from '../ChangeLanguage/ChangeLanguage';
import ColorMode from '../ThemeToggle/ThemeToggle';

function Header({children}) {
    return (
        <header className={styles.container}>
            <h1>BAE Productivity</h1>
            <div>
            <ChangeLanguage />
            <ColorMode />
            {children}
            </div>
        </header>
    )
}

export default Header;
