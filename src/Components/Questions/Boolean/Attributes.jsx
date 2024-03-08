export const setColorsRadio = ({
    selectedAnswer,
    correct_answer,
    incorrect_answers,
    index,
    setSelectedAnswer,
  }) => {
    const [incorrectAnswer] = incorrect_answers;
    const correctAnswerIndex = correct_answer === "True" ? 0 : 1; // Use strict equality operator
  
    if (!setSelectedAnswer) {
      return {
        token: {
          colorPrimary: "yellow",
        },
        checked: false,
      };
    }
  
    if (typeof selectedAnswer === "undefined") { // Check if selectedAnswer is undefined
      if (index === correctAnswerIndex) {
        return {
          token: {
            colorPrimary: "yellow",
          },
          checked: true,
        };
      }
    } else if (index === selectedAnswer && selectedAnswer === correctAnswerIndex) {
      return {
        token: {
          colorPrimary: "green",
        },
        checked: true,
      };
    } else if (index === selectedAnswer) {
      return {
        token: {
          colorPrimary: "red",
        },
        checked: true,
      };
    } else {
      return {
        token: {
          colorPrimary: "black",
        },
        checked: true,
      };
    }
  };
  


