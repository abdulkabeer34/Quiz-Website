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
    expirationTime: 5,
    interval: null,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setAllPastQuizez: (state, action) => {
      state.allPastQuizes = [...action.payload];
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },
    setAllQuizData: (state, action) => {
      state.allQuizData = [...action.payload];
    },
    setTimer: (state, action) => {
      state.timer = action.payload;
    },
    setWarningModal: (state, action) => {
      state.warningModal = action.payload;
    },
    setWarningNumber: (state) => {
      state.warningNumber = state.warningNumber + 1;
    },
    resetWarningNumber: (state) => {
      state.warningNumber = 0;
    },
    setExpirationTime: (state, action) => {
      state.expirationTime = [...action.payload];
    },
    SetInterval: (state, action) => {
      state.interval = setInterval(
        ()=>action.payload.callback(action.payload.props),
        action.payload.delay
      );
    },
    RemoveInterval: (state) => {
      clearInterval(state.interval);
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
  SetInterval,
  RemoveInterval,
} = quizStoreSlice.actions;
export default quizStoreSlice.reducer;
