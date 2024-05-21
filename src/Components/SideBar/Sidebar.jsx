import React, { useEffect, useState } from "react";
import {
  HistoryOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

import { Layout, Menu, Button, Drawer, theme } from "antd";
import { IoNotificationsOutline } from "react-icons/io5";
import { useLocation } from 'react-router-dom';

import styled from "styled-components";
import { Link } from "react-router-dom";
import { CreateQuizConfigProvider } from "../CreateQuizConfigProvider";


const items = [
  { key: "0", icon: <HistoryOutlined />, label:<Link to="/quiz-history"> <p>History</p> </Link> },
  { key: "1", icon: <VideoCameraOutlined />, label: <Link to="/create-quiz"> <p>Create Quiz</p> </Link> },
//   { key: "3", icon: <UserOutlined />, label: <Link to="/profile"> <p>Profile</p> </Link>  },
  { key: "2", icon: <IoNotificationsOutline />, label:<Link to="/notifications">Notifications</Link> },
];


const  paths = [
    "quiz-history","create-quiz","notifications"
]

const SideBarMenu = styled(Menu)`
  height: 100% !important;
  li {
    margin-top: 17px !important;
  }
  
  .ant-menu-title-content{
      margin-inline-start: 40px !important;
      font-size:15px !important;
  }
`;



const Sidebar = ({ open, onClose }) => {
    const location = useLocation();
    const [index,setIndex] = useState();
    console.log(index)


    useEffect(()=>{
      const currentPath = paths.indexOf(location.pathname.split("/")[1]);
      
      setIndex(currentPath.toString())
    },[])
    
  return (
    <>
    <CreateQuizConfigProvider>
    <Drawer title="Quiz App" onClose={onClose} open={open}>
        <SideBarMenu
          theme="dark"
          mode="inline"
          selectedKeys={[index]}
          items={items}
          onTitleClick	 = {onClose}
        />
      </Drawer>
    </CreateQuizConfigProvider>
    </>
  );
};

export default Sidebar;
