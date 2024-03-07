import { Modal } from "antd";
import React, { useEffect } from "react";
import { useHandleQuizSubmit } from "../../customHooks";
import { useDispatch, useSelector } from "react-redux";
import {
  resetWarningNumber,
  setWarningModal,
  setWarningNumber,
} from "../../store/quizStore";

export const WarningModal = ({ ...props }) => {
  const HandleSubmit = useHandleQuizSubmit();
  const warningModal = useSelector((e) => e.quizStore.warningModal);
  const warningNumber = useSelector((e) => e.quizStore.warningNumber);
  const dispatch = useDispatch();

  useEffect(() => {
    if (warningNumber == 3 ) {
      HandleSubmit.handleSubmit(props);
    }
  }, [warningNumber]);

  return (
    <Modal
      title="Vertically centered modal dialog"
      centered
      open={warningModal}
      onOk={() => dispatch(setWarningModal(false))}
      onCancel={() => dispatch(setWarningModal(false))}
    >
      {warningNumber >= 3
        ? "Your Assignment has been submitted Automatically  as you left the quiz area three time"
        : `This is the Warning No. ${warningNumber} after three warning you quiz will be submitted automatically`}
    </Modal>
  );
};
