import styled from "styled-components"
import {Button} from 'antd';


export const AntdButton = styled(Button)`
  display: ${(props) => props.display || "initial"}!important;
  background-color: #15803d;
  color: white;
  margin-top: 16px;
  height: 40px;
  font-size: 12px;
  z-index: 999;
`;



export const QuizAreaProgressBar = styled.div`
  width: ${(props) => (100 / props.$total) * (props.$current + 1)}% !important;
`;
