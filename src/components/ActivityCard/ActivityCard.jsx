import styles from "./ActivityCard.module.css"

const workdayMinutes = 300;

const colors = {
  "1": "#FFB3BA",
  "2": "#FFCBA4",
  "3": "#FFF5BA",
  "4": "#BAE1FF",
  "5": "#D3D3D3",
};

function ActivityCard({activity = {}}) {

    const height = Math.floor((activity.estimatedDuration / workdayMinutes) * 100)

    return (
        <div style={{paddingLeft: "1em", border: "2px solid black", height: `${height}%`, backgroundColor: `${colors[activity.ranking]}`, width: "90%", color: "black", borderRadius: "8px"}}>
            <p>{activity.category} <strong>| </strong>{activity.title}</p>
            <p><strong>Estimated duration: </strong>{activity.estimatedDuration} min</p>
        </div>
    )
}

export default ActivityCard;

// beräkna höjden med procentuell del av totala arbetsdagen

   //         const newActivity = {
   //             id: activityId.current,
   //             category: form.category.value,
   //             isMeeting: true,
   //             title: form.activityTitle.value,
   //             ranking: MEETING_RANKING,
   //             meetingTimes: { start: hoursInput.value, end: minutesInput.value },
   //             estimatedDuration: calculateDuration(hoursInput.value, minutesInput.value),
   //             currentlyActive: false,
   //             totalTimeSpent: 0
   //         };
   //         dispatch({type: "ADD_MEETING", payload: {...newActivity}})
   //     } else {
   //         const newActivity = {
   //             id: activityId.current,
   //             category: form.category.value,
   //             title: form.activityTitle.value,
   //             ranking: form.activityRating.value,
   //             estimatedDuration: { hours: hoursInput.value, minutes: minutesInput.value },
   //             activeTime: form.activeTime.value,
   //             breakTime: form.breakTime.value,
   //             currentlyActive: false,
   //             totalTimeSpent: 0
   //         };
