import quizAreaStore from "./quizAreaStore";
import quizStoreReducer from "./quizStore";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    quizStore: quizStoreReducer,
    quizAreaStore:quizAreaStore
  },
});
