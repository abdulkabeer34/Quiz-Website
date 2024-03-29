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
            src="https://avatars.githubusercontent.com/u/136903101?v=4"
            alt=""
          />
        </div>
       </Link>
      </header>
    </div>
  );
};
