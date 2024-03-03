import React from "react";
import "./MultipleChoice.scss";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { setColors } from "./Attributes";

export const MultipleChoice = ({ data, setSelectedAnswer }) => {
  if (!data) {
    return;
  }
  const { question, shuffledAnswers, selectedAnswer, corectAnswerIndex } = data;

  return (
    <div className="multiple-choice-main">
      <div className="question">
        <h3>{question}</h3>
        <div className="options">
          {shuffledAnswers.map((item, index) => {
            const { color, backgroundColor } = setColors(
              index,
              selectedAnswer,
              setSelectedAnswer,
              corectAnswerIndex
            );
            if (index == selectedAnswer) {
              console.log(index, selectedAnswer);
            }
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
