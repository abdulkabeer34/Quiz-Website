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
  useStartAssignmentData,
  useHandleQuizSubmit,
  useSetSelectedAnswer,
  useInitializeQuiz,
  useSetInterval,
} from "../../customHooks";
import { WarningModal } from "../../utils/WarningModal/WarningModal";

export const QuizArea = () => {
  const [quizData, setQuizData] = useState([]);
  const [WarningOpen, setWarningOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [pageChangeCount, setPageChangeCount] = useState(0);

  const Timer = useSelector((e) => e.quizStore.timer);
  const token = useSelector((e) => e.quizStore.userToken);
  const data = useSelector((e) => e.quizStore.data);
  const Assignment = useStartAssignmentData();
  const HandleSubmit = useHandleQuizSubmit();
  const SetSelectedAnswer = useSetSelectedAnswer();
  const InitializeQuiz = useInitializeQuiz();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id: dataId, question } = useParams();
  const { start, stop } = useSetInterval();

  const props = {
    dataId,
    token,
    quizData,
    setQuizData,
    setCurrentQuestionIndex,
    question,
    start,
    stop,
  };

  useEffect(() => {
    let data;
    
    const initializeQuiz = async () => {
      data = await InitializeQuiz.initializeQuiz(props);
    };

    initializeQuiz();

    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "hidden" &&
        data.basicInfo.submited == "not submitted"
      ) {
        setPageChangeCount((prevCount) => prevCount + 1);
        console.log(pageChangeCount);
        setWarningOpen(true);
      }
    };

    document.addEventListener("blur", () => {
      document.addEventListener("focus", handleVisibilityChange);
    });

    return () => {
      document.removeEventListener("focus", handleVisibilityChange);

      stop();
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
              {data.basicInfo.submited == "submitted"
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
          {data.basicInfo.submited == "not submitted" ? (
            <AntdButton
              onClick={() =>
                HandleSubmit.handleSubmit({
                  setQuizData,
                  quizData,
                  token,
                  dataId,
                  stop,
                })
              }
              width="150px"
              className="btn"
            >
              Submit
            </AntdButton>
          ) : data.basicInfo.submited == "not started" ? (
            <AntdButton
              style={{ fontSize: "12px" }}
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
      <WarningModal
        WarningNumber={pageChangeCount}
        WarningOpen={WarningOpen}
        setWarningOpen={setWarningOpen}
        {...props}
      ></WarningModal>
    </div>
  );
};
