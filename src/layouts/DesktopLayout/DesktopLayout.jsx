import { NavLink, Outlet } from "react-router";
import ColorMode from "../../components/ThemeToggle/ThemeToggle";
import { ChangeLanguage } from "../../components/ChangeLanguage/ChangeLanguage";
import styles from "./DesktopLayout.module.css"
import SettingsMenu from "../../components/SettingsMenu/SettingsMenu";
import DndToggle from "../../components/PopupManager/DnDToggle";


function DesktopLayout() {
    return (
        <div className={styles.container}>
            <header className={styles.siteHeader}>
                <h1>BAE <span> Productivity</span></h1>
                <nav className={styles.navigation}>
                    <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : styles.navLink)}>
                        Home
                    </NavLink>
                    <NavLink to="/statPage" className={({ isActive }) => (isActive ? styles.active : styles.navLink)}>
                        Statistics
                    </NavLink>
                </nav>
                <div className={styles.buttonGroup}>
                    <DndToggle />
                    <ChangeLanguage />
                    <ColorMode />
                    <SettingsMenu />
                </div>
            </header>
            <main className={styles.appMain}>
                <Outlet />
            </main>

        </div>
    )
}

export default DesktopLayout;
