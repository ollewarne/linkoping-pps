import { NavLink } from "react-router";
import styles from "./BottomNav.module.css";
import { useTranslator } from "../../contexts/languageContext";
import { languageLibrary } from "../../locales/language";

export default function BottomNav() {
    const {language} = useTranslator();

    return (
        <div className={styles.container}>
            <nav className={styles.navigation}>
                <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : styles.navLink)}>
                    {languageLibrary[language].navLinkHome} {/*Home*/}
                </NavLink>
                <NavLink to="/statPage" className={({ isActive }) => (isActive ? styles.active : styles.navLink)}>
                    {languageLibrary[language].navLinkStats} {/*Statistics*/}
                </NavLink>
            </nav>
        </div>
    )
}
