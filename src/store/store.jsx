import quizStoreReducer from "./quizStore";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

export default configureStore({
  reducer: {
    quizStore: quizStoreReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
