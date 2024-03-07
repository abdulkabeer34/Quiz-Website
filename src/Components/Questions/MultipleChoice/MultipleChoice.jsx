import React from "react";
import "./MultipleChoice.scss";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { setColors } from "./Attributes";
import { Link } from "react-router-dom";

function decodeHtmlEntities(html) {
  var doc = new DOMParser().parseFromString(html, "text/html");
  return doc.documentElement.textContent;
}

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
          {setSelectedAnswer
            ? ""
            : selectedAnswer == "undefined"
            ? "(Not Selected)"
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
