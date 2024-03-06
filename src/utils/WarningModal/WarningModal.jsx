import { Modal } from "antd";
import React, { useEffect } from "react";
import { useHandleQuizSubmit } from "../../customHooks";

export const WarningModal = ({
  WarningOpen,
  setWarningOpen,
  WarningNumber,
  ...props
}) => {
  const HandleSubmit = useHandleQuizSubmit();
  useEffect(() => {
    if (WarningNumber >= 3) {
      HandleSubmit.handleSubmit(props);
    }
  }, [WarningNumber]);
  return (
    <Modal
      title="Vertically centered modal dialog"
      centered
      open={WarningOpen}
      onOk={() => setWarningOpen(false)}
      onCancel={() => setWarningOpen(false)}
    >
      {WarningNumber >= 3
        ? "Your Assignment has been submitted Automatically  as you left the quiz area three time"
        : `This is the Warning No. ${WarningNumber} after three warning you quiz will be submitted automatically`}
    </Modal>
  );
};
