import React, { useContext, useEffect, useState } from "react";
import "./QuizResult.scss";
import { Boolean, MultipleChoice } from "../../Components";
import { useParams } from "react-router-dom";
import { ConfigProvider, Empty } from "antd";
import { QuizAreaContext } from "../../Store/ContextApiStore";
import { useQuizHistory } from "../../CustomHooks";

export const QuizResult = () => {
  const { id: dataId } = useParams();
  const [result, setResult] = useState(null);
  let { queryData } = useQuizHistory();
  let { data, isPending, isLoading } = queryData;
  const { recordedVideo, screenRecording } = useContext(QuizAreaContext);

  useEffect(() => {
    if (isLoading) return;
    const currentQuiz = data.find((item) => item.dataId === dataId);
    setResult(currentQuiz);
  }, [data]);

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
        {recordedVideo && (
          <video
            className="recorded-video"
            src={recordedVideo}
            controls
          ></video>
        )}
        {screenRecording && (
          <video
            className="recorded-video"
            src={screenRecording}
            controls
          ></video>
        )}
      </ConfigProvider>
    </div>
  );
};
