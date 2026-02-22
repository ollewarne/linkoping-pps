import { useState } from "react";
import { mockData } from "../../constants/mockData";
import { DayDetailsPopup } from "./DayDetails/DayDetails";
import { useCalendarMonthsWeeksDays } from "./MonthsWeeksDays/CalendarMonthsWeeksDays";
import "./MonthsWeeksDays/CalendarApp.css"

const CalenderApp = () => {
  // Hämtar alla värden och funktioner från custom hooken
  const {
    daysOfWeek,
    monthOfYear,
    currentMonth,
    currentYear,
    changeMonth,
    daysArray,
  } = useCalendarMonthsWeeksDays();

  

  // State för vald dag (yyyy-mm-dd)
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Hjälpfunktion för att skapa datumsträng
  const getDateString = (day) => {
    const month = currentMonth + 1; // månad 0-index
    const dayString = day < 10 ? `0${day}` : day;
    const monthString = month < 10 ? `0${month}` : month;
    return `${currentYear}-${monthString}-${dayString}`;
  };

  const normalizedMock = {};
  for (let key in mockData) {
    const [y, m, d] = key.split("-");
   const fullDate = `20${y}-${m}-${d}`;
    normalizedMock[fullDate] = mockData[key]
  }

  return (
    <div className="Calender-container">
    <div className="Calendar-app">
      <div className="calender">
        <h1 className="Heading">Calendar</h1>

        {/* Månad, år och navigationsknappar */}
        <div className="Navigate-Date">
          <h2 className="Month">{monthOfYear[currentMonth]}</h2>
          <h2 className="Year">{currentYear}</h2>

          <div className="Buttons">
            <i
              className="bx bx-chevron-left"
              onClick={() => changeMonth(-1)}
            ></i>
            <i
              className="bx bx-chevron-right"
              onClick={() => changeMonth(+1)}
            ></i>
          </div>
        </div>

        {/* Veckodagar (Mån, Tis, Ons osv) */}
        <div className="weekdays">
          {daysOfWeek.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        {/* Rutnätet med dagar i månaden */}
        <div className="Days">
          {daysArray.map((obj, index) => {
            const dateStr = obj.day ? getDateString(obj.day) : null;
            return (
              <span
                key={index}
                className={`${obj.isToday ? "today" : ""} ${
                  normalizedMock[dateStr] ? "has-event" : ""
                }`}
                onClick={() => {
                  if (dateStr) {
                    setSelectedDate(dateStr);
                    setShowPopup(true);
                  }
                }}
              >
                {obj.day || ""}
              </span>
            );
          })}
        </div>
      </div>
      </div>

      {/* Popup för events */}
      <DayDetailsPopup
        showPopup={showPopup}
        selectedDate={selectedDate}
        dayData={normalizedMock[selectedDate]}
        setShowPopup={setShowPopup}
      /> 
    </div>
  );
};

export default CalenderApp;
