import styled, { css } from "styled-components";
import {  Input, Form, Button } from "antd";

export const LoginMain = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #86efac;
  display: flex;
`;

export const Left = styled.div`
  width: 50%;
  height: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(#bbf7d0, white);
  @media (max-width: 789px) {
    display: none;
  }
  color: ${(e) => e.color};
`;

export const Right = styled.div`
  width: 50%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 789px) {
    width: 100%;
  }
`;

const inputStyles = css`
  width: 100%;
  height: 35px;
  font-size: 15px;
  margin-top: 20px;
  margin-top: 6px;
  border: none;
  background: none;
  border-radius: 6px;
  border: 1px solid black;
`;

export const AntdInput = styled(Input)`
  ${inputStyles}
`;
export const AntdPasswordInput = styled(Input.Password)`
  ${inputStyles};
`;

export const AntdForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

export const AntdButton = styled(Button)`
  display: ${(props) => props.display || "initial"}!important;
  background-color: #15803d;
  color: white;
  margin-top: 16px;
  height: 40px;
  font-size: 12px;
  z-index: 999;
`;

export const AntdLoginTheme = {
  components: {
    Button: {
      defaultHoverColor: "#15803d",
      defaultHoverBorderColor: "#15803d",
    },
  },
};
