import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePastQuizHistory } from "../apis/QuizHistory";
import { setData, setTimer } from "../store/quizStore";
import { calculateTimeDifference } from "./TimeDifference";

export const useHandleQuizSubmit = () => {
  const Timer = useSelector((e) => e.quizStore.timer);
  const data = useSelector((e) => e.quizStore.data);
  const expirationTime = useSelector((e) => e.quizStore.expirationTime);

  const dispatch = useDispatch();

  const handleSubmit = async ({ token, dataId, stop }) => {
    stop();
    const timeTaken = calculateTimeDifference(Timer, expirationTime);
    dispatch(setTimer(timeTaken));
    dispatch(
      setData({
        ...data,
        basicInfo: {
          ...data.basicInfo,
          submited: "submitted",
          submittedTime: Timer,
        },
      })
    );
    try {
      await updatePastQuizHistory({
        token,
        dataId,
        submited: "submitted",
        submittedTime: Timer,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { handleSubmit };
};
