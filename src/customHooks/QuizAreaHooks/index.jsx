import React from "react";
import { useNavigate } from "react-router-dom";

export const QuizAreaHooks = ({
  setCurrentQuestionIndex,
  currentQuestionIndex,
  data,
  token,
  dataId,
  SetSelectedAnswer,
  quizOptionLoading,
}) => {
  const navigate = useNavigate();

  const changeQuestion = (value) => {
    if (!data || !data.quiz) return;

    if (
      quizOptionLoading >= 0 ||
      (currentQuestionIndex == data.quiz.length - 1 && value == 1) ||
      (currentQuestionIndex == 0 && value == -1)
    )
      return;
    setCurrentQuestionIndex(currentQuestionIndex + value);
    navigate(`/quiz-area/${dataId}/${currentQuestionIndex + value}`, {
      replace: true,
    });
  };

  const triggerEvent = (event) => {
    const changeQuestion = (value) => {
      if (
        quizOptionLoading >= 0 ||
        (currentQuestionIndex == data.quiz.length - 1 && value == 1) ||
        (currentQuestionIndex == 0 && value == -1)
      )
        return;
      setCurrentQuestionIndex(currentQuestionIndex + value);
      navigate(`/quiz-area/${dataId}/${currentQuestionIndex + value}`, {
        replace: true,
      });
    };

    if (event.key === "ArrowLeft") {
      changeQuestion(-1);
    } else if (event.key === "ArrowRight") {
      changeQuestion(1);
    }
  };

  const setSelectedAnswer = async (index) => {

    await SetSelectedAnswer.setSelectedAnswer({
      index,
      currentQuestionIndex,
      token,
      dataId,
    });
  };

  return { changeQuestion, triggerEvent, setSelectedAnswer };
};
