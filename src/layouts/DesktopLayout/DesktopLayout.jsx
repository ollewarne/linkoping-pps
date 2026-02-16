import { NavLink, Outlet } from "react-router";
import ColorMode from "../../components/ThemeToggle/ThemeToggle";
import { ChangeLanguage } from "../../components/ChangeLanguage/ChangeLanguage";
import styles from "./DesktopLayout.module.css"


function DesktopLayout() {
    return (
        <div className={styles.container}>
            <header className={styles.siteHeader}>
                <h1>BAE Productivity</h1>
                <nav className={styles.navigation}>
                    <NavLink to="/" end className={({ isActive }) => (isActive ? styles.active : styles.navLink)}>
                        Activity
                    </NavLink>
                    <NavLink to="/schedule" className={({ isActive }) => (isActive ? styles.active : styles.navLink)}>
                        Schedule
                    </NavLink>
                    <NavLink to="/statistics" className={({ isActive }) => (isActive ? styles.active : styles.navLink)}>
                        Statistics
                    </NavLink>
                </nav>
                <div className={styles.buttonGroup}>
                    <ChangeLanguage />
                    <ColorMode />
                </div>
            </header>
            <main className={styles.appMain}>
                <Outlet />
            </main>

        </div>
    )
}

export default DesktopLayout;
