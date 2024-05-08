import React, { useContext } from "react";
import { getPastQuizHistory } from "../Apis/QuizHistory";
import { useDispatch } from "react-redux";
import { useUpdateTime } from "./CalculateTime";
import { calculateTimeDifference } from "./TimeDifference";
import { setData, setTimer } from "../Store/QuizStore";
import { QuizAreaContext } from "../Store/ContextApiStore";
import { ToggleModal } from "../Store/QuizAreaStore";
import { useMediaRecorder } from "./MediaRecorder";

export const useInitializeQuiz = (props) => {



  const dispatch = useDispatch();

  const UpdateTime = useUpdateTime();
  const { StartInterval } = useContext(QuizAreaContext);
  const { dataId, setCurrentQuestionIndex, question, token } = props;

  // initializing the quiz if already made quiz is rendered again or the page is reloaded
  const initializeQuiz = async () => {
    // DataId is the id of the quiz data which is get by the parameters in the link

    // getting the whole data of the user
    const { data } = await getPastQuizHistory();
    // find the main data of the current quiz by using the dataId of that quiz
    let currentQuiz = data.find((item) => item.dataId === dataId);

    // setting the data to the redux variable so this variable can be accessed by the other component which could show the quiz Data
    dispatch(setData(currentQuiz));

    // extracting basicinfo from the currentQuiz
    const { submittedTime, expirationTime, startingDate } =
      currentQuiz.basicInfo;

    const submited = currentQuiz.basicInfo.submited;

    // if (submited == "not submitted") {
    //   const resposne = await checkRequiredDevices();

    //   if (resposne) {
    //     dispatch(
    //       ToggleModal({
    //         open: true,
    //         message:
    //           "before starting the assignment you have to give us the acces of you media",
    //         confirmLoading: true,
    //         type: "media access",
    //       })
    //     );

    //     try {
    //       const stream = await getDevicesAccess();
    //       await startRecording(stream);
    //       dispatch(
    //         ToggleModal({
    //           open: false,
    //           confirmLoading: false,
    //         })
    //       );
    //     } catch (error) {
    //       dispatch(
    //         ToggleModal({
    //           open: true,
    //           message: "acces failed cannot get the assignmn started",
    //           confirmLoading: false,
    //         })
    //       );
    //       return;
    //     }
    //   } else {
    //     dispatch(
    //       ToggleModal({
    //         open: true,
    //         message: "acces failed cannot get the assignmn started",
    //         confirmLoading: false,
    //       })
    //     );
    //   }
    // }

    // check if the that quiz is already submitted
    if (submited == "submitted") {
      // if submitted then calculating the time difference and setting it to redux variable for global use
      const difference = calculateTimeDifference(submittedTime, expirationTime);
      dispatch(setTimer(difference));
    } else if (submited == "not submitted") {
      //  if not submitted starting the quiz from the same time quiz the quiz was started
      StartInterval({
        callback: UpdateTime.updateTime,
        delay: 100,
        props: { startingDate, expirationTime, ...props },
      });
    }

    // by taking the quiz index at which the user was before relaoding we are setling it to the global variale show we can show that same quiz at the quiz area
    setCurrentQuestionIndex(parseInt(question));
  };

  return { initializeQuiz };
};
