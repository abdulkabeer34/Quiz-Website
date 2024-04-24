import { PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { AntdModal, FloatingButtonAntd } from "../../utils";
import "./CreateQuiz.scss";
import { Buffer } from "buffer";
import { Button, Input, message } from "antd";
import { CreateQuizConfigProvider } from "../../constants";
import { useCreateQuizHandler } from "../../customHooks";
import { basicInfo } from "../../constants";
import { Box, AntdInput } from "../../styledComponents";
import { ContactList } from "../../customHooks/ContactList";
import axios from "axios";
import { sendNotifications } from "../../apis/notificationApis";

export const CreateQuiz = () => {
  const date = new Date();
  const dataId = Buffer.from(`${date}`, "utf-8").toString("base64");

  const [questions, setQuestion] = useState({ quiz: [], basicInfo, dataId });
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [contactList, setContactList] = useState(null);
  const [open, setOpen] = useState(false);

  const { AddOpt, AddQuiz, DeleteOpt, UpdateOpt, UpdateQuiz, DeleteData } =
    useCreateQuizHandler({ questions, setQuestion, messageApi });

  useEffect(() => {
    const getLogins = async () => {
      const { data } = await axios.get("http://127.0.0.3:3003/users");
      setContactList(data);
    };
    getLogins();
  }, []);

  const sendALl = async () => {
    const request = contactList.map(async (item) => {
      await sendNotifications(item.id, questions);
    });
    Promise.all(request);
  };

  return (
    <div className="create-quiz-main">
      <CreateQuizConfigProvider>
        <AntdModal
          message={<ContactList questions={questions} />}
          closeModal={async () => await sendALl()}
          open={open}
          style={{ heigth: "80vw" }}
          header={
            <h1 style={{ fontSize: "15px", padding: "0 24px" }}>
              Send to someone
            </h1>
          }
          confirmLoading={confirmLoading}
          footerMessage={"Send All"}
        />
        <FloatingButtonAntd
          icon={PlusOutlined}
          tooltip={"Create Quiz"}
          callback={AddQuiz}
          animation
          className="floating-icon"
        />
        {contextHolder}
        <div>
          <div className="quizez">
            <div style={{ width: "100%" }}>
              <Button
                type="primary"
                width={100}
                style={{
                  float: "right",
                  display: questions.quiz.length == 0 && "none",
                }}
                onClick={() => setOpen(true)}
              >
                Send It
              </Button>
            </div>
            {questions.quiz.length == 0 ? (
              <h1>No Question Added , Plz Add the Questions</h1>
            ) : (
              questions.quiz.map((item, index) => {
                const { question, shuffledAnswers } = item;
                return (
                  <div className="boxes" key={index}>
                    <Box className="box">
                      <div className="center">
                        <PlusOutlined
                          className="cross-icon"
                          onClick={() => DeleteData(index)}
                        />
                        <div className="center">
                          <div className="question">
                            <h2>Question:</h2>
                            <AntdInput
                              className="question-input"
                              placeholder="Enter the title of you question here"
                              type="text"
                              value={question}
                              onChange={(e) =>
                                UpdateQuiz(e.target.value, index)
                              }
                            />
                            <Button
                              onClick={(e) => AddOpt(index)}
                              type="primary"
                            >
                              Add Option
                            </Button>
                          </div>
                          <div className="options">
                            {shuffledAnswers.length != 0 ? (
                              shuffledAnswers.map((item, subIndex) => {
                                return (
                                  <div className="center1" key={subIndex}>
                                    <PlusOutlined
                                      className="cross-icon"
                                      onClick={() => DeleteOpt(index, subIndex)}
                                    />
                                    <Input
                                      key={subIndex}
                                      className="option1"
                                      value={item}
                                      onChange={(e) =>
                                        UpdateOpt(
                                          index,
                                          subIndex,
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                );
                              })
                            ) : (
                              <h3>No Options Added</h3>
                            )}
                          </div>
                        </div>
                      </div>
                    </Box>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </CreateQuizConfigProvider>
    </div>
  );
};
