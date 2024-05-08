import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePastQuizHistory } from "../Apis/QuizHistory";
import {
  setAllQuizData,
  setData,
  setQuizAreaButtonLoading,
  setTimer,
} from "../Store/QuizStore";
import { calculateTimeDifference } from "./TimeDifference";
import { QuizAreaContext } from "../Store/ContextApiStore";
import { calculateQuizTimeDifference } from "./CalculateTime";
// this custom hook  wil handl ethe quiz submit
export const useHandleQuizSubmit = () => {
  const data = useSelector((e) => e.quizStore.data);
  const expirationTime = useSelector((e) => e.quizStore.expirationTime);
  const { StopInterval } = useContext(QuizAreaContext);
  const allQuizData = useSelector((e) => e.quizStore.allQuizData);
  const { recorder,stopAndSaveRecording } = useContext(QuizAreaContext);

  const dispatch = useDispatch();

  const handleSubmit = async ({ token, dataId }) => {
    if (!data || !data.basicInfo) return;
    // stop the recoding of the screen and of the camera
    // recorder && recorder.audioRecorder.stop();
    // recorder && recorder.videoRecorder.stop();
    stopAndSaveRecording();

    dispatch(setQuizAreaButtonLoading(true));
    const startingDate = data.basicInfo.startingDate;

    // caluating the time in which the quiz was submitted
    const { data: Timer } = calculateQuizTimeDifference({
      startingDate,
      expirationTime,
    });

    const timeTaken = calculateTimeDifference(Timer, expirationTime);
    dispatch(setTimer([...timeTaken]));
    StopInterval();

    const newData = {
      ...data,
      basicInfo: {
        ...data.basicInfo,
        submited: "submitted",
        submittedTime: Timer,
      },
    };

    await updatePastQuizHistory({
      token,
      dataId,
      submited: "submitted",
      submittedTime: Timer,
    });

    const newAllQuizData = allQuizData.map((item) => {
      if (item.dataId == dataId) {
        return newData;
      }
      return item;
    });

    dispatch(setAllQuizData(newAllQuizData));
    dispatch(setData(newData));
    dispatch(setQuizAreaButtonLoading(false));
  };

  return { handleSubmit };
};
