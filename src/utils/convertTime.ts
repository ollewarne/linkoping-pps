
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
