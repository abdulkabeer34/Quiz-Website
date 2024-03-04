import { updatePastQuizHistory } from "../apis/QuizHistory";
import { useCalculateTime } from "./CalculateTime";

export const useStartAssignmentData = () => {
  const CalculateTime = useCalculateTime();

  const startAssignment = async ({
    interval,
    token,
    dataId,
    quizData,
    setQuizData,
  }) => {
    const startingDate = new Date();
    const expirationTime = 5;
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
    await updatePastQuizHistory({
      token,
      dataId,
      startingDate,
      expirationTime,
      submited: "not submitted",
    });
    setQuizData({
      ...quizData,
      basicInfo: { ...quizData.basicInfo, submited: "not submitted" },
    });
  };
  return { startAssignment };
};
