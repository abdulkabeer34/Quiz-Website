import styled, { css } from "styled-components";
import { Input, Button, Form, Cascader, Modal, Radio, Menu } from "antd";

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
  width: ${props=>props.width || '100%'}!important;
  display: ${props=>props.display || 'initial'}!important;
  background-color: #15803d;
  color: white;
  margin-top: 16px;
  height: 40px;
  font-size: 16px;
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
`


export const FormItem = styled.div`
  display: flex;
  width: ${props=>props.width || '40%'};
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



export const AntdRadio = styled(Radio)`
gap: 37px;
  .ant-radio-checked .ant-radio-inner {
    // border-color: black;
    // background-color: black;
  }

  h3{
    margin-top:0;
    font-size:20px;
    font-weight:500;
  }
`;


export const AntdMenu = styled(Menu)`
  padding: 30px 20px !important;
  width: 95vw !important;
  min-height: 75vh !important;
  display: flex;
  align-item:flex-start;
  justify-content: center;
  // gap: 20px;
  flex-wrap: wrap;
  font-size:15px;
`;

