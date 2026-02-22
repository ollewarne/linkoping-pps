import { createContext, useContext, useState } from "react";
import ToastNotification from "../components/Notification/Notification";

interface NotificationContextType {
    showNotification: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [notification, setNotification] = useState<string | null>(null);

    function showNotification(message: string) {
        setNotification(message);
        setTimeout(() => setNotification(null), 2500);
    }

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            {notification && <ToastNotification message={notification} />}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    return useContext(NotificationContext);
}
