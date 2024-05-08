import { useDispatch } from "react-redux";
import { setTimer } from "../Store/QuizStore";
import { useHandleQuizSubmit } from "./QuizSubmit";


// this comment is used to calculate the time differnce when the user is doing the difference between two time in second and also return the difference data and second and minutes 
export const calculateQuizTimeDifference = ({startingDate, expirationTime})=>{
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

export const useUpdateTime =  () => {
// this fucntin runs after every 100 milsecond calcuting the time differnce 
  const dispatch = useDispatch();
  const HandleSubmit = useHandleQuizSubmit();
  const updateTime = async ({ startingDate, expirationTime, token, dataId }) => {
    const {Difference,data} = calculateQuizTimeDifference({startingDate,expirationTime})
    // if the differnce between id less then 0 means the time has exceeded the limit of the quiz end time  the assgnment will be submited
    if (Difference <= 0) {
      const props  = { token, dataId };
      await  HandleSubmit.handleSubmit(props);
    } else dispatch(setTimer(data));
  };
  return { updateTime };
};
