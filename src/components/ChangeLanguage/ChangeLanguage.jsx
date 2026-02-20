import { useTranslator } from "../../contexts/languageContext";
import styles from "./ChangeLanguage.module.css"



export function ChangeLanguage() {
    const { language, toggleLanguage } = useTranslator();

    return (
        <button onClick={toggleLanguage} className={styles['language-toggle-btn']}>
            <span>{language === 'sv' ? 'EN' : 'SV'}</span>
        </button>
    )
}
