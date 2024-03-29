import React from "react";
import RouterReturn from "../routes/routerReturn";
import { Publicpages } from "../routes/pages";

export const Public = () => {
  return <RouterReturn pages={Publicpages} />;
};
