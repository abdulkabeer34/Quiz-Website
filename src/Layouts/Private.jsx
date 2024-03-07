import React, { useEffect } from "react";
import RouterReturn from "../routes/routerReturn";
import { PrivatPages } from "../routes/pages";
import { Navbar } from "../Components";
import { useDispatch } from "react-redux";
import { setAllQuizData, setUserToken } from "../store/quizStore";
import { BrowserRouter as Router } from "react-router-dom";
import { getPastQuizHistory } from "../apis";

export const Private = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(setUserToken(token));
    (async () => {
      const { data: pastQuizData } = await getPastQuizHistory();

      let data = [];
      pastQuizData.map((item) => {
        const { basicInfo } = item;
        data.push(basicInfo);
      });
      dispatch(setAllQuizData(data));
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
