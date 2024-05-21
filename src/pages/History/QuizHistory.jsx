import React from "react";
import { Table } from "antd";
import "./History.scss";
import { Columns } from "../../Constants";
import { FormatQuizHistoryData } from "../../Components/FormatQuizHistoryData";
import { useQuizHistory } from "../../CustomHooks";
import { Skeleton,Empty } from "antd";
import { FullWidthSkeletonInput } from "./StyledComponets";

export const QuizHistory = () => {
  const token = localStorage.getItem("token")
  let { queryData } = useQuizHistory(false,token);
  let { data, isLoading } = queryData;




  return (
    <div className="history-main">
      <div className="upper-area">
        <h2>Your Past Quiz History:</h2>
      </div>
      <Table
        columns={Columns}
        rowKey={(e) => e.dataId}
        locale={{
          emptyText: !data ?  Array(10).fill(null).map(()=> <FullWidthSkeletonInput   active/>)  : <Empty  />,
        }}
        dataSource={FormatQuizHistoryData({ data })}
      >
        <Skeleton active={true} />
      </Table>
    </div>
  );
};
