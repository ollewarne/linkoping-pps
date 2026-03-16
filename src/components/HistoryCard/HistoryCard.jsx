import styles from "./HistoryCard.module.css";

import { categoryColors } from "../../constants/categoryColors";

// Kommer användas sen
// import { useTranslator } from "../../contexts/languageContext";
// import { languageLibrary } from "../../locales/language";


function HistoryCard({activity = {}}) {
    const categoryColor = categoryColors[activity.category];

    return (
        <div className={styles.historyCard}>
            <div className={styles.timeContainer} style={{borderColor: categoryColor}}>
                <p className={styles.time} >
                    {activity.scheduledTimeStart} - {activity.scheduledTimeStop}
                </p>
                
            </div>

            <p className={styles.title}>
                {activity.title}
            </p>
            
            <div className={styles.categoryColorBlock} style={{backgroundColor: categoryColor}}>
                <img 
                    src={ activity.isCompleted || activity.category === 'NonWork' ? "/activity-done.svg" : "/activity-missed.svg"} 
                    alt="Done or missed check icon" 
                    
                />
            </div>

        </div>
    )
}

export default HistoryCard;