import { NavLink } from "react-router";
import styles from "./BottomNav.module.css"

export default function BottomNav() {
    return (
        <div className={styles.container}>
            <nav className={styles.navigation}>
                <NavLink to="/" end className={({ isActive }) => (isActive ? styles.active : styles.navLink)}>
                    Activity
                </NavLink>
                <NavLink to="/planner" className={({ isActive }) => (isActive ? styles.active : styles.navLink)}>
                    Planner
                </NavLink>
                <NavLink to="/history" className={({ isActive }) => (isActive ? styles.active : styles.navLink)}>
                    History
                </NavLink>
            </nav>
        </div>
    )
}
