import React from "react";
import { Button, Table } from "antd";
import "./History.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Columns } from "../../constants";

export const QuizHistory = () => {

  
  let pastQuizData = useSelector((e) => e.quizStore.allQuizData);
  let data  = [];

  pastQuizData.map((item,index) => {
    const { basicInfo,dataId } = item;
    data.push({...basicInfo,dataId,button:<Link key={index} to={`/quiz-area/${dataId}/0`}><Button>Open Quiz</Button></Link>});
  });
   

   
  console.log(pastQuizData)
  return (
    <div className="history-main">
      <div className="upper-area">
        <h2>Your Past Quiz History:</h2>
      </div>
      <Table columns={Columns} rowKey={e=>e.dataId} dataSource={data} />;
    </div>
  );
};
