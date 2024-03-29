import { PlusOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import React from "react";
import styled from "styled-components";

const StyledIcon = styled(FloatButton)`
// color:blue;
transition: all .2s linear;
  &:hover {
    transform: rotate(${e=>e.$animation?45:0}deg);
  }
`;



export const FloatingButtonAntd = ({animation,callback,icon:Icon,tooltip}) => {
  return (
    <StyledIcon
      icon={Icon?<Icon/>:<PlusOutlined />}
      $animation={animation}
      onClick={callback}
      style={{ right: 60 }}
      tooltip={tooltip==false?false:<div>{tooltip?tooltip:"Add Something"}</div>}
    />
  );
};
