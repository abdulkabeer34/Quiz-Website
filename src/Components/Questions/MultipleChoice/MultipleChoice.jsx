import React, { useState } from "react";
import "./MultipleChoice.scss";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { setColors } from "./Attributes";
import { decodeHtmlEntities } from "../../../utils";
import { Button } from "antd";
import { useSelector } from "react-redux";

export const MultipleChoice = ({ data, setSelectedAnswer }) => {
  const quizOptionLoading = useSelector((e) => e.quizStore.quizOptionLoading);

  if (!data) {
    return;
  }
  let { question, shuffledAnswers, selectedAnswer, corectAnswerIndex } = data;
  question = decodeHtmlEntities(question);
  return (
    <div className="multiple-choice-main">
      <div className="question">
        <h3>{question}</h3>
        <p>
          {selectedAnswer == "undefined"
            ? "(Not Selected)"
            : setSelectedAnswer
            ? ""
            : selectedAnswer == corectAnswerIndex
            ? "(correct Answer)"
            : "(Incorrect Answer)"}
        </p>

        <div className="options">
          {shuffledAnswers.map((item, index) => {
            const { color, backgroundColor } = setColors(
              index,
              selectedAnswer,
              setSelectedAnswer,
              corectAnswerIndex
            );
            item = decodeHtmlEntities(item);
            return (
              <Button
                disabled={quizOptionLoading > 0 && quizOptionLoading < 4}
                loading={index == quizOptionLoading}
                key={index}
                style={{
                  color: color,
                  background: backgroundColor,
                  borderColor: color,
                }}
                onClick={() => setSelectedAnswer && setSelectedAnswer(index)}
                className="option1"
              >
                {index == selectedAnswer && setSelectedAnswer && (
                  <IoMdCheckmarkCircleOutline className="icon" />
                )}
                {item}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
