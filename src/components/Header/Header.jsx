import styles from "./Header.module.css"
import { ChangeLanguage } from '../ChangeLanguage/ChangeLanguage';

function Header({children}) {
    return (
        <header className={styles.container}>
            <ChangeLanguage />
        </header>
    )
}

export default Header;
