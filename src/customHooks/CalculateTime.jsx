import { useDispatch } from "react-redux";
import { setTimer } from "../store/quizStore";
import { useHandleQuizSubmit } from "./QuizSubmit";

export const useCalculateTime = () => {
  const dispatch = useDispatch();
  const HandleSubmit = useHandleQuizSubmit();
  const calculateTime = ({
    startingDate,
    expirationTime,
    token,
    stop,
    dataId,
  }) => {
    const date = new Date(startingDate);
    const newDate = new Date();
    const Newtime = new Date(newDate - date);
    const newTimeSeconds = Newtime.getTime();
    const expirationTimeInMinutes = parseInt(expirationTime) * 60000;
    const Difference = expirationTimeInMinutes - newTimeSeconds;
    const minutes = Math.floor(Difference / 60000);
    const seconds = Math.floor((Difference % 60000) / 1000);
    const milliseconds = Math.floor((Difference % 60000) % 1000);
    const data = [minutes, seconds, milliseconds];
    if (Difference <= 0) {
      HandleSubmit.handleSubmit({
        token,
        dataId,
        stop,
      });
      dispatch(setTimer([0, 0, 0]));
    } else dispatch(setTimer(data));
  };
  return { calculateTime };
};
