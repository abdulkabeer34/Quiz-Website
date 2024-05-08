import { Link,Outlet } from "react-router-dom";
import "./Navbar.scss";
import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";

export const Navbar = () => {
  return (
   <>
    <div>
      <header className="nav-header">
        <Link to="/">
          <div className="logo">
            <img src={require("../../Assets/Images/pngwing.com (5).png")} />
            <h1>My Quiz App</h1>
          </div>
        </Link>
        <div className="mid-section">
          <Link to="/quiz-history">
            <p>History</p>
          </Link>
          <Link to="/create-quiz">
            <p>Create Quiz</p>
          </Link>
          <Link to="/profile">
            <p>Profile</p>
          </Link>
        </div>
        <div className="profile">
          <Link trigger="click" to="/notifications">
            <IoNotificationsOutline className="notification" />
          </Link>
        </div>
      </header>

    </div>
    <Outlet/>
   </>
  );
};
