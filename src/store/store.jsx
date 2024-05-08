import quizAreaStore from "./QuizAreaStore";
import quizStoreReducer from "./QuizStore";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    quizStore: quizStoreReducer,
    quizAreaStore:quizAreaStore
  },
});
