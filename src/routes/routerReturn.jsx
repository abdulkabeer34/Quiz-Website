import React, { useMemo } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const RouterReturn = ({ pages }) => {
  const Routers = useMemo(() => {
    return pages.flatMap(({ path, component: Component, props }, index) => {
      if (typeof path === "string") {
        return (
          <Route
            element={<Component {...props} />}
            path={path}
            key={index}
          ></Route>
        );
      } else if (Array.isArray(path)) {
        return path.map((item, subindex) => {
          return (
            <Route
              element={<Component {...props} />}
              path={item}
              key={`${index}-${subindex}`}
            ></Route>
          );
        });
      }
      return null;
    });
  }, [pages]);

  return <Routes>{Routers}</Routes>;
};

export default RouterReturn;
