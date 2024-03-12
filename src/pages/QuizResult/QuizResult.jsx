import React, { useEffect, useState } from "react";
import "./QuizResult.scss";
import { Boolean, MultipleChoice } from "../../Components";
import { useSelector } from "react-redux";
import { getPastQuizHistory } from "../../apis/QuizHistory";
import { useParams } from "react-router-dom";
import { ConfigProvider, Empty } from "antd";

export const QuizResult = () => {
  const data = useSelector((e) => e.quizStore.data);
  const { id: dataId } = useParams();
  const [result, setResult] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const { data } = await getPastQuizHistory();
      const currentQuiz = data.find((item) => item.dataId === dataId);
      setResult(currentQuiz);
    };
    getData();
  }, []);

  if (!result) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  return (
    <div className="quiz-result-main">
      <ConfigProvider theme={{ token: { colorPrimary: "black" } }}>

      <div className="upper-area">
        <h2>Your Quiz Result:</h2>
      </div>
      {result.quiz.map((item, index) => {
        const { type } = item;

        return (
          <div style={{ marginTop: "50px" }} key={index}>
            <h3>Question {index + 1}.</h3>
            {type == "boolean" ? (
              <Boolean key={index} data={item} setSelectedAnswer={false} />
            ) : (
              <MultipleChoice
                key={index}
                data={item}
                setSelectedAnswer={false}
              />
            )}
          </div>
        );
      })}
      </ConfigProvider>
    </div>
  );
};
