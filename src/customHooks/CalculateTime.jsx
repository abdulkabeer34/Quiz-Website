import { useDispatch } from "react-redux";
import { setTimer } from "../store/quizStore";
import { useHandleQuizSubmit } from "./QuizSubmit";


export const calculateQuizTimeDifference = ({startingDate, expirationTime})=>{
  const date = new Date(startingDate);
  const newDate = new Date();
  const Newtime = new Date(newDate - date);
  const newTimeSeconds = Newtime.getTime();
  const expirationTimeInMinutes = parseInt(expirationTime) * 60000;
  const Difference = expirationTimeInMinutes - newTimeSeconds;
  const minutes = Math.floor(Difference / 60000);
  const seconds = Math.floor((Difference % 60000) / 1000);
  const milliseconds = Math.floor((Difference % 60000) % 1000);
  const data = [minutes, seconds];

  return { Difference, data};
}

export const useUpdateTime =  () => {
  const dispatch = useDispatch();
  const HandleSubmit = useHandleQuizSubmit();
  const updateTime = async ({ startingDate, expirationTime, token, dataId }) => {
    const {Difference,data} = calculateQuizTimeDifference({startingDate,expirationTime})
    if (Difference <= 0) {
      const props  = { token, dataId };
      await  HandleSubmit.handleSubmit(props);
    } else dispatch(setTimer(data));
  };
  return { updateTime };
};
