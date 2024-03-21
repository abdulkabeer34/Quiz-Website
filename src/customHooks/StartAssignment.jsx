import { useDispatch, useSelector } from "react-redux";
import { updatePastQuizHistory } from "../apis/QuizHistory";
import { useUpdateTime } from "./CalculateTime";
import {
  setAllQuizData,
  setData,
  setQuizAreaButtonLoading,
} from "../store/quizStore";
import { useContext } from "react";
import { QuizAreaContext } from "../store/ContextApiStore";
import { ToggleModal } from "../store/quizAreaStore";
import { useMediaRecorder } from "./MediaRecorder";

export const useStartAssignmentData = () => {
  const UpdateTime = useUpdateTime();
  const dispatch = useDispatch();
  const allQuizData = useSelector((e) => e.quizStore.allQuizData);
  const data = useSelector((e) => e.quizStore.data);
  const expirationTime = useSelector((e) => e.quizStore.expirationTime);
  const { StartInterval } = useContext(QuizAreaContext);
  const {
    checkRequiredDevices,
    getDevicesAccess,
    startRecording,
    stopAndSaveRecording,
  } = useMediaRecorder();

  const startAssignment = async ({ token, dataId }) => {
    const resposne = await checkRequiredDevices();

    if (resposne) {
      dispatch(
        ToggleModal({
          open: true,
          message:
            "before starting the assignment you have to give us the acces of you camera and microphone",
          confirmLoading: true,
          type: "media access",
          footerMessage: "Processing",
        })
      );

      try {
        const stream = await getDevicesAccess();
        await startRecording(stream);
        dispatch(
          ToggleModal({
            open: false,
            confirmLoading: false,
          })
        );
      } catch (error) {
        dispatch(
          ToggleModal({
            open: true,
            message: "acces failed cannot get the assignment  started plz try starting the assignment again ",

            confirmLoading: false,
            footerMessage: "ok",
          })
        );
        return;
      }
    } else {
      dispatch(
        ToggleModal({
          open: true,
          message: "acces failed cannot get the assignment  started plz try starting the assignment again ",
          confirmLoading: false,
          footerMessage: "ok",
        })
      );
      return;
    }





    const startingDate = JSON.parse(JSON.stringify(new Date()));

    StartInterval({
      callback: UpdateTime.updateTime,
      delay: 100,
      props: { startingDate, expirationTime, token, dataId },
    });

    dispatch(setQuizAreaButtonLoading(true));

    await updatePastQuizHistory({
      token,
      dataId,
      startingDate,
      expirationTime,
      submited: "not submitted",
    });

    const newData = {
      ...data,
      basicInfo: { ...data.basicInfo, startingDate, submited: "not submitted" },
    };

    const newAllQuizData = allQuizData.map((item) => {
      if (item.dataId == dataId) {
        return newData;
      }
      return item;
    });

    dispatch(setData(newData));
    dispatch(setAllQuizData([...newAllQuizData]));
    dispatch(setQuizAreaButtonLoading(false));
  };
  return { startAssignment };
};
