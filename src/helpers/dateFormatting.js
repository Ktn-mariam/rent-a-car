
export const formatDate = (date) => {
  if (!date) {
    return 'YYYY-MM-DD'
  }
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');

  const formattedDate = `${yyyy}-${mm}-${dd}`;
  return formattedDate
}
  
export const getDatesInRange = (start, end) => {
  const dates = [];
  const current = new Date(start);

  while (current <= end) {
    dates.push(formatDate(current)); // only date
    current.setDate(current.getDate() + 1);
  }

  return dates;
};