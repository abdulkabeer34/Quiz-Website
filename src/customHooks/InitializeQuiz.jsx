import React from "react";
import { getPastQuizHistory } from "../apis/QuizHistory";
import { useDispatch } from "react-redux";
import { useCalculateTime } from "./CalculateTime";
import { calculateTimeDifference } from "./TimeDifference";
import { setData, setTimer } from "../store/quizStore";

export const useInitializeQuiz = () => {
  const dispatch = useDispatch();
  const CalculateTime = useCalculateTime();

  const initializeQuiz = async ({
    dataId,
    token,
    quizData,
    setQuizData,
    interval,
    setCurrentQuestionIndex,
    question
  }) => {
    const { data } = await getPastQuizHistory();
    const currentQuiz = data.find((item) => item.dataId === dataId);

    dispatch(setData(currentQuiz.quiz));

    setQuizData(currentQuiz);

    const { submittedTime, expirationTime, startingDate } =
      currentQuiz.basicInfo;
    if (currentQuiz.basicInfo.submited == "submitted") {
      const difference = calculateTimeDifference(submittedTime, expirationTime);

      dispatch(setTimer(difference));
    } else if (currentQuiz.basicInfo.submited == "not submitted") {
      interval = setInterval(
        () =>
          CalculateTime.calculateTime({
            startingDate,
            expirationTime,
            setQuizData,
            quizData,
            interval,
            token,
            dataId,
          }),
        100
      );
    }
    setCurrentQuestionIndex(parseInt(question));
  };

  return { initializeQuiz };
};
