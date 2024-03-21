import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Authentication from "./routes/authentication";

function App() {
  return (
    <Router>
      <Authentication />
    </Router>
  );
}

export default App;
