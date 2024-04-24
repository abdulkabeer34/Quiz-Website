import React from "react";
import { Private, Public } from "../Layouts";
import { useLocation } from "react-router-dom";

const Authentication = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  if (token) {
    return <Private />;
  } else {
    if (location.pathname != "/") {
      window.location.replace("/");
    }
    return <Public />;
  }
};

export default Authentication;
