import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePastQuizHistory } from "../apis/QuizHistory";
import { setData } from "../store/quizStore";

export const useHandleQuizSubmit = () => {
  const Timer = useSelector((e) => e.quizStore.timer);
  const dispatch = useDispatch();

  const handleSubmit = async ({
    setQuizData,
    quizData,
    token,
    dataId,
    stop,
  }) => {
    stop();
    dispatch(setData({
      ...quizData,
      basicInfo: {
        ...quizData.basicInfo,
        submited: "submitted",
        submittedTime: Timer,
      },
    }));
    setQuizData({
      ...quizData,
      basicInfo: {
        ...quizData.basicInfo,
        submited: "submitted",
        submittedTime: Timer,
      },
    });
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
