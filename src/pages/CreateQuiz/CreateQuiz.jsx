import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { FloatingButtonAntd } from "../../utils";
import "./CreateQuiz.scss";
import styled from "styled-components";
import { Input, ConfigProvider } from "antd";
import { AntdInput } from "../../styledComponents/styledComponent";

const Box = styled.div`
  width: ${(window.innerWidth / 100) * 80}px;
  height: 170px;
  max-width: 100%;
  background-color: burlywood;
  border-radius: 10px;
  margin-top: 30px;
`;

export const CreateQuiz = () => {
  const [questions, setQuestion] = useState([]);
  const AddQuestion = () => {
    setQuestion([...questions, 1]);
  };

  return (
    <div className="create-quiz-main">
      <FloatingButtonAntd
        icon={PlusOutlined}
        tooltip={"Create Quiz"}
        callback={AddQuestion}
        animation
      />
      <div>
        <div className="quizez">
          {questions.length == 0 ? (
            <h1>No Question Added , Plz Add the Questions</h1>
          ) : (
            questions.map((item, index) => {
              return (
                <Box className="box">
                  <div className="center">
                    <div className="question">
                      <h2>Question:</h2>
                      <ConfigProvider
                        theme={{
                          token: {
                            colorBgContainer: "tranparent",
                            colorBorderSecondary:"black"
                          },
                          components: {
                            Input: {
                              // activeBg: "none",
                              activeShadow:"black",
                              activeBorderColor:"black",
                              hoverBorderColor:"black"

                            },
                          },
                        }}
                      >
                        <AntdInput
                          className="question-input"
                          placeholder="Enter the title of you question here"
                          type="text"
                        />
                      </ConfigProvider>
                    </div>
                  </div>
                </Box>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
