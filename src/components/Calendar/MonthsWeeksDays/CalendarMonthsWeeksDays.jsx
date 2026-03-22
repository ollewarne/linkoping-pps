import { useState } from "react";
import { useTranslator } from "../../../contexts/languageContext";
import { languageLibrary } from "../../../locales/language";

// Custom hook som sköter all logik kring månader, veckodagar och dagar i rutnätet
export const useCalendarMonthsWeeksDays = () => {
  const { language } = useTranslator();
  const t = languageLibrary[language];

  const daysOfWeek = t.daysOfWeek;
  const monthOfYear = t.months

  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Funktion som byter månad och uppdaterar både månad och år
  const changeMonth = (direction) => {
    const date = new Date(currentYear, currentMonth + direction);
    setCurrentMonth(date.getMonth());
    setCurrentYear(date.getFullYear());
  };

  // Räknar ut hur många dagar den aktuella månaden har
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Omvandlar till index där måndag = 0 (därför +6 % 7)
  const startDay = (firstDayOfMonth + 6) % 7;

  const daysArray = [];

  // Fyller på med tomma rutor i början av månaden, om day är null så blir det en tom ruta
  for (let i = 0; i < startDay; i++) {
    daysArray.push({ day: null, isToday: false });
  }

  // Lägger till de faktiska dagarna i månaden
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday =
      i === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear();
    daysArray.push({ day: i, isToday });
  }

  return {
    daysOfWeek,
    monthOfYear,
    currentMonth,
    currentYear,
    changeMonth,
    daysArray,
  };
};
