import React from "react";
import { PublicPages ,PrivatePages} from "./pages";
import { RouterProvider } from "react-router-dom";

const Authentication = () => {
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return isAuthenticated ? <RouterProvider router={PrivatePages} /> :<RouterProvider router={PublicPages} /> 
};

export default Authentication;
