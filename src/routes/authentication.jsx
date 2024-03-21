import React from "react";
import { Private, Public } from "../Layouts";
import { useLocation, useNavigate } from "react-router-dom";

const Authentication = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  if (token) {
    // if (location.pathname != "/") {
    return <Private />;
  } else {
    if (location.pathname != "/") {
      window.location.replace("/");
    }
    return <Public />;
  }
  // return token ? :;
};

export default Authentication;
