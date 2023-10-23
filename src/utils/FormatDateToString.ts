export const formatDateString = (dateString: string): string => {
  const parts = dateString.split('-');
  const formattedMonth = parts[1].padStart(2, '0');
  const formattedDay = parts[2].padStart(2, '0');

  return `${parts[0]}-${formattedMonth}-${formattedDay}`;
}