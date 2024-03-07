import { createSlice } from "@reduxjs/toolkit";

export const quizStoreSlice = createSlice({
  name: "quizStore",
  initialState: {
    data: {},
    userToken: "",
    allQuizData: [],
    timer: [5, 0, 0],
    warningModal: false,
    warningNumber: 0,
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
    },
    setWarningModal: (state, action) => {
      state.warningModal = action.payload;
    },
    setWarningNumber: (state, action) => {
      state.warningNumber = state.warningNumber + 1;
    },
    resetWarningNumber: (state) => {
      state.warningNumber = 0;
    },
  },
});

export const {
  setData,
  setUserToken,
  setAllQuizData,
  setTimer,
  setWarningModal,
  setWarningNumber,
  resetWarningNumber,
} = quizStoreSlice.actions;
export default quizStoreSlice.reducer;
