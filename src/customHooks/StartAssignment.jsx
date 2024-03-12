import { useDispatch, useSelector } from "react-redux";
import { updatePastQuizHistory } from "../apis/QuizHistory";
import { useCalculateTime } from "./CalculateTime";
import { SetInterval, setData, setQuizAreaButtonLoading } from "../store/quizStore";

export const useStartAssignmentData = () => {
  const CalculateTime = useCalculateTime();
  const dispatch = useDispatch();
  const data = useSelector((e) => e.quizStore.data);
  const expirationTime = useSelector((e) => e.quizStore.expirationTime);

  const startAssignment = async ({ token, dataId }) => {
    const startingDate = new Date();

    dispatch(
      SetInterval({
        callback: CalculateTime.calculateTime,
        delay: 100,
        props: { startingDate, expirationTime, token, dataId },
      })
    );
    dispatch(setQuizAreaButtonLoading(true))
   
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
        dispatch(setQuizAreaButtonLoading(false))
      };
      return { startAssignment };
    };
    