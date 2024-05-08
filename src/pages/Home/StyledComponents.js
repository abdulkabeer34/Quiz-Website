import styled from "styled-components";
import { Modal,Cascader } from "antd";

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