import { Button, ConfigProvider, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToggleModal } from "../../store/quizAreaStore";

export const AntdModal = ({
  message,
  open: Open,
  confirmLoading,
  footerMessage,
}) => {
  const dispatch = useDispatch();
  const open = false;
  const [modalFooterMesage, setModalFooterMessage] = useState();

  useEffect(() => {
    setModalFooterMessage(footerMessage);
    console.log("hello world");
  }, [footerMessage]);

  return (
    <Modal
      // onCancel={() => dispatch(ToggleModal({ open: false }))}
      open={Open}
      cancelText={false}
      closeIcon={null}
      centered
      footer={
        <ConfigProvider theme={{ token: { colorPrimary: "black" } }}>
          <Button
            type="primary"
            onClick={() => dispatch(ToggleModal({ open: false }))}
            loading={confirmLoading}
          >
            {modalFooterMesage}
          </Button>
        </ConfigProvider>
      }
    >
      {message}
    </Modal>
  );
};
