import { mockData } from "../../constants/mockData";
import { DayDetailsPopup } from "./DayDetails/DayDetails";
import { useCalendarMonthsWeeksDays } from "./MonthsWeeksDays/CalendarMonthsWeeksDays";
import "./MonthsWeeksDays/CalendarApp.css";
import ModalToCalendarDaysPopup from "./DayDetails/ModalToCalendarDaysPopup/ModalToCalendarDaysPopup";
import { useTranslator } from "../../contexts/languageContext";
import { languageLibrary } from "../../locales/language";
import { getHistorydataFromStorage } from "../../utils/workdayStorage";


const CalenderApp = ({useRealData}) => {

  const historyData = getHistorydataFromStorage();
  const source = useRealData ? historyData : mockData;


  const {
    daysOfWeek,
    monthOfYear,
    currentMonth,
    currentYear,
    changeMonth,
    daysArray,
  } = useCalendarMonthsWeeksDays();

  const getDateString = (day) => {
    const month = currentMonth + 1;
    const dayString = day < 10 ? `0${day}` : day;
    const monthString = month < 10 ? `0${month}` : month;
    return `${currentYear}-${monthString}-${dayString}`;
  };

  // const normalizedMock = {};
  // for (let key in source) {
  //   const [y, m, d] = key.split("-");
  //   const fullDate = `20${y}-${m}-${d}`;
  //   normalizedMock[fullDate] = source[key];
  // }

  const { language } = useTranslator();
  const t = languageLibrary[language];

  return (
    <div className="Calender-container">
      <div className="Calendar-app">
        <div className="calender">
          <h1 className="Heading">{t.calendarTitle}</h1>

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

          <div className="weekdays">
            {daysOfWeek.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="Days">
            {daysArray.map((obj, index) => {
              const dateStr = obj.day ? getDateString(obj.day) : null;

              if (!obj.day) {
                return <span key={index}></span>;
              }

              return (
                <ModalToCalendarDaysPopup
                  key={index}
                  trigger={
                    <span
                      className={`${obj.isToday ? "today" : ""} ${
                        source[dateStr] ? "has-event" : ""
                      }`}
                    >
                      {obj.day}
                    </span>
                  }
                >
                  <DayDetailsPopup
                    selectedDate={dateStr}
                    dayData={source[dateStr]}
                  />
                </ModalToCalendarDaysPopup>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalenderApp;
