import React, { useEffect } from "react";
import { PrivatePages } from "../Routes/pages";
import { useDispatch } from "react-redux";
import { setAllQuizData, setUserToken } from "../Store/QuizStore";
import { getPastQuizHistory } from "../Apis";
import { RouterProvider } from "react-router-dom";

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
        <RouterProvider router={PrivatePages}></RouterProvider>
    </div>
  );
};
