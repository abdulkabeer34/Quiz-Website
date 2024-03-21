import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePastQuizHistory } from "../apis/QuizHistory";
import {
  setAllQuizData,
  setData,
  setQuizAreaButtonLoading,
  setTimer,
} from "../store/quizStore";
import { calculateTimeDifference } from "./TimeDifference";
import { QuizAreaContext } from "../store/ContextApiStore";
import { calculateQuizTimeDifference } from "./CalculateTime";

export const useHandleQuizSubmit = () => {
  const data = useSelector((e) => e.quizStore.data);
  const expirationTime = useSelector((e) => e.quizStore.expirationTime);
  const { StopInterval } = useContext(QuizAreaContext);
  const allQuizData = useSelector((e) => e.quizStore.allQuizData);
  // const recorder = useSelector((e) => e.quizStore.recorder);
  const { recorder } = useContext(QuizAreaContext);

  const dispatch = useDispatch();

  const handleSubmit = async ({ token, dataId }) => {
    if (!data || !data.basicInfo) return;
    recorder && recorder.stop();

    dispatch(setQuizAreaButtonLoading(true));
    const startingDate = data.basicInfo.startingDate;
    const { data: Timer } = calculateQuizTimeDifference({
      startingDate,
      expirationTime,
    });

    console.log(startingDate, "this is the starting date");
    const timeTaken = calculateTimeDifference(Timer, expirationTime);
    dispatch(setTimer([...timeTaken]));
    StopInterval();

    const newData = {
      ...data,
      basicInfo: {
        ...data.basicInfo,
        submited: "submitted",
        submittedTime: Timer,
      },
    };

    await updatePastQuizHistory({
      token,
      dataId,
      submited: "submitted",
      submittedTime: Timer,
    });

    const newAllQuizData = allQuizData.map((item) => {
      if (item.dataId == dataId) {
        return newData;
      }
      return item;
    });

    dispatch(setAllQuizData(newAllQuizData));
    dispatch(setData(newData));
    dispatch(setQuizAreaButtonLoading(false));
  };

  return { handleSubmit };
};
