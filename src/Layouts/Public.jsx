import React from "react";
import { Login } from "../Components";
import RouterReturn from "../routes/routerReturn";
import { Publicpages } from "../routes/pages";
import { BrowserRouter as Router } from "react-router-dom";

export const Public = () => {
  return (
    <Router>
      <RouterReturn pages={Publicpages} />
    </Router>
  );
};
