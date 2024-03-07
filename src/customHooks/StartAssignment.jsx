import { useDispatch, useSelector } from "react-redux";
import { updatePastQuizHistory } from "../apis/QuizHistory";
import { useCalculateTime } from "./CalculateTime";
import { setData } from "../store/quizStore";

export const useStartAssignmentData = () => {
  const CalculateTime = useCalculateTime();
  const dispatch = useDispatch();
  const data = useSelector((e) => e.quizStore.data);

  const startAssignment = async ({ token, dataId, start, stop }) => {
    const startingDate = new Date();
    const expirationTime = 1;

    start({
      callback: CalculateTime.calculateTime,
      delay: 100,
      startingDate,
      expirationTime,
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
        ...data,
        basicInfo: { ...data.basicInfo, submited: "not submitted" },
      })
    );
  };
  return { startAssignment };
};
