import { createSlice } from "@reduxjs/toolkit";

export const quizStoreSlice = createSlice({
  name: "quizStore",
  initialState: {
    data: {},
    userToken: "",
    timer: [5, 0],
    warningModal: false,
    warningNumber: 0,
    expirationTime: 5,
    interval: null,
    quizOptionLoading: -1,
    quizAreaButtonLoading: false,
    mediaAccess: false,
    recordedVideo: null,
    recorder: null,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },
    setTimer: (state, action) => {
      state.timer = action.payload;
    },
    setWarningModal: (state, action) => {
      state.warningModal = action.payload;
    },
    setWarningNumber: (state, action) => {
      state.warningNumber = action.payload;
    },
    resetWarningNumber: (state) => {
      state.warningNumber = -1;
    },
    setExpirationTime: (state, action) => {
      state.expirationTime = [...action.payload];
    },
    setQuizOptionLoading: (state, action) => {
      state.quizOptionLoading = action.payload;
    },
    setQuizAreaButtonLoading: (state, action) => {
      state.quizAreaButtonLoading = action.payload;
    },
    setMediaAccess: (state, action) => {
      state.mediaAccess = action.payload;
    },
    setRecoredVideo: (state, action) => {
      state.recordedVideo = action.payload;
    },
    setRecorder: (state, action) => {
      state.recorder = action.payload;
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
  setQuizOptionLoading,
  setRecorder,
  setQuizAreaButtonLoading,
  setRecoredVideo,
  
} = quizStoreSlice.actions;



export default quizStoreSlice.reducer;
