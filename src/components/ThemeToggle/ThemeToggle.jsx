import { ThemeProvider, useTheme } from "../../contexts/ThemeContext";
import './ThemeToggle-module.css';


/* Använder useTheme() för att veta vilket tema vi har just nu
   och för att kunna toggla det när man klickar.
   hämtar aktuell tema och toggle-funktion från vår context
   via custom hook useTheme() */
function ThemeToggleButton() {
    const { theme, toggleTheme } = useTheme();

    return (
    <button
      className="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label={`Change to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {/* {theme === "light" ?  "🌙" : "🔆"} */}

      <img 
        src={theme === 'light' ? '/moon.svg' : '/sun.svg'} alt="" />
      
    </button>
  );
}

export default function ColorMode() {
  return (
    <ThemeProvider>
      <ThemeToggleButton />   
    </ThemeProvider>
  );
}
