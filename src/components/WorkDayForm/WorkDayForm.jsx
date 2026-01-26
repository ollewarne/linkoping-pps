import styles from "./WorkDayForm.module.css";
import { useRef } from "react";


function WorkDayForm() {

    const workHoursStart = useRef();
    const workHoursEnd = useRef();
    const nonWorkHoursStart = useRef();
    const nonWorkHoursEnd = useRef();
    const workEnvironment = useRef();

    const environmentOptions = ['Home', 'Private office', 'Shared office', 'Open-plan office', 'Public place', 'Hybrid work']

    function handleSubmit(e) {
        e.preventDefault();

        const workdayData = {
            workHours: {
            start: workHoursStart.current.value,
            end: workHoursEnd.current.value
            },
            nonWorkHours: {
            start: nonWorkHoursStart.current.value,
            end: nonWorkHoursEnd.current.value
            },
            workEnvironment: {
            location: workEnvironment.current.value
            }
        };

        workHoursStart.current.value = '00:00';
        workHoursEnd.current.value = '00:00';
        nonWorkHoursStart.current.value = '00:00';
        nonWorkHoursEnd.current.value = '00:00';
        workEnvironment.current.value = environmentOptions[0];



    console.log(workdayData);
    };

    return (
        <form onSubmit={handleSubmit}>

{/* WORKING HOURS */}
            <fieldset>
                <legend >Working hours</legend>
                <p className='explanation'>FÖRKLARANDE TEXT HÄR</p>

                <label htmlFor='work-hours-start'>Start:</label>
                <input ref={workHoursStart} type="time" id='work-hours-start'/>

                <label htmlFor='work-hours-end'>End:</label>
                <input ref={workHoursEnd} type="time" id='work-hours-end'/>
            </fieldset>

{/* NON WORKING HOURS */}
            <fieldset>
                <legend>Non working hours</legend>
                <p className='explanation'>FÖRKLARANDE TEXT HÄR</p>

                <label htmlFor='non-work-hours-start'>Start:</label>
                <input ref={nonWorkHoursStart} type="time" id='non-work-hours-start'/>

                <label htmlFor='non-work-hours-end'>End:</label>
                <input ref={nonWorkHoursEnd} type="time" id='non-work-hours-end'/>
            </fieldset>

{/* ENVIRONMENT */}
            <fieldset>
                <legend>Work Environment</legend>
                <select ref={workEnvironment} name="environments" id="working-environment"> 
                    { environmentOptions.map(environment => ( 
                        <option key={environment} value={environment}> 
                            {environment} 
                        </option> )
                    )}; 
                </select>
            </fieldset>

            <button type="submit">Save</button>
        </form>
    );
}


export default WorkDayForm;
