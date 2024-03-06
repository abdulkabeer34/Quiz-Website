import { useDispatch } from "react-redux";
import { updatePastQuizHistory } from "../apis/QuizHistory";
import { useCalculateTime } from "./CalculateTime";
import { useSetInterval } from "./SetItervalCustom";
import { setData } from "../store/quizStore";

export const useStartAssignmentData = () => {
  const CalculateTime = useCalculateTime();
  const dispatch = useDispatch();

  const startAssignment = async ({
    token,
    dataId,
    quizData,
    setQuizData,
    start,
    stop,
  }) => {
    const startingDate = new Date();
    const expirationTime = 5;
    start({
      callback: CalculateTime.calculateTime,
      delay: 100,
      startingDate,
      expirationTime,
      setQuizData,
      quizData,
      token,
      stop,
      dataId,
    });
    await updatePastQuizHistory({
      token,
      dataId,
      startingDate,
      expirationTime,
      submited: "not submitted",
    });

    dispatch(
      setData({
        ...quizData,
        basicInfo: { ...quizData.basicInfo, submited: "not submitted" },
      })
    );
    setQuizData({
      ...quizData,
      basicInfo: { ...quizData.basicInfo, submited: "not submitted" },
    });
  };
  return { startAssignment };
};
