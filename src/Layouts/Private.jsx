import React, { useEffect } from "react";
import RouterReturn from "../routes/routerReturn";
import { PrivatPages } from "../routes/pages";
import { Navbar } from "../Components";
import { useDispatch } from "react-redux";
import { setAllQuizData, setUserToken } from "../store/quizStore";
import { getPastQuizHistory } from "../apis";

export const Private = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(setUserToken(token));
    (async () => {
      const { data: pastQuizData } = await getPastQuizHistory();
      const newData = JSON.parse(JSON.stringify(pastQuizData));
      dispatch(setAllQuizData([...newData]));
    })();
  }, []);

  return (
    <div style={{minheight:"100vh"}}>
      <Navbar />
      <RouterReturn pages={PrivatPages} />
    </div>
  );
};
