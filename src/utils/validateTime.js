export function formatHHMM(date) {
  const hh = date.getHours().toString().padStart(2, "0");
  const mm = date.getMinutes().toString().padStart(2, "0");
  return `${hh}:${mm}`;
}

export function hhmmToMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return toTotalMinutes(h, m);
}

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
