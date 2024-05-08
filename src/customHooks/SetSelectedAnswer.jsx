import { useDispatch, useSelector } from "react-redux";
import { updatePastQuizHistory } from "../Apis/QuizHistory";
import { setData, setQuizOptionLoading } from "../Store/QuizStore";

export const useSetSelectedAnswer = () => {
  const data = useSelector((e) => e.quizStore.data);

  const dispatch = useDispatch();
  const setSelectedAnswer = async ({
    index,
    currentQuestionIndex,
    token,
    dataId,
  }) => {
    if (
      data.basicInfo.submited != "not submitted" 
      // data.quiz[currentQuestionIndex].selectedAnswer == index
    )
      return;

    dispatch(setQuizOptionLoading(index));

    let newData = [...data.quiz];
    const updatedQuestion = { ...newData[currentQuestionIndex] };
    if (index == parseInt(updatedQuestion.selectedAnswer)) {
      updatedQuestion.selectedAnswer = -1;
    } else {
      updatedQuestion.selectedAnswer = index;
    }
    newData[currentQuestionIndex] = updatedQuestion;
    await updatePastQuizHistory({ token, dataId, quiz: [...newData] });
    dispatch(setData({ ...data, quiz: newData }));
    dispatch(setQuizOptionLoading(-1));
  };

  return { setSelectedAnswer };
};
