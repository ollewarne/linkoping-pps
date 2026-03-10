import { ThemeProvider, useTheme } from "../../contexts/ThemeContext";
import "./ThemeToggle-module.css";
import styles from "./ThemeToggle.module.css";

function ThemeToggleButton() {
  const {theme, toggleTheme} = useTheme();

  return (
    <button
      className={`header-btn ${styles.themeBtn}`}
      onClick={toggleTheme}
      aria-label={`Change to ${theme === "light" ? "dark" : "light"} theme`}
    >
      <img
        src={theme === "light" ? "/moon.svg" : "/sun.svg"}
        alt=""
      />
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