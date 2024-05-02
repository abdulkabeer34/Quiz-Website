import React from "react";

export const useCreateQuizHandler = ({
  questions,
  setQuestion,
  messageApi,
}) => {
  const AddQuiz = () => {
    const data = { ...questions };
    let newQuestion = {
      type: "multiple",
      shuffledAnswers: [],
      question: null,
      correctAnswer: null,
      correctAnswerIndex: null,
      selectedAnswer: "undefined",
    };

    data.quiz.push(newQuestion);

    setQuestion({ ...data });
    console.log(data)

  };

  const UpdateQuiz = (value, index) => {
    let data = questions;
    data.quiz[index].question = value;
    setQuestion({ ...data });
    console.log(data)

  };

  const warning = (content) => {
    messageApi.open({
      type: "warning",
      content,
    });
  };

  const DeleteData = (index) => {
    let data = { ...questions };
    const filteredData = data.quiz.filter((item, indexe) => indexe != index);
    data.quiz = filteredData;
    setQuestion(data);
    console.log(data);
  };

  const AddOpt = (index) => {
    let data = questions;
    if (data.quiz[index].shuffledAnswers.length >= 4) {
      warning("Cannot Add More than 4 Options");
      return;
    }
    data.quiz[index].shuffledAnswers = [
      ...data.quiz[index].shuffledAnswers,
      "",
    ];
    setQuestion({ ...data });
    console.log(data)

  };

  const UpdateOpt = (index, subIndex, value) => {
    let data = questions;
    data.quiz[index].shuffledAnswers[subIndex] = value;
    setQuestion({ ...data });
    console.log(data);
  };

  const DeleteOpt = (index, subIndex) => {
    
    let data = questions;
    const shuffledAnswers = data.quiz[index].shuffledAnswers;
    data.quiz[index].shuffledAnswers = shuffledAnswers.filter(
      (i, index) => index != subIndex
    );
    setQuestion({ ...data });
    console.log(data)
  };

  return { AddOpt, AddQuiz, DeleteData, DeleteOpt, UpdateOpt, UpdateQuiz };
};
