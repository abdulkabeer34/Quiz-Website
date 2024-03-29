import { useEffect, useState } from "react";
import { setWarningNumber } from "../store/quizStore";
import { useDispatch, useSelector } from "react-redux";
import { getPastQuizHistory, updatePastQuizHistory } from "../apis/QuizHistory";
import { ToggleModal } from "../store/quizAreaStore";
import { useHandleQuizSubmit } from "./QuizSubmit";

const createModalMessage = (num, warn) => {
  const open = true;
  if (warn) {
    const message = `website leaved: ${num} times , maxlimit 3 times`;
    return { message, open };
  }
  const message = "Max Number of quiz  Leave Reached";
  return { message, open };
};

export const useWarningModal = ({ dataId, token }) => {
  const data = useSelector((e) => e.quizStore.data);
  const dispatch = useDispatch();
  const handleSubmit = useHandleQuizSubmit();
  const warningNumber = useSelector((e) => e.quizStore.warningNumber);

  const handleVisibilityChange = async () => {
    if (
      data.basicInfo &&
      data.basicInfo.submited == "not submitted" &&
      warningNumber <= 2
    ) {
      if (warningNumber == 2) {
        const { message, open } = createModalMessage(false, false);
        await handleSubmit.handleSubmit({ dataId, token });
        dispatch(setWarningNumber(3));
        dispatch(ToggleModal({ message, open }));
        return;
      }

      console.log("ghfdc");
      const warningNum = warningNumber + 1;
      dispatch(setWarningNumber(warningNum));
      const { message, open } = createModalMessage(warningNum, true);
      dispatch(ToggleModal({ message, open, footerMessage: "ok" }));

      await updatePastQuizHistory({
        websiteLeaved: warningNum,
        dataId,
        token,
      });
    }
  };

  const checkWebsiteReloaded = async () => {
    const { data } = await getPastQuizHistory();

    let currentQuiz = data.find((item) => item.dataId === dataId);
    const websiteLeaved = currentQuiz.basicInfo.websiteLeaved;

    if (
      currentQuiz.basicInfo &&
      currentQuiz.basicInfo.submited == "not submitted"
    ) {
      if (websiteLeaved >= 2) {
        if (websiteLeaved == 2) {
          const { message, open } = createModalMessage(null, false);
          dispatch(setWarningNumber(3));
          dispatch(ToggleModal({ message, open, footerMessage: "ok" }));

          await handleSubmit.handleSubmit({ dataId, token });
        }
      } else if (websiteLeaved == "null") {
        const { message, open } = createModalMessage(1, true);
        dispatch(ToggleModal({ message, open, footerMessage: "ok" }));
        dispatch(setWarningNumber(1));

        await updatePastQuizHistory({ websiteLeaved: 1, dataId, token });
      } else if (websiteLeaved == 1) {
        let newNumber = parseInt(websiteLeaved) + 1;

        const { message, open } = createModalMessage(newNumber, true);
        dispatch(setWarningNumber(newNumber));

        dispatch(ToggleModal({ message, open, footerMessage: "ok" }));
        await updatePastQuizHistory({
          websiteLeaved: newNumber,
          dataId,
          token,
        });
      } else {
        dispatch(setWarningNumber(3));
      }
    }
  };

  useEffect(() => {
    window.addEventListener("focus", handleVisibilityChange);
    return () => {
      window.removeEventListener("focus", handleVisibilityChange);
    };
  }, [data, warningNumber]);

  useEffect(() => {
    (async () => {
      if (warningNumber == 3) {
        handleSubmit.handleSubmit({ dataId, token });
      }
    })();
  }, [warningNumber]);

  return { checkWebsiteReloaded };
};
