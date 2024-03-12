import { useEffect, useState } from "react";
import {
  resetWarningNumber,
  setTimer,
  setWarningModal,
  setWarningNumber,
} from "../store/quizStore";
import { useDispatch, useSelector } from "react-redux";
import { getPastQuizHistory, updatePastQuizHistory } from "../apis/QuizHistory";

export const useWarningModal = ({ dataId }) => {
  const data = useSelector((e) => e.quizStore.data);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [active, setActive] = useState(0);
  const warningNumber = useSelector((e) => e.quizStore.warningNumber);

  const checkWebsiteReloaded = async () => {
    const { data } = await getPastQuizHistory();

    let currentQuiz = data.find((item) => item.dataId === dataId);

    if (
      currentQuiz.basicInfo &&
      currentQuiz.basicInfo.submited == "not submitted"
    ) {
      if (currentQuiz.basicInfo.websiteLeaved == "null") {
        dispatch(setWarningNumber(1));
        dispatch(setWarningModal(true));
        await updatePastQuizHistory({ websiteLeaved: 1, dataId, token });
      } else if (
        currentQuiz.basicInfo.websiteLeaved >= 1 &&
        currentQuiz.basicInfo.websiteLeaved <= 2
      ) {
        let newNumber = parseInt(currentQuiz.basicInfo.websiteLeaved) + 1;
        await updatePastQuizHistory({
          websiteLeaved: newNumber,
          dataId,
          token,
        });
        dispatch(setWarningNumber(newNumber));
        dispatch(setWarningModal(true));
        dispatch(setTimer([5, 0, 0]));
      }
    }
  };
  console.log(token);

  useEffect(() => {
    checkWebsiteReloaded();
    return () => dispatch(setWarningNumber(0));
  }, []);

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (
        data.basicInfo &&
        data.basicInfo.submited === "not submitted" &&
        warningNumber <= 3
      ) {
        dispatch(setWarningModal(true));
        const warningNumber1 = warningNumber + 1;
        dispatch(setWarningNumber(warningNumber1));
        console.log(
          "hello world this is he set warnig modal count",
          warningNumber
        );

        await updatePastQuizHistory({
          websiteLeaved: warningNumber1,
          dataId,
          token,
        });
      }
    };

    window.addEventListener("focus", handleVisibilityChange);
    return () => {
      window.removeEventListener("focus", handleVisibilityChange);
    };
  }, [data, warningNumber]);

  const activewarningState = () => setActive(1);

  return { activewarningState };
};
