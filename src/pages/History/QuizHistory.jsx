import React from "react";
import { Table } from "antd";
import "./History.scss";
import { useSelector } from "react-redux";

const columns = [
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Difficulty",
    dataIndex: "difficulty",
    key: "difficulty",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Submited",
    dataIndex: "submited",
    key: "submited",
  },
  {
    title:"Button",
    dataIndex:"button",
    key:"button"
  }
];

export const QuizHistory = () => {
  const pastQuizData = useSelector((e) => e.quizStore.allQuizData);

  return (
    <div className="history-main">
      <div className="upper-area">
        <h2>Your Past Quiz History:</h2>
      </div>
      <Table columns={columns} dataSource={pastQuizData} />;
    </div>
  );
};
