import { ConfigProvider } from "antd";
import React from "react";

export const CreateQuizConfigProvider = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: "tranparent",
          colorBorderSecondary: "black",
          colorPrimary: "black",
        },
        components: {
          Input: {
            // activeBg: "none",
            activeShadow: "black",
            activeBorderColor: "black",
            hoverBorderColor: "black",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
