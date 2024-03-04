export const calculateTimeDifference = (submittedTime, expirationTime) => {
  const [min, sec, mil] = submittedTime.map(Number);
  const date = new Date(2000, 11, 12, 0, min, sec, mil);
  const date1 = new Date(2000, 11, 12, 0, parseInt(expirationTime), 0, 0);
  const newDate = new Date(date1 - date);
  return [
    newDate.getMinutes(),
    newDate.getSeconds(),
    newDate.getMilliseconds(),
  ];
};
