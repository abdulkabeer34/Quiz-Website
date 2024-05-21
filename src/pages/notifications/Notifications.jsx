import React from "react";
import "./Notifications.scss";
import { IoSettingsOutline } from "react-icons/io5";
import { Dropdown, Skeleton, Empty } from "antd";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { GiCrossMark } from "react-icons/gi";
import { useQuizNotification } from "../../CustomHooks";
import { FullWidthSkeletonInput } from "./styledComponents";

export const Notifications = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  
  const { queryData, updateNotificationMutation } = useQuizNotification(token);
  const { data, isLoading } = queryData;

  const removeItem = async (index, dataId) => {
    const newData = data.data.filter((item, subIndex) => index !== subIndex);
    updateNotificationMutation.mutate(newData);
  };

  const markAsReadorUnread = async (index, expression) => {
    const newData = data.data.map((item, subIndex) => {
      if (subIndex === index) {
        item.read = expression;
      }
      return item;
    });
    updateNotificationMutation.mutate(newData);
  };

  return (
    <>
      <div className="notifications-main">
        <div className="center">
          <div className="heading">
            <h1>Notifications</h1>
            <IoSettingsOutline />
          </div>
          <div className="notifications">
            {isLoading ? (
              Array(10).fill(null).map((item,index)=> <FullWidthSkeletonInput $index={index}    active/>)
            ) : !data.data.length ? (
              <Empty />
            ) : (
              data.data.map((item, index) => {
                const items = [
                  {
                    key: "1",
                    label: (
                      <p onClick={() => removeItem(index, item.dataId)}>
                        Remove Item
                      </p>
                    ),
                  },
                  {
                    key: "2",
                    label: item.read ? (
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
                        <h1>
                          Assignment{" "}
                          <span>
                            {item.read ? (
                              <div>
                                (<p>Done</p> <FaCheck color="#16a34a" />)
                              </div>
                            ) : (
                              <div>
                                (<p>Not done</p> <GiCrossMark color="#dc2626" />)
                              </div>
                            )}
                          </span>
                        </h1>
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
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
