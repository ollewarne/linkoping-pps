import styles from "./BottomNav.module.css"

export default function BottomNav({ handleClick, activeView }: { handleClick: (view: string) => void, activeView: string }) {
    return (
        <div className={styles.container}>
            <button
                className={`${styles.button} ${activeView === "activityView" ? styles.active : ""}`}
                onClick={() => handleClick("activityView")}
            >
                Register Activity
            </button>
            <button
                className={`${styles.button} ${activeView === "scheduleView" ? styles.active : ""}`}
                onClick={() => handleClick("scheduleView")}
            >
                Schedule
            </button>
            <button
                className={`${styles.button} ${activeView === "statisticsView" ? styles.active : ""}`}
                onClick={() => handleClick("statisticsView")}
            >
                Statistics
            </button>
        </div>
    )
}
