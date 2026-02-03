import { useTranslator } from "../../contexts/languageContext";


export function ChangeLanguage() {
    const { language, toggleLanguage } = useTranslator();

    return (
        <button onClick={toggleLanguage}>
            {language === 'sv' ? 'English' : 'Svenska'}
        </button>
    )
}
