import React from "react";
import "./DayDetailsPopup.css";

export const DayDetailsPopup = ({
  selectedDate,
  dayData,
  onClose,
}) => {
  if (!selectedDate) return null;

   return (
    <div className="day-details-container">
      <h2 className="popup-text">Details for {selectedDate}</h2>

      {dayData ? (
        <>
          {/* Working day */}
          <div className="workday-section">
            <h3>Working day</h3>
            <p>
              Working hours: {dayData.workdayData.workHours.start} - {dayData.workdayData.workHours.end}
            </p>
            <p>
              Lunch time: {dayData.workdayData.nonWorkHours.start} - {dayData.workdayData.nonWorkHours.end}
            </p>
            <p>
              Working environment: {dayData.workdayData.workEnvironment.location}
            </p>
          </div>

          {/* Activities */}
          <div className="activities-section">
            <h3>Activities</h3>

            {dayData.activities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <h4>{activity.title}</h4>
                <p>Category: {activity.category}</p>
                <p>Scheduled time: {activity.scheduledTime}</p>
                <p>total time: {activity.totalTimeSpent} min</p>
               {/*
                <p>Estimated time: {activity.estimatedDuration} minutes</p>
                <p>Total time spent: {activity.totalTimeSpent} minutes</p>

                {activity.isMeeting && (
                  <p>
                    Meeting time: {activity.meetingTimes.start} - {activity.meetingTimes.end}
                  </p>
                )}

                <p>Active time: {activity.activeTime || "N/A"} minutes</p>
                <p>Paused time: {activity.breakTime || "N/A"} minutes</p>
                <p>
                  Currently active: {activity.currentlyActive ? "Yes" : "No"}
                </p>
*/}
                {/*
                <div className="statistics">
                  <h5>Statistics</h5>
                  {Object.entries(activity.statistics).map(([time, stats]) => (
                    <div key={time}>
                      <p>Time: {time}</p>
                      <p>Efficiency: {stats.efficiency}</p>
                      <p>Productivity: {stats.productivity}</p>
                      <p>Factor: {stats.factor || "No"}</p>
                    </div> 
                  ))}
                </div> */}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>No activities registered for this day!</p>
      )}

      <div className="popup-button">
        <button className="button-close" type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};