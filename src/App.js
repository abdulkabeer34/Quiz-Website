import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Authentication from "./Routes/authentication";
import { ContextProvider } from "./Store/ContextApiStore";

function App() {
  return (
    <ContextProvider>
      <Authentication />
    </ContextProvider>
  );
}

export default App;
