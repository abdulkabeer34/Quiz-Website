import { createSlice } from "@reduxjs/toolkit";

export const quizAreaStore = createSlice({
  name: "quizAreaStore",
  initialState: {
    ModalInfo: { message: "hello world this is hello world", open: false, confirmLoading: false,footerMessage :"ok" ,type:null},
    interval:null
  },
  reducers: {
    ToggleModal: (state, action) => {
      const loading = action.payload.confirmLoading;
      const message = action.payload.message;
      const open  = action.payload.open;
      const Type  = action.payload.type;
      const footerMessage = action.payload.footerMessage;
      state.ModalInfo.footerMessage = footerMessage !=undefined ? footerMessage : state.ModalInfo.footerMessage;
      state.ModalInfo.message = message != undefined ? message : state.ModalInfo.message;
      state.ModalInfo.open =  open != undefined ? open : state.ModalInfo.open ;
      state.ModalInfo.confirmLoading = loading != undefined? loading :  state.ModalInfo.confirmLoading;
      state.ModalInfo.type = Type != undefined? Type :  state.ModalInfo.type;
    },
    
  },
});

export const { ToggleModal } = quizAreaStore.actions;

export default quizAreaStore.reducer;
