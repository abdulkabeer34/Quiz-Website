import React, { useEffect } from "react";
import { FaRegClock } from "react-icons/fa";
import "./QuizArea.scss";
import { AntdButton } from "../../styledComponents/styledComponent";
import { Boolean, MultipleChoice } from "../../Components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setTimer } from "../../store/quizStore";
import {
  useStartAssignmentData,
  useHandleQuizSubmit,
  useSetSelectedAnswer,
  useInitializeQuiz,
  useSetInterval,
} from "../../customHooks";
import { WarningModal } from "../../utils/WarningModal/WarningModal";
import { useWarningModal } from "../../customHooks/WarningModal";
import styled from "styled-components";

const QuizAreaProgressBar = styled.div`
  width: ${(props) => (100 / props.total) * (props.current + 1)}% !important;
`;

export const QuizArea = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const Timer = useSelector((e) => e.quizStore.timer);
  const token = useSelector((e) => e.quizStore.userToken);
  const data = useSelector((e) => e.quizStore.data);
  const Assignment = useStartAssignmentData();
  const HandleSubmit = useHandleQuizSubmit();
  const SetSelectedAnswer = useSetSelectedAnswer();
  const InitializeQuiz = useInitializeQuiz();
  const WarningModal1 = useWarningModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id: dataId, question } = useParams();
  const { start, stop } = useSetInterval();

  const props = {
    dataId,
    token,
    setCurrentQuestionIndex,
    question,
    start,
    stop,
  };

  useEffect(() => {
    WarningModal1.activewarningState();
    const initializeQuiz = async () => {
      await InitializeQuiz.initializeQuiz(props);
    };

    initializeQuiz();

    return () => {
      stop();
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
    setCurrentQuestionIndex(currentQuestionIndex + value);
    navigate(`/quiz-area/${dataId}/${currentQuestionIndex + value}`, {
      replace: true,
    });
  };

  if (!data.quiz) return;

  return (
    <div className="quiz-area-main">
      <QuizAreaProgressBar
        current={currentQuestionIndex}
        total={data.quiz.length}
        className="quiz-progress-bar"
      ></QuizAreaProgressBar>

      {data.basicInfo.submited == "not started" && <div className="area"></div>}
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
                <span>
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
              onClick={() => HandleSubmit.handleSubmit(props)}
              width="150px"
              className="btn"
            >
              Submit
            </AntdButton>
          ) : data.basicInfo.submited == "not started" ? (
            <AntdButton
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
              currentQuestionIndex + 1 == data.quiz.length ? "none" : "initial"
            }
            onClick={() => changeQuestion(1)}
            className="antd-btn"
          >
            Next Question
          </AntdButton>
        </div>
      </div>
      <WarningModal {...props}></WarningModal>
    </div>
  );
};
