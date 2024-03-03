import React from "react";
import "./Loader.scss";

export const Loader = ({ loading, ...props }) => {
  if (loading) return <div {...props} className="loader"></div>;
  else return null;
};
