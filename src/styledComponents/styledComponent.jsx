import styled, { css } from "styled-components";
import { Input, Button, Form, Cascader, Modal, Radio, Menu } from "antd";

export const LoginMain = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #86efac;
  display: flex;
`;



export const Box = styled.div`
width: calc(85vw - 20px);
  min-height: 230px;
  max-width: 1300px;
  background-color: #f5f5f5;
  border-radius: 10px;
  margin-top: 30px;

  .cross-icon {
    position: absolute;
    right: -1%;
    top: -4%;
    transform: rotate(43deg);
    font-size: 13px;
    background: #d9d9d9;
    border-radius: 50%;
    padding: 7px;
    cursor: pointer;
    z-index: 99;
  }

  .options {
    // width: 50%;
    display: grid;
    grid-template-columns: repeat(2, 264px);
    grid-template-rows: repeat(2, auto);
    align-items: center;
    justify-content: space-between;
    gap: 21px 30px;
    margin-top: 23px;
    display: flex;
    flex-direction: column;

    .center1 {
      position: relative;
      width: 100%;
      .option1 {
        width: 100%;
        height: 50px;
        border-radius: 10px;
        border: 2px solid;
        // border-radius: 10px;
        display: flex;
        font-size: 17px;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        text-align: center;
      }
    }
  }
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
  z-index:999;
`;

export const CustomModalAntd = styled(Modal)`
  .ant-modal-content {
    min-height: 300px !important;
    height: auto;
    padding: 21px 42px 41px 42px;

    h1 {
      font-size: 20px;
      text-align: center;
    }

    .form-items {
      display: flex !important;
      align-items: center;
      justify-content: space-around;
      flex-wrap: wrap;
      margin-top: 30px;
      gap: 20px;
    }

    .submit-btn {
      background-color: black;
      width: 200px;
      height: 40px;
      color: white;
      float: right;
      margin-bottom: 10px;
    }
  }
`;

export const AntdCascader = styled(Cascader)`
  width::100%;
`;

export const FormItem = styled.div`
  display: flex;
  width: ${(props) => props.width || "40%"};
  flex-direction: column;
`;

export const AntdLoginTheme = {
  components: {
    Button: {
      defaultHoverColor: "#15803d",
      defaultHoverBorderColor: "#15803d",
    },
  },
};

export const QuizAreaProgressBar = styled.div`
  width: ${(props) => (100 / props.$total) * (props.$current + 1)}% !important;
`;

export const AntdRadio = styled(Radio)`
  gap: 37px;
  .ant-radio-checked .ant-radio-inner {
    // border-color: black;
    // background-color: black;
  }

  h3 {
    margin-top: 0;
    font-size: 20px;
    font-weight: 500;
  }
`;

export const AntdMenu = styled(Menu)`
  padding: 30px 20px !important;
  width: 95vw !important;
  min-height: 75vh !important;
  display: flex;
  align-item: flex-start;
  justify-content: center;
  // gap: 20px;
  flex-wrap: wrap;
  font-size: 15px;
`;
