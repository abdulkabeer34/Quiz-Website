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
} from "../../customHooks";

let interval;

export const QuizArea = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const Timer = useSelector((e) => e.quizStore.timer);
  const token = useSelector((e) => e.quizStore.userToken);
  const Assignment = useStartAssignmentData();
  const HandleSubmit = useHandleQuizSubmit();
  const SetSelectedAnswer = useSetSelectedAnswer();
  const InitializeQuiz = useInitializeQuiz();

  const { id: dataId, question } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeQuiz = async () => {
      await InitializeQuiz.initializeQuiz({
        dataId,
        token,
        quizData,
        setQuizData,
        interval,
        setCurrentQuestionIndex,
        question,
      });
    };

    initializeQuiz();

    return () => {
      clearInterval(interval);
      dispatch(setTimer([0, 0, 0]));
    };
  }, []);

  const setSelectedAnswer = async (index) =>
    await SetSelectedAnswer.setSelectedAnswer({
      index,
      quizData,
      setQuizData,
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


  if (!quizData.quiz) return;

  return (
    <div className="quiz-area-main">
      <div className="upper-area">
        <div className="upper-area-left">
          <div className="left">
            <FaRegClock />
          </div>
          <div className="right">
            <p>
              {quizData.basicInfo.submited == "submitted"
                ? "Quiz Completed In"
                : "Time Remaining"}
            </p>
            <h2>
              {Timer[0]} <span>:</span> <span>{Timer[1]}</span> <span>:</span>{" "}
              {Timer[2]}
            </h2>
          </div>
        </div>
        <div className="upper-area-right">
          {quizData.basicInfo.submited == "not submitted" ? (
            <AntdButton
              onClick={() =>
                HandleSubmit.handleSubmit({
                  setQuizData,
                  quizData,
                  interval,
                  token,
                  dataId,
                })
              }
              width="150px"
              className="btn"
            >
              Submit
            </AntdButton>
          ) : quizData.basicInfo.submited == "not started" ? (
            <AntdButton
              style={{ fontSize: "12px" }}
              width="150px"
              className="btn"
              onClick={() =>
                Assignment.startAssignment({
                  interval,
                  token,
                  dataId,
                  quizData,
                  setQuizData,
                })
              }
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
          Question {currentQuestionIndex + 1} out of {quizData.quiz.length}
        </p>
        {quizData.quiz[currentQuestionIndex].type !== "boolean" ? (
          <MultipleChoice
            data={quizData.quiz[currentQuestionIndex]}
            setSelectedAnswer={setSelectedAnswer}
          />
        ) : (
          <Boolean
            data={quizData.quiz[currentQuestionIndex]}
            setSelectedAnswer={setSelectedAnswer}
          />
        )}
      </div>
      <div className="bottom-area">
        <div>
          <AntdButton
            display={currentQuestionIndex == 0 ? "none" : "initial"}
            width="auto"
            onClick={() => changeQuestion(-1)}
            className="antd-btn"
          >
            Previous Question
          </AntdButton>
        </div>
        <div>
          <AntdButton
            width="auto"
            display={
              currentQuestionIndex + 1 == quizData.quiz.length
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
    </div>
  );
};
