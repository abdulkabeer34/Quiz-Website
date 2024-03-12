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
    quizOptionLoading: -1,
    quizAreaButtonLoading: false,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
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
    setWarningNumber: (state,action) => {
      state.warningNumber = action.payload;
    },
    resetWarningNumber: (state) => {
      state.warningNumber = -1;
    },
    setExpirationTime: (state, action) => {
      state.expirationTime = [...action.payload];
    },
    SetInterval: (state, action) => {
      state.interval = setInterval(
        () => action.payload.callback(action.payload.props),
        action.payload.delay
      );
    },
    RemoveInterval: (state) => {
      clearInterval(state.interval);
    },
    setQuizOptionLoading: (state, action) => {
      state.quizOptionLoading = action.payload;
    },
    setQuizAreaButtonLoading: (state, action) => {
      state.quizAreaButtonLoading = action.payload;
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
  setQuizOptionLoading,
  setQuizAreaButtonLoading
} = quizStoreSlice.actions;
export default quizStoreSlice.reducer;
