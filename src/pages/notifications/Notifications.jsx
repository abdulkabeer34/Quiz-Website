import React, { useEffect, useState } from "react";
import "./Notifications.scss";
import { IoSettingsOutline } from "react-icons/io5";
import { Dropdown } from "antd";
import { IoEllipsisHorizontal } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { GiCrossMark } from "react-icons/gi";

import { RemoveNotification, UpdateNotification } from "../../apis/notificationApis";

export const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const getNotifications = async () => {
      const api = `http://127.0.0.3:3003/notifications/${token}`;
      const { data } = await axios.get(api);
      setNotifications(data.data);

      console.log(data);
    };

    getNotifications();
  }, []);

  const removeItem = async (index, dataId) => {
    const newData = notifications.filter((item, subIndex) => index != subIndex);
    setNotifications(newData);

    await RemoveNotification(token, dataId);
  };

  const markAsReadorUnread = async (index, expresssion) => {
    const newData = notifications.map((item, subIndex) => {
      if (subIndex == index) {
        item.read = expresssion;
      }
      return item
    });
    setNotifications(newData);
    UpdateNotification(token,newData)
  };

  if (!notifications) return;
  return (
    <>
      <div className="notifications-main">
        <div className="center">
          <div className="heading">
            <h1>Notifications</h1>
            <IoSettingsOutline />
          </div>
          <div className="notifications">
            {notifications.map((item, index) => {
              const items = [
                {
                  key: "1",
                  label: (
                    <p onClick={() => removeItem(index, item.dataId)}>
                      {" "}
                      Remove Item
                    </p>
                  ),
                },
                {
                  key: "2",
                  label:
                    item.read == true ? (
                      <p onClick={() => markAsReadorUnread(index, false)}>
                        mark as unread
                      </p>
                    ) : (
                      <p onClick={() => markAsReadorUnread(index, true)}>
                        mark as read
                      </p>
                    ),
                },
                {
                  key: "3",
                  label: (
                    <p onClick={() => navigate(`/quiz-area/${item.dataId}/0`)}>
                      Open Item
                    </p>
                  ),
                },
              ];

              return (
                <div className="notification" key={index}>
                  <div className="left">
                    <div className="image">
                      <img src="https://ui.shadcn.com/avatars/01.png" alt="" />
                    </div>
                    <div className="content">
                    <h1 >Ass
                    ignment <span >{item.read ? <div>(<p>Done</p> <FaCheck color="#16a34a"/>)</div> : <div>(<p>Not done</p> <GiCrossMark color="#dc2626" />)</div>}</span></h1>
                      <p className="details">{item.message}</p>
                    </div>
                  </div>
                  <div className="right">
                    <Dropdown
                      menu={{ items }}
                      trigger="click"
                      placement="bottom"
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      <IoEllipsisHorizontal />
                    </Dropdown>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
