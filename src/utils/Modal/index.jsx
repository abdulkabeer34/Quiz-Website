import { Button, ConfigProvider, Modal } from "antd";
import React from "react";

export const AntdModal = ({
  message,
  open,
  confirmLoading,
  header,
  footerMessage,
  closeModal,
  ...restProps
}) => {
  return (
    <Modal
      open={open}
      {...restProps}
      cancelText={false}
      closeIcon={null}
      centered
      footer={
        <ConfigProvider theme={{ token: { colorPrimary: "black" } }}>
          <Button type="primary" onClick={closeModal} loading={confirmLoading}>
            {footerMessage}
          </Button>
        </ConfigProvider>
      }
    >
      {header && header}
      {message}
    </Modal>
  );
};
