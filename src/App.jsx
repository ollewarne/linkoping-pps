import './App.css'
import ActivityForm from './components/ActivityForm/ActivityForm'
import Header from './components/Header/Header'
import Schedule from './components/Schedule/Schedule'
import WorkDayForm from './components/WorkDayForm/WorkDayForm'


function App() {

    return (
        <>
            <Header />
            <div style={{display: "flex", flexDirection: "column", gap: "1em"}}>
                <WorkDayForm />
                <ActivityForm />
            </div>
            <div>
                <Schedule />
            </div>
        </>
    )
}

export default App
