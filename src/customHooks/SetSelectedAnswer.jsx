import { useDispatch, useSelector } from "react-redux";
import { updatePastQuizHistory } from "../apis/QuizHistory";
import { setData } from "../store/quizStore";

export const useSetSelectedAnswer = () => {
  const data = useSelector((e) => e.quizStore.data);

  const dispatch = useDispatch();
  const setSelectedAnswer = async ({
    index,
    currentQuestionIndex,
    token,
    dataId,
  }) => {
    if (data.basicInfo.submited != "not submitted") return;

    let newData = [...data.quiz];
    const updatedQuestion = { ...newData[currentQuestionIndex] };
    updatedQuestion.selectedAnswer = index;
    newData[currentQuestionIndex] = updatedQuestion;
    await updatePastQuizHistory({ token, dataId, quiz: [...newData] });
    dispatch(setData({ ...data, quiz: newData }));
  };

  return { setSelectedAnswer };
};
