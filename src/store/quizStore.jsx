import { createSlice } from "@reduxjs/toolkit";

export const quizStoreSlice = createSlice({
  name: "quizStore",
  initialState: {
    data: [],
    userToken: "",
    allQuizData: [],
    timer: [5, 0, 0]
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setAllPastQuizez: (state, action) => {
      state.allPastQuizes = action.payload;
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },
    setAllQuizData: (state, action) => {
      state.allQuizData = action.payload;
    },
    setTimer: (state, action) => {
      state.timer = action.payload;
    }
  },
});

export const { setData, setUserToken, setAllQuizData, setTimer, setQuizData } =
  quizStoreSlice.actions;
export default quizStoreSlice.reducer;
