export const calculateCountDown = ({startingDate, expirationTime})=>{
    // creates a new data wrt to the data when the quiz was starteed(starting data)
    const date = new Date(startingDate);
    // create a entirely to data so we can find  difference between the date when the quiz started and the current date 
    const newDate = new Date();
    // calculate the differnce between the current time and the starting of the quiz time 
    const Newtime = new Date(newDate - date);
    // get time in mili  seconds  
    const newTimeSeconds = Newtime.getTime();
    // turn the time of the expiration(the limit time of the quiz in which the quiz should be completed ) into minute 
    const expirationTimeInMinutes = parseInt(expirationTime) * 60000;
    // this differene id calculated to check whether the user have exeeced the expiration time limit or not 
    const Difference = expirationTimeInMinutes - newTimeSeconds;
    // convert the differnce of the current time and the startingquiz time into second and mil second 
    const minutes = Math.floor(Difference / 60000);
    const seconds = Math.floor((Difference % 60000) / 1000);
    const milliseconds = Math.floor((Difference % 60000) % 1000);
    const data = [minutes, seconds];
  
    return { Difference, data};
  }
  