import {useState} from 'react';
import './App.css'
import ActivityForm from './components/ActivityForm/ActivityForm'
import Header from './components/Header/Header'
import Schedule from './components/Schedule/Schedule'
import WorkDayForm from './components/WorkDayForm/WorkDayForm'


function App() {
    const [activities, setActivities] = useState([]);

    return (
        <>
            <Header />
            <div style={{display: "flex", flexDirection: "column", gap: "1em"}}>
                <WorkDayForm />
                <ActivityForm activities={activities} setActivities={setActivities} />
            </div>
            <div>
                <Schedule activities={activities} setActivities={setActivities} />
            </div>
        </>
    )
}

export default App
