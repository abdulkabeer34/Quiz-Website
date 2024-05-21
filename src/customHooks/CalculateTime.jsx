import { useDispatch,useSelector } from "react-redux";
import { setTimer } from "../Store/QuizStore";
import { useHandleQuizSubmit } from "./QuizSubmit";
import { calculateCountDown } from "../Utils";



export const useUpdateTime =  () => {
// this fucntin runs after every 100 milsecond calcuting the time differnce 
  const dispatch = useDispatch();
  const HandleSubmit = useHandleQuizSubmit();
  const data = useSelector(e=>e.quizStore.data)
  const updateTime = async ({ startingDate, expirationTime, token, dataId }) => {
    const {Difference,data} = calculateCountDown({startingDate,expirationTime})
    // if the differnce between id less then 0 means the time has exceeded the limit of the quiz end time  the assgnment will be submited
    if (Difference <= 0) {
      const props  = { token, dataId ,data};
      await  HandleSubmit.handleSubmit(props);
    } else dispatch(setTimer(data));
  };
  return { updateTime };
};
