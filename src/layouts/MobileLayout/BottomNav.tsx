import { NavLink } from "react-router";
import styles from "./BottomNav.module.css"

export default function BottomNav() {
    return (
        <div className={styles.container}>
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
        </div>
    )
}
