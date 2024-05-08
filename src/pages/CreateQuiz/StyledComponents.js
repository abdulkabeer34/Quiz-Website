import styled,{css} from "styled-components";
import {Input} from "antd"



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


export const AntdInput = styled(Input)`
  ${inputStyles}
`;



