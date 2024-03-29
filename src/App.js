import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Authentication from "./routes/authentication";
import { ContextProvider } from "./store/ContextApiStore";

function App() {
  return (
    <ContextProvider>
      <Router>
        <Authentication />
      </Router>
    </ContextProvider>
  );
}

export default App;
