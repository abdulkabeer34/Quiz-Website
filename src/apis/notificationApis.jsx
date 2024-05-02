
import { Buffer } from "buffer";
import axios from "axios";
import { setPastQuizHistory } from "./QuizHistory";

export const sendNotifications = async ({token,data,index,buttonsLoading,setButtonsLoading,setConfirmLoading}) => {

  if(!setConfirmLoading){

    setButtonsLoading([...buttonsLoading.slice(0,index),true,...buttonsLoading.slice(index+1)])
  }


  const date = new Date();
  const dataId = Buffer.from(`${date}`, "utf-8").toString("base64");


  data = {...data,  dataId}
  
  const api = `http://127.0.0.3:3003/notifications/${token}`
  
  let {data: { data : oldData } } = await axios.get(api)
  
  if(!oldData) return;
  
  const notificationsData = {message:"You Have A Quiz To do ",read:false,type:"quiz",dataId:data.dataId}
  let newData = [...oldData,notificationsData]
  
  const response =await  axios.put(api,{data:newData});

  console.log(notificationsData,"this is the notii data")

  const response2 = await setPastQuizHistory({data,userId:token});

  if(!setConfirmLoading){
      setButtonsLoading([...buttonsLoading.slice(0,index),false,...buttonsLoading.slice(index+1)])
  }

};

export const RemoveNotification = async (token,dataId)=>{
  const api = `http://127.0.0.3:3003/notifications/${token}`
  const {data} =await axios.get(api);
  const newData =  data.data.filter(item=>item.dataId != dataId)
  const resposne = await axios.put(api,{data:newData})
}


export const UpdateNotification = async (token,data)=>{
  const api = `http://127.0.0.3:3003/notifications/${token}`

  const resposne = await axios.put(api,{data:data})
}


