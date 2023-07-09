
export const getTimeForTrip = (start, end) => {
  const yearStart = new Date(start).getFullYear();
  const monthStart = new Date(start).getMonth();
  const dayStart = new Date(start).getDate();
  const hourStart = new Date(start).getHours();
  const minuteStart = new Date(start).getMinutes(); 

  const yearEnd = new Date(end).getFullYear();
  const monthEnd = new Date(end).getMonth();
  const dayEnd = new Date(end).getDate();
  const hourEnd = new Date(end).getHours();
  const minuteEnd = new Date(end).getMinutes(); 

  return `${ hourStart - hourEnd}hour ${minuteStart - minuteEnd}minutes`
}

function toPadZeroString(n) {
  return n >= 10 ? `${n}` : `0${n}`;
}

export const parseDateToString = (date) => {
  const year = new Date(date).getFullYear();
  const month = toPadZeroString(new Date(date).getMonth() + 1);
  const day= new Date(date).getDate();
  return `${year}-${month}-${day}`;
}