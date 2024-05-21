import { Button, ConfigProvider, Modal } from "antd";
import React from "react";

export const AntdModal = ({
  message,
  open,
  confirmLoading,
  header,
  setOpen,
  footerMessage,
  closeModal,
  onOk,
  ...restProps
}) => {
  return (
    <Modal
      open={open}
      {...restProps}
      cancelText={false}
      // closeIcon={null}
      centered
      onCancel = {closeModal}
      footer={
        <ConfigProvider theme={{ token: { colorPrimary: "black" } }}>
          <Button type="primary" onClick={onOk} loading={confirmLoading}>
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
