export function toTotalMinutes(hours, minutes) {

    const hoursInMinutes = hours * 60;

    const totalMinutes = hoursInMinutes + minutes;

    return totalMinutes;
}

export function calculateDuration(startTime, endTime) {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);

    const startTotal = (startHours * 60) + startMinutes;
    const endTotal = (endHours * 60) + endMinutes;

    return endTotal - startTotal;
};
