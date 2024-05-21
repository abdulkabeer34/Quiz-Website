import { PlusOutlined } from "@ant-design/icons";
import React, {  useState } from "react";
import { AntdModal, FloatingButtonAntd } from "../../Utils";
import "./CreateQuiz.scss";
import { Button, Input, message } from "antd";
import { basicInfo } from "../../Constants";
import { useCreateQuizHandler } from "../../CustomHooks";
import { Box, AntdInput } from "./StyledComponents";
import { ContactList, CreateQuizConfigProvider } from "../../Components";
import { useLoginQuery, useQuizNotification } from "../../CustomHooks/Query";

export const CreateQuiz = () => {
  const [questions, setQuestion] = useState({
    quiz: [],
    basicInfo,
    dataId: "",
  });


  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem('token');

  const { AddOpt, AddQuiz, DeleteOpt, UpdateOpt, UpdateQuiz, DeleteData } =
    useCreateQuizHandler({ questions, setQuestion, messageApi });


  const {loginData:{data:contactList,isLoading}} = useLoginQuery();
  const {sendNotificationsAllMutation } = useQuizNotification();


  if(isLoading) return;

  const sendALl = async () => {
    setConfirmLoading(true);
    await sendNotificationsAllMutation.mutateAsync({contactList,data:questions,setConfirmLoading,token})
    setConfirmLoading(false);
    setOpen(false)
  };




  return (
    <div className="create-quiz-main">
      <CreateQuizConfigProvider>
        <AntdModal
          message={
            <ContactList
              confirmLoading={confirmLoading}
              questions={questions}
            />
          }
          onOk={async () => await sendALl()}
          closeModal={()=>setOpen(false)}
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
