import { useDispatch } from "react-redux";
import { updatePastQuizHistory } from "../apis/QuizHistory";
import { setData } from "../store/quizStore";

export const useSetSelectedAnswer = () => {
  const dispatch = useDispatch();
  const setSelectedAnswer = async ({
    index,
    quizData,
    setQuizData,
    currentQuestionIndex,
    token,
    dataId,
  }) => {
    if (quizData.basicInfo.submited != "not submitted") return;

    let newData = [...quizData.quiz];
    const updatedQuestion = { ...newData[currentQuestionIndex] };
    updatedQuestion.selectedAnswer = index;
    newData[currentQuestionIndex] = updatedQuestion;
    await updatePastQuizHistory({ token, dataId, quiz: [...newData] });
    dispatch(setData({ ...quizData, quiz: newData }));
    setQuizData({ ...quizData, quiz: newData });
  };

  return { setSelectedAnswer };
};
