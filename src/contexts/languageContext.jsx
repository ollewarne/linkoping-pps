import { createContext, useContext, useState, useEffect, useMemo } from "react";

const LanguageContext = createContext(null);

export function TranslatePage({children}) {


    const [language, setLanguage] = useState(
        () => {
            const stored = localStorage.getItem('language');
            // return ['swedish', 'english', 'strider'].includes(stored) ? stored : 'swedish';
            return stored === 'sv' || stored === 'en' ? stored : 'en'
        }
    );

    useEffect(
        () => {
            localStorage.setItem('language', language)
        }, [language]
    );

    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === 'sv' ? 'en' : 'sv'))
    };

    const value = useMemo(
        () => ({
            language,
            setLanguage,
            toggleLanguage
        }), [language]
    );

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};


export function useTranslator() {

    const context = useContext(LanguageContext);
    if(!context){
        throw new Error('useTranslator must be used within LanguageProvider / useTranslator måste användas inom LanguageProvider')
    }

    return context;
}

