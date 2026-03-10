import { useTranslator } from "../../contexts/languageContext";
// import styles from "./ChangeLanguage.module.css"

export function ChangeLanguage() {
    const { language, toggleLanguage } = useTranslator();

    return (
        <button onClick={toggleLanguage} className='header-btn'>
            <img src={language === 'sv' ? '/EN.svg' : '/SV.svg'} alt="Language selector" />
        </button>
    )
}
