import React from "react";
import { PublicPages } from "./pages";
import { Private } from "../Layouts/Private";

const Authentication = () => {
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return isAuthenticated ? <Private /> :<PublicPages /> 
};

export default Authentication;
