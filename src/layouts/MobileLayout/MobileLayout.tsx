import { Outlet } from "react-router"
import BottomNav from "./BottomNav"
import styles from "./MobileLayout.module.css"
import { ChangeLanguage } from "../../components/ChangeLanguage/ChangeLanguage"
import ColorMode from "../../components/ThemeToggle/ThemeToggle"
import SettingsMenu from "../../components/SettingsMenu/SettingsMenu"
import DndToggle from "../../components/PopupManager/DnDToggle"


export default function MobileLayout() {

    return (
        <div className={styles.container}>
            <header className={styles.siteHeader}>
                <h1 className={styles.mobileTitle}>BAE Productivity</h1>
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
            <BottomNav />
        </div>
    )
}
