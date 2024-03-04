import { SmileOutlined } from "@ant-design/icons";

export const openNotification = ({ message, description, placement, api }) => {
  api.open({
    message,
    description,
    placement,
    icon: (
      <SmileOutlined
        style={{
          color: "#108ee9",
        }}
      />
    ),
  });
};
