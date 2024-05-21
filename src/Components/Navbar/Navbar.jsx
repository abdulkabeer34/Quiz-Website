import { Link,Outlet } from "react-router-dom";
import "./Navbar.scss";
import React, { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { HiBars3 } from "react-icons/hi2";
import Sidebar from "../SideBar/Sidebar";


export const Navbar = () => {
  const [open,setOpen] = useState()
  return (
   <>
    <div>
      <Sidebar open={open} onClose={()=>setOpen(prev=>!prev)}/>
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
          {/* <Link to="/profile">
            <p>Profile</p>
          </Link> */}
        </div>
        <div className="notification">
          <Link trigger="click" to="/notifications">
            <IoNotificationsOutline className="notification" />
          </Link>
        </div>
        <div onClick={()=>setOpen(prev=>!prev)}className="cross-bar">
          <HiBars3/>
        </div>
      </header>

    </div>
    <Outlet/>
   </>
  );
};
