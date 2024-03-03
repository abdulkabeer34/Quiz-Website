import { configureStore } from "@reduxjs/toolkit";
import quizStoreReducer from "./quizStore";

export default configureStore({
    reducer:{
          quizStore:quizStoreReducer
    }
})