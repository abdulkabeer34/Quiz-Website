import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePastQuizHistory } from "../apis/QuizHistory";
import {
  RemoveInterval,
  setData,
  setQuizAreaButtonLoading,
  setTimer,
} from "../store/quizStore";
import { calculateTimeDifference } from "./TimeDifference";

export const useHandleQuizSubmit = () => {
  const Timer = useSelector((e) => e.quizStore.timer);
  const data = useSelector((e) => e.quizStore.data);
  const expirationTime = useSelector((e) => e.quizStore.expirationTime);

  const dispatch = useDispatch();

  const handleSubmit = async ({ token, dataId }) => {
    dispatch(RemoveInterval());
    dispatch(setQuizAreaButtonLoading(true));

    const timeTaken = calculateTimeDifference(Timer, expirationTime);
    dispatch(setTimer(timeTaken));

    // try {
      await updatePastQuizHistory({
        token,
        dataId,
        submited: "submitted",
        submittedTime: Timer,
      });
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
      dispatch(setQuizAreaButtonLoading(false));
    // } catch (error) {
    //   console.log(error)
    //   return false;
    // }
  };

  return { handleSubmit };
};
