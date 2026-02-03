
import { createContext, useContext, useMemo, useState, useEffect } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored === "dark" || stored === "light" ? stored : "light";
  });

  /*
  Körs varje gång theme ändras.
  Sparar det i localStorage, och kommer ihåg theme nästa gång sidan laddas.
  Sätter data-theme-attributet på <html>-taggen.
  */ 
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    
  }, [theme]);

  // funktion för att växla mellan "light" och "dark".
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // useMemo skapar ett objekt som bara ändras när theme ändras. hindrar onödiga re-renders.
  const value = useMemo(
    () => ({ theme, toggleTheme }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// custom hook. enklare och använda theme.
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme måste användas inom ThemeProvider");
  }
  return context;
}