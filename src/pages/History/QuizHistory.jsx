import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import "./History.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Columns } from "../../constants";

export const QuizHistory = () => {

  
  let pastQuizData = useSelector((e) => e.quizStore.allQuizData);
  const [newData,setNewData] = useState([])
  
  useEffect(() => {
    let data  = [];
    pastQuizData.map((item,index) => {
      const { basicInfo,dataId ,basicInfo:{submited}} = item;
      data.push({...basicInfo,dataId,state:<Link key={index} to={`/quiz-area/${dataId}/0`}><Button>{submited=="not submitted"?"Not Submitted":submited=="not started"?"Not Started":"Submitted"}</Button></Link>});
    });
    setNewData([...data]);
  }, [pastQuizData])
  
   

   
  console.log(pastQuizData)
  return (
    <div className="history-main">
      <div className="upper-area">
        <h2>Your Past Quiz History:</h2>
      </div>
      <Table columns={Columns} rowKey={e=>e.dataId} dataSource={newData} />;
    </div>
  );
};
