import React from "react";
import "./MultipleChoice.scss";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { setColors } from "./Attributes";
import { decodeHtmlEntities } from "../../../utils";

export const MultipleChoice = ({ data, setSelectedAnswer }) => {
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
              <div
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
                  <IoMdCheckmarkCircleOutline />
                )}
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
