import React from "react";
import { useSelector } from "react-redux";
import { updatePastQuizHistory } from "../apis/QuizHistory";

export const useHandleQuizSubmit = () => {
  const Timer = useSelector((e) => e.quizStore.timer);
  const handleSubmit = async ({
    setQuizData,
    quizData,
    interval,
    token,
    dataId,
  }) => {
    setQuizData({
      ...quizData,
      basicInfo: {
        ...quizData.basicInfo,
        submited: "submitted",
        submittedTime: Timer,
      },
    });
    clearInterval(interval);
    console.log("helo this is the custom hook");
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
