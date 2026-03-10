import styles from "./Notification.module.css";

interface NotificationProps {
    message: string;
}

export default function ToastNotification({message}: NotificationProps) {
    return (
        <div className={styles.notification}>
            {message}
        </div>
    )
}
