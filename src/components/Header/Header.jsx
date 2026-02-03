import styles from "./Header.module.css"
import { ChangeLanguage } from '../ChangeLanguage/ChangeLanguage';

function Header({children}) {
    return (
        <header className={styles.container}>
            <h1>BAE Productivity</h1>
            <ChangeLanguage />
        </header>
    )
}

export default Header;
