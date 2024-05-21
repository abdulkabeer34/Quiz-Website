import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePastQuizHistory } from "../Apis/QuizHistory";
import {
  setData,
  setQuizAreaButtonLoading,
  setTimer,
} from "../Store/QuizStore";
import { QuizAreaContext } from "../Store/ContextApiStore";
import { calculateCompletionTime, calculateCountDown } from "../Utils";
import { useQuizHistory } from "./Query";
export const useHandleQuizSubmit = () => {
  const data = useSelector((e) => e.quizStore.data);
  const expirationTime = useSelector((e) => e.quizStore.expirationTime);
  const { StopInterval, stopAndSaveRecording } = useContext(QuizAreaContext);
  let { mutation } = useQuizHistory(true);

  const dispatch = useDispatch();

  const handleSubmit = async ({ token, dataId }) => {
    if (!data || !data.basicInfo) return;
    dispatch(setQuizAreaButtonLoading(true));
    const startingDate = data.basicInfo.startingDate;

    const { data: Timer } = calculateCountDown({
      startingDate,
      expirationTime,
    });

    const timeTaken = calculateCompletionTime(Timer, expirationTime);
    dispatch(setTimer([...timeTaken]));
    StopInterval();
    stopAndSaveRecording();

    const newData = {
      ...data,
      basicInfo: {
        ...data.basicInfo,
        submited: "submitted",
        submittedTime: Timer,
        websiteLeaved: 4,
      },
    };

    mutation.mutate({
      token,
      dataId,
      submited: "submitted",
      websiteLeaved: 4,
      submittedTime: Timer,
    });

    dispatch(setData(newData));
    dispatch(setQuizAreaButtonLoading(false));
  };

  return { handleSubmit };
};
