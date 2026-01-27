export function toTotalMinutes(hours, minutes) {

  const hoursInMinutes = hours * 60;

  const totalMinutes = hoursInMinutes + minutes;

  return totalMinutes;
}
