const shuffleArray = (array, item) => {
  const index = Math.floor(Math.random() * (array.length + 1));
  const shuffledArray = [...array.slice(0, index), item, ...array.slice(index)];

  return { shuffledArray, index };
};

export const createNewDataSet = (data) => {
  let newData = new Array();
  let shuffledAnswers = new Array();
  let corectAnswerIndex;
  newData = data.map((item) => {
    let { correct_answer, incorrect_answers, type } = item;
    let selectedAnswer = "undefined";

    if (type == "boolean") {
      const [incorrect_answer] = incorrect_answers;
      incorrect_answers = incorrect_answer;
      return {
        ...item,
        corectAnswerIndex,
        selectedAnswer,
      };
    } else {
      const { shuffledArray, index } = shuffleArray(
        incorrect_answers,
        correct_answer
      );
      shuffledAnswers = shuffledArray;
      corectAnswerIndex = index;
    }

    return {
      ...item,
      shuffledAnswers,
      corectAnswerIndex,
      selectedAnswer,
    };
  });
  return newData;
};
