export const formatDateString = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 'Invalid Date'; // 날짜가 유효하지 않을 경우 예외 처리
  }

  const formattedDate = date.toLocaleDateString('en-US');

  const months: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const dateParts: string[] = formattedDate.split('/');
  const year: string = dateParts[2];
  const month: string = months[parseInt(dateParts[0]) - 1];
  const day: string = days[new Date(`${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`).getDay()];
  return `${day}, ${month} ${parseInt(dateParts[1])}, ${year}`;
};