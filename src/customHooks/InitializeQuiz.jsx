import React from "react";
import { getPastQuizHistory } from "../apis/QuizHistory";
import { useDispatch } from "react-redux";
import { useCalculateTime } from "./CalculateTime";
import { calculateTimeDifference } from "./TimeDifference";
import { SetInterval, setData, setTimer } from "../store/quizStore";

export const useInitializeQuiz = () => {
  const dispatch = useDispatch();
  const CalculateTime = useCalculateTime();

  const initializeQuiz = async (props) => {
    const { dataId, setCurrentQuestionIndex, question } = props;

    const { data } = await getPastQuizHistory();
    let currentQuiz = data.find((item) => item.dataId === dataId);

    dispatch(setData(currentQuiz));

    const { submittedTime, expirationTime, startingDate } =
      currentQuiz.basicInfo;

    if (currentQuiz.basicInfo.submited == "submitted") {
      const difference = calculateTimeDifference(submittedTime, expirationTime);
      dispatch(setTimer(difference));
    } else if (currentQuiz.basicInfo.submited == "not submitted") {
      dispatch(
        SetInterval({
          callback: CalculateTime.calculateTime,
          delay: 100,
          props: { startingDate, expirationTime, ...props },
        })
      );
    }

    setCurrentQuestionIndex(parseInt(question));
  };

  return { initializeQuiz };
};
