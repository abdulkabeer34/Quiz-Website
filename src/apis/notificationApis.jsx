import axios from "axios";
import { getPastQuizHistory, setPastQuizHistory } from "./QuizHistory";

export const sendNotifications = async (token,data) => {
  const api = `http://127.0.0.3:3003/notifications/${token}`
  let {data: { data : oldData } } =await axios.get(api)
//   oldData  = JSON.parse(oldData)
  if(!oldData) return;
  let newData = [...oldData,data]
//   newData = JSON.stringify(newData)
  const response =await  axios.put(api,{data:newData});
  console.log(response)

//   const {data:historyOldData}   = getPastQuizHistory();
//   let historyNewData = [...historyOldData,data];
  const response2 = await setPastQuizHistory({data,userId:token});
};
