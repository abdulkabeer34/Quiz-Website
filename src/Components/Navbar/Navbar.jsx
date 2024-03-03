import { Link } from "react-router-dom";
import "./Navbar.scss";
import React from "react";

export const Navbar = () => {
  return (
    <div>
      <header className="nav-header">
        <div className="logo">
          <img src={require("../../assets/Images/pngwing.com (5).png")} />
          <h1>My Quiz App</h1>
        </div>

       <Link to="/quiz-history">
       <div className="profile">
          <img
            src="https://images.unsplash.com/photo-1547223487-c0bbe3535bb7?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
       </Link>
      </header>
    </div>
  );
};
