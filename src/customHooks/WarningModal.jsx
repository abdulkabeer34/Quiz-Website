import React, { useEffect, useState } from "react";
import { setWarningModal, setWarningNumber } from "../store/quizStore";
import { useDispatch, useSelector } from "react-redux";

export const useWarningModal = () => {
  const data = useSelector((e) => e.quizStore.data);
  const dispatch = useDispatch();
  const [active, setActive] = useState(0);
  const warningNumber = useSelector((e) => e.quizStore.warningNumber);

  useEffect(() => {
    const handleVisibilityChange = () => {
      try {
        if (
          data.basicInfo &&
          data.basicInfo.submited === "not submitted" &&
          warningNumber <= 3
        ) {
          dispatch(setWarningModal(true));
          dispatch(setWarningNumber());
        }
      } catch (error) {
        console.log(error);
      }
    };

    window.addEventListener("focus", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", handleVisibilityChange);
    };
  }, [data]);

  const activewarningState = () => setActive(1);

  return { activewarningState };
};
