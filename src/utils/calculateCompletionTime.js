export const calculateCompletionTime = (submittedTime, expirationTime) => {

    const [min, sec, mil] = submittedTime.map(Number);
    if(min==expirationTime) return [expirationTime,0,0];
    const date = new Date(2000, 11, 12, 0, min, sec, 0);
    const date1 = new Date(2000, 11, 12, 0, parseInt(expirationTime), 0, 0);
    const newDate = new Date(date1 - date);
  
    return [
      newDate.getMinutes(),
      newDate.getSeconds(),
      newDate.getMilliseconds(),
    ];
  };
  