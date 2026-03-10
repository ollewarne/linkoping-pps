# dispatches for activity context

- `activityDispatch({type: "ADD_MEETING", payload: {activity to add}})`
    * adds a meeting acitivity
- `activityDispatch({type: "ADD_ACTIVITY", payload: {activity to add}})`
    * adds a normal activity
- `activityDispatch({type: "EDIT_ACTIVITY", payload: { id: string, title: string, category: string, ranking: string, estimatedDuration: number }})`
    * edits a current activity based on the id of that activity
- `activityDispatch({ type: "SCHEDULE_ACTIVITY", payload: { id: string, scheduledTime: string }})`
    * adds a scheduled time to an activity
- `activityDispatch({ type: "UPDATE_TIME_SPENT"; payload: { id: string; totalTime: number } })`
    * updates the time spent on a specific activity
- `activityDispatch({ type: "ADD_STATISTIC"; payload: { id: string; timestamp: string; stat: object } })`
    * adds a statistic to the specific activity based on the id of the activity 
- `activityDispatch({type: "TOGGLE_ACTIVE", payload: {id: string}})`
    * Toggles isActive on an activity
## how to import the context

`import { useActivities } from "./contexts/activityContext"`

`const { activities, activityDispatch } = useActivities()`
