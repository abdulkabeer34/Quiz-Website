import { Link } from "react-router-dom";
import "./Navbar.scss";
import { FaHistory } from "react-icons/fa";
import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";

export const Navbar = () => {
  return (
    <div>
      <header className="nav-header">
        <div className="logo">
          <img src={require("../../assets/Images/pngwing.com (5).png")} />
          <h1>My Quiz App</h1>
        </div>

        <div className="profile">
          <IoNotificationsOutline className="notification" />
          <Link className="history" to="/quiz-history">
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"10px"}}>
              <FaHistory />
              <p>history</p>
            </div>
          </Link>
        </div>
      </header>
    </div>
  );
};
