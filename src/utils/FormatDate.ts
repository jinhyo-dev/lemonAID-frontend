export const formatTimeFromTimestamp = (timestamp: number | undefined): string => {
  if (timestamp === undefined) {
    return '';
  } else {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }
};