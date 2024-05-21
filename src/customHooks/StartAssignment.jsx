import { useDispatch, useSelector } from "react-redux";
import { updatePastQuizHistory } from "../Apis/QuizHistory";
import { useUpdateTime } from "./CalculateTime";
import { setData, setQuizAreaButtonLoading } from "../Store/QuizStore";
import { useContext } from "react";
import { QuizAreaContext } from "../Store/ContextApiStore";
import { ToggleModal } from "../Store/QuizAreaStore";
import { useQuizHistory } from "./Query";

export const useStartAssignmentData = () => {
  const UpdateTime = useUpdateTime();
  const dispatch = useDispatch();
  const data = useSelector((e) => e.quizStore.data);
  const expirationTime = useSelector((e) => e.quizStore.expirationTime);
  const { mutation } = useQuizHistory(false);

  const {
    StartInterval,
    checkRequiredDevices,
    getDevicesAccess,
    startRecording,
  } = useContext(QuizAreaContext);

  const startAssignment = async ({ token, dataId }) => {
    const resposne = await checkRequiredDevices();

    if (resposne) {
      dispatch(
        ToggleModal({
          open: true,
          message:
            "before starting the assignment you have to give us the acces of you camera and microphone erro3",
          confirmLoading: true,
          type: "media access",
          footerMessage: "Processing",
        })
      );

      try {
        const { audioStream, videoStream } = await getDevicesAccess();
        await startRecording({ audioStream, videoStream });
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
            message:
              "acces failed cannot get the assignment  started plz try starting the assignment again error2",

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
          message:
            "acces failed cannot get the assignment  started plz try starting the assignment again error1",
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

    mutation.mutate({
      token,
      dataId,
      startingDate,
      expirationTime,
      submited: "not submitted",
    })

    const newData = {
      ...data,
      basicInfo: { ...data.basicInfo, startingDate, submited: "not submitted" },
    };

    dispatch(setData(newData));
    dispatch(setQuizAreaButtonLoading(false));
  };
  return { startAssignment };
};
