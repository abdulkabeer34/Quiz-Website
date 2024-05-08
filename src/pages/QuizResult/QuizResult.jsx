import React, { useContext, useEffect, useState } from "react";
import "./QuizResult.scss";
import { Boolean, MultipleChoice } from "../../Components";
import { getPastQuizHistory } from "../../Apis/QuizHistory";
import { useParams } from "react-router-dom";
import { ConfigProvider, Empty } from "antd";
import { QuizAreaContext } from "../../Store/ContextApiStore";

export const QuizResult = () => {
  const { id: dataId } = useParams();
  // const recordedVideo = useSelector((e) => e.quizStore.recordedVideo);
  const [result, setResult] = useState(null);
  const { recordedVideo ,screenRecording} = useContext(QuizAreaContext);

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
        {recordedVideo && (
          <video
            style={{ position: "relative",marginTop:"40px", right:0 , bottom: 0,width:"40vw" }}
            src={recordedVideo}
            controls
          ></video>
        )}
        {screenRecording && (
          <video
            style={{ position: "relative",marginTop:"40px", right:0 , bottom: 0,width:"40vw" }}
            src={screenRecording}
            controls
          ></video>
        )}
      </ConfigProvider>
    </div>
  );
};
