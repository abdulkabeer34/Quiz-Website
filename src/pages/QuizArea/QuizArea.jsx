import React, { useEffect } from "react";
import { FaRegClock } from "react-icons/fa";
import "./QuizArea.scss";
import { AntdButton } from "../../styledComponents/styledComponent";
import { Boolean, MultipleChoice } from "../../Components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  RemoveInterval,
  setQuizOptionLoading,
  setTimer,
} from "../../store/quizStore";
import {
  useStartAssignmentData,
  useHandleQuizSubmit,
  useSetSelectedAnswer,
  useInitializeQuiz,
  useWarningModal,
} from "../../customHooks";
import styled from "styled-components";
import { WarningModal } from "../../utils";
import { ConfigProvider } from "antd";

const QuizAreaProgressBar = styled.div`
  width: ${(props) => (100 / props.$total) * (props.$current + 1)}% !important;

  
`;



export const QuizArea = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const quizOptionLoading = useSelector((e) => e.quizStore.quizOptionLoading);
  const [loading, setLoading] = useState(1);

  const Timer = useSelector((e) => e.quizStore.timer);
  const quizAreaButtonLoading = useSelector(
    (e) => e.quizStore.quizAreaButtonLoading
  );
  const token = useSelector((e) => e.quizStore.userToken);
  const data = useSelector((e) => e.quizStore.data);
  const Assignment = useStartAssignmentData();
  const HandleSubmit = useHandleQuizSubmit();
  const SetSelectedAnswer = useSetSelectedAnswer();
  const InitializeQuiz = useInitializeQuiz();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { id: dataId, question } = useParams();
  
  const props = {
    dataId,
    token,
    setCurrentQuestionIndex,
    question,
  };
  
  const WarningModal1 = useWarningModal(props);

  useEffect(() => {
    const initializeQuiz = async () => {
      await InitializeQuiz.initializeQuiz(props);
    };
    
    initializeQuiz();
    WarningModal1.activewarningState(props);

    return () => {
      dispatch(RemoveInterval());
      dispatch(setTimer([0, 0, 0]));
    };
  }, []);

  const setSelectedAnswer = async (index) =>
  
    await SetSelectedAnswer.setSelectedAnswer({
      index,
      currentQuestionIndex,
      token,
      dataId,
    });

  const changeQuestion = (value) => {
    if (quizOptionLoading >= 0) return;
    setCurrentQuestionIndex(currentQuestionIndex + value);
    navigate(`/quiz-area/${dataId}/${currentQuestionIndex + value}`, {
      replace: true,
    });
  };

  if (!data.quiz) return;

  return (
    <div className="quiz-area-main">
      <ConfigProvider theme={{ token: { colorPrimary: "black" } }}>
        <QuizAreaProgressBar
          $current={currentQuestionIndex}
          $total={data.quiz.length}
          className="quiz-progress-bar"
        ></QuizAreaProgressBar>

        {data.basicInfo.submited == "not started" && (
          <div className="area"></div>
        )}
        <div className="upper-area">
          <div className="upper-area-left">
            <div className="left">
              <FaRegClock />
            </div>
            <div className="right">
              <p>
                {data.basicInfo.submited == "submitted"
                  ? "Quiz Completed In"
                  : "Time Remaining"}
              </p>
              <h2>
                {Timer.map((item, index) => (
                  <span key={index}>
                    {item}
                    {index != 2 ? ":" : null}
                  </span>
                ))}
              </h2>
            </div>
          </div>
          <div className="upper-area-right">
            {data.basicInfo.submited == "not submitted" ? (
              <AntdButton
                loading={quizAreaButtonLoading}
                onClick={() => HandleSubmit.handleSubmit(props)}
                width="150px"
                className="btn"
              >
                Submit
              </AntdButton>
            ) : data.basicInfo.submited == "not started" ? (
              <AntdButton
                loading={quizAreaButtonLoading}
                style={{ fontSize: "12px", zIndex: "1000" }}
                width="150px"
                className="btn"
                onClick={() => {
                  Assignment.startAssignment(props);
                }}
              >
                Start the Assignment
              </AntdButton>
            ) : (
              <Link to={`/quiz-result/${dataId}`}>
                <AntdButton
                  style={{ fontSize: "12px" }}
                  width="150px"
                  className="btn"
                >
                  See Results
                </AntdButton>
              </Link>
            )}
          </div>
        </div>
        <div className="mid-area">
          <p>
            Question {currentQuestionIndex + 1} out of {data.quiz.length}
          </p>
          {data.quiz[currentQuestionIndex].type !== "boolean" ? (
            <MultipleChoice
              data={data.quiz[currentQuestionIndex]}
              setSelectedAnswer={setSelectedAnswer}
              setLoading={setLoading}
              loading={loading}
            />
          ) : (
            <Boolean
              data={data.quiz[currentQuestionIndex]}
              setSelectedAnswer={setSelectedAnswer}
            />
          )}
        </div>
        <div className="bottom-area">
          <div style={{ zIndex: "1" }}>
            <AntdButton
              display={currentQuestionIndex == 0 ? "none" : "initial"}
              width="auto"
              onClick={() => changeQuestion(-1)}
              className="antd-btn"
            >
              Previous Question
            </AntdButton>
          </div>
          <div style={{ zIndex: "1" }}>
            <AntdButton
              width="auto"
              display={
                currentQuestionIndex + 1 == data.quiz.length
                  ? "none"
                  : "initial"
              }
              onClick={() => changeQuestion(1)}
              className="antd-btn"
            >
              Next Question
            </AntdButton>
          </div>
        </div>
        <WarningModal {...props}></WarningModal>
      </ConfigProvider>
    </div>
  );
};
