import logger from "redux-logger";
import quizStoreReducer from "./quizStore";
import { configureStore,middleware } from "@reduxjs/toolkit";


export default configureStore({
  reducer: {
    quizStore: quizStoreReducer,
  },
});
