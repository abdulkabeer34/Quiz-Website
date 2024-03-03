import React, { useEffect } from "react";
import { FaRegClock } from "react-icons/fa";
import "./QuizArea.scss";
import { AntdButton } from "../../styledComponents/styledComponent";
import { Boolean, MultipleChoice } from "../../Components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setData, setTimer } from "../../store/quizStore";
import {
  getPastQuizHistory,
  updatePastQuizHistory,
} from "../../apis/QuizHistory";

let interval;

export const QuizArea = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const Timer = useSelector((e) => e.quizStore.timer);
  const token = useSelector((e) => e.quizStore.userToken);

  const { id: dataId, question } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeQuiz = async () => {
      const { data } = await getPastQuizHistory();
      const currentQuiz = data.find((item) => item.dataId === dataId);

      dispatch(setData(currentQuiz.quiz));

      setQuizData(currentQuiz);

      const { submittedTime, expirationTime, startingDate } =
        currentQuiz.basicInfo;
      if (currentQuiz.basicInfo.submited == "submitted") {
        const difference = calculateTimeDifference(
          submittedTime,
          expirationTime
        );

        dispatch(setTimer(difference));
      } else if (currentQuiz.basicInfo.submited == "not submitted") {
        interval = setInterval(
          () => calculateTime(startingDate, expirationTime),
          100
        );
      }
      setCurrentQuestionIndex(parseInt(question));
    };

    initializeQuiz();

    return () => {
      clearInterval(interval);
      dispatch(setTimer([0, 0, 0]));
    };
  }, []);

  const setSelectedAnswer = async (index) => {
    if (quizData.basicInfo.submited != "not submitted") return;
    let newData = [...quizData.quiz];
    const updatedQuestion = { ...newData[currentQuestionIndex] };
    updatedQuestion.selectedAnswer = index;
    newData[currentQuestionIndex] = updatedQuestion;
    await updatePastQuizHistory({ token, dataId, quiz: [...newData] });
    dispatch(setData(newData));
    setQuizData({ ...quizData, quiz: newData });
  };

  const handleSubmit = async () => {
    setQuizData({
      ...quizData,
      basicInfo: {
        ...quizData.basicInfo,
        submited: "submitted",
        submittedTime: Timer,
      },
    });
    clearInterval(interval);
    try {
      await updatePastQuizHistory({
        token,
        dataId,
        submited: "submitted",
        submittedTime: Timer,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const changeQuestion = (value) => {
    setCurrentQuestionIndex(currentQuestionIndex + value);
    navigate(`/quiz-area/${dataId}/${currentQuestionIndex + value}`, {
      replace: true,
    });
  };

  const startAssignment = async () => {
    const startingDate = new Date();
    const expirationTime = 5;
    interval = setInterval(
      () => calculateTime(startingDate, expirationTime),
      100
    );
    await updatePastQuizHistory({
      token,
      dataId,
      startingDate,
      expirationTime,
      submited: "not submitted",
    });
    setQuizData({
      ...quizData,
      basicInfo: { ...quizData.basicInfo, submited: "not submitted" },
    });
  };

  const calculateTime = (startingDate, expirationTime) => {
    const date = new Date(startingDate);
    const newDate = new Date();
    const Newtime = new Date(newDate - date);
    const newTimeSeconds = Newtime.getTime();
    const expirationTimeInMinutes = parseInt(expirationTime) * 60000;
    const Difference = expirationTimeInMinutes - newTimeSeconds;
    const minutes = Math.floor(Difference / 60000);
    const seconds = Math.floor((Difference % 60000) / 1000);
    const milliseconds = Math.floor((Difference % 60000) % 1000);
    const data = [minutes, seconds, milliseconds];
    if (Difference <= 0) {
      clearInterval(interval);
      handleSubmit();
      dispatch(setTimer([0, 0, 0]));
    } else dispatch(setTimer(data));
  };

  const calculateTimeDifference = (submittedTime, expirationTime) => {
    const [min, sec, mil] = submittedTime.map(Number);
    const date = new Date(2000, 11, 12, 0, min, sec, mil);
    const date1 = new Date(2000, 11, 12, 0, parseInt(expirationTime), 0, 0);
    const newDate = new Date(date1 - date);
    console.log(date);
    return [
      newDate.getMinutes(),
      newDate.getSeconds(),
      newDate.getMilliseconds(),
    ];
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
            <AntdButton onClick={handleSubmit} width="150px" className="btn">
              Submit
            </AntdButton>
          ) : quizData.basicInfo.submited == "not started" ? (
            <AntdButton
              style={{ fontSize: "12px" }}
              width="150px"
              className="btn"
              onClick={startAssignment}
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
