import React from "react";
import { Private, Public } from "../Layouts";

const Authentication = () => {
  const token = localStorage.getItem("token");
  return token ? <Private /> : <Public />;
};

export default Authentication;
