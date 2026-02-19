

export function roundTime(time) {
  const [stringHours, stringMinutes] = time.split(':');
  let hours = parseInt(stringHours, 10);
  let minutes = parseInt(stringMinutes, 10);

  if (minutes < 15) {
    minutes = 0;
  } else if (minutes < 45) {
    minutes = 30;
  } else {
    minutes = 0;
    hours += 1;
  }

  return `${String(hours).padStart(2, '0')}:${minutes === 0 ? '00' : '30'}`;
}
