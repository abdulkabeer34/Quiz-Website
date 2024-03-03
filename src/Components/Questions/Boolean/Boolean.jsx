import React from "react";
import "./Boolean.scss";
import { Radio } from "antd";
import { AntdRadio } from "../../../styledComponents/styledComponent";

export const Boolean = ({ data, setSelectedAnswer }) => {
  if (!data) return null;

  const { question, selectedAnswer } = data;
  
  return (
    <div className="boolean-main">
      <div className="question">
        <h3>{question}</h3>
        <div className="options">
          <Radio.Group
            className="radio-group"
            value={selectedAnswer}
            onChange={(e) =>
              setSelectedAnswer && setSelectedAnswer(e.target.value)
            }
          >
            <AntdRadio className="Hello world" value={0}>
              <h3> True</h3>
            </AntdRadio>
            <AntdRadio value={1}>
              <h3>False</h3>
            </AntdRadio>
          </Radio.Group>
        </div>
      </div>
    </div>
  );
};
