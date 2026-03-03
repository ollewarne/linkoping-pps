
/**
 * Convert hours and minutes into total minutes
 * 
 * @param hours - number of hours
 * @param minutes - number of minutes
 * @returns - total time in minutes
 */
export function toTotalMinutes(hours: number, minutes: number): number {
    return hours * 60 + minutes;
}


/**
 * Converts a time string ('HH:MM') into total minutes.
 * 
 * @param time - time as string ('12:00')
 * @returns - total time, or null if input is invalid
 */
export function convertStringTimeToMinutes(time: string): number | null {

    const [hours, minutes] = time.split(':').map(Number);

    // EVENTUELLT KAN DETTA BUGGA ???
    if( typeof hours !== 'number' || typeof minutes !== 'number'){
         return null;
    }

    return toTotalMinutes(hours, minutes);
}

/**
 * Calculates duration in minutes.
 * 
 * @param hours - can be either hours or a start time .
 * @param minutes - can be either minutes or a end time.
 * 
 * @returns -
 * If params are time strings: returns difference in minutes
 * If params are hours & minutes: returns total minutes
 */
export function calculateDuration(hours: string, minutes: string): number {

    if (hours.includes(":") && minutes.includes(":")) {
        const [startHours, startMinutes] = hours.split(":").map(Number);
        const [endHours, endMinutes] = minutes.split(":").map(Number);

        const startTotal = startHours * 60 + startMinutes;
        const endTotal = endHours * 60 + endMinutes;

        return endTotal - startTotal;
    }

    return (+hours * 60) + +minutes;
}