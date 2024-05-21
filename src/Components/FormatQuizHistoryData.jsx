import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

export const FormatQuizHistoryData = ({ data }) => {
  let processedData = [];

  if (data) {
    processedData = data.map((item, index) => {
      const {
        basicInfo,
        dataId,
        basicInfo: { submited },
      } = item;
      const state = (
        <Link key={index} to={`/quiz-area/${dataId}/0`}>
          <Button>
            {submited === "not submitted"
              ? "Not Submitted"
              : submited === "not started"
              ? "Not Started"
              : "Submitted"}
          </Button>
        </Link>
      );
      return {
        ...basicInfo,
        dataId,
        state,
      };
    });
  }

  return processedData;
};
