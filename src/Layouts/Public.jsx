import React from "react";
import { PublicPages } from "../Routes/pages";
import { RouterProvider } from "react-router-dom";

export const Public = () => {
  return <RouterProvider pages={PublicPages} />;
};
