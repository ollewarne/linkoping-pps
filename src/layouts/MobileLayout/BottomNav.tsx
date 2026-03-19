import { NavLink } from "react-router";
import styles from "./BottomNav.module.css"

export default function BottomNav() {
    return (
        <div className={styles.container}>
            <nav className={styles.navigation}>
                <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : styles.navLink)}>
                    Home
                </NavLink>
                <NavLink to="/statPage" className={({ isActive }) => (isActive ? styles.active : styles.navLink)}>
                    Statistics
                </NavLink>
            </nav>
        </div>
    )
}
