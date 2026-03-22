import React from "react";
import "./DayDetailsPopup.css";
import { useTranslator } from "../../../contexts/languageContext";
import { languageLibrary } from "../../../locales/language";
import { userOptions } from "../../../constants/userOptions";

export const DayDetailsPopup = ({
  selectedDate,
  dayData,
  onClose,
}) => {
 
  const { language } = useTranslator();
  const t = languageLibrary[language];

 if (!selectedDate) return null;

 const getTranslatedCategory = (category) => {
  const index = userOptions.en.category.indexOf(category);
  return userOptions[language].category[index] || category;
 }; 

 const getTranslatedEnvironment = (env) => {
  const index = userOptions.en.workEnvironment.indexOf(env);
  return userOptions[language].workEnvironment[index] || env;
 };

   return (
    <div className="day-details-container">
      <h2 className="popup-text">{t.detailsFor}  {selectedDate}</h2>

      {dayData ? (
        <>
          {/* Working day */}
          <div className="workday-section">
            <h3>{t.wdFormTitle}</h3>
            <p>
              {t.start}: {dayData.workdayData.workHours.start} - {dayData.workdayData.workHours.end}
            </p>
            <p>
              Lunch: {dayData.workdayData.nonWorkHours.start} - {dayData.workdayData.nonWorkHours.end}
            </p>
            <p>
              {t.wdFormWorkEnvironment}: {getTranslatedEnvironment(dayData.workdayData.workEnvironment.location)}
            </p>
          </div>

          {/* Activities */}
          <div className="activities-section">
            <h3>{t.aFormActivity}</h3>

            {dayData.activities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <h4>{activity.title}</h4>
                <p>{t.aFormCategory}: {getTranslatedCategory(activity.category)}</p>
                <p>{t.time}: {activity.scheduledTime}</p>
                <p>{t.aCardDuration}: {activity.totalTimeSpent} min</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>{t.noPlannedActivity}</p>
      )}

      <div className="popup-button">
        <button className="button-close" type="button" onClick={onClose}>
          {t.cancel}
        </button>
      </div>
    </div>
  );
};