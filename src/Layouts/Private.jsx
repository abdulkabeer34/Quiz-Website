import React, { useEffect } from "react";
import RouterReturn from "../routes/routerReturn";
import { PrivatPages } from "../routes/pages";
import { Navbar } from "../Components";
import { useDispatch } from "react-redux";
import { setAllQuizData, setUserToken } from "../store/quizStore";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { getPastQuizHistory } from "../apis";
import { Button } from "antd";

export const Private = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(setUserToken(token));
    (async () => {
      const { data: pastQuizData } = await getPastQuizHistory();

      // const data = [];
     const newData  =  JSON.parse(JSON.stringify(pastQuizData));
      dispatch(setAllQuizData([...newData]));
    })();
  }, []);

  return (
    <div>
      <Router>
        <Navbar />
        <RouterReturn pages={PrivatPages} />
      </Router>
    </div>
  );
};
