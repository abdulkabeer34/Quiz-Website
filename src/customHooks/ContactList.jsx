import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { sendNotifications } from "../Apis/notificationApis";

export const ContactList = ({ questions,confirmLoading }) => {
  const [contactList, setContactList] = useState([]);
  const token = useSelector((e) => e.quizStore.userToken);
  const [buttonsLoading,setButtonsLoading] = useState([]);
  const [data,setData] = useState([]);
  

  useEffect(() => {
    const getLogins = async () => {
      const { data } = await axios.get("http://127.0.0.3:3003/users");
      setButtonsLoading(Array(data.length).fill(false));
      setContactList(data);
    };
    getLogins();
  }, []);

  useEffect(() => {
    setData(questions)
  }, [questions])


  if (!contactList) return;
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "8px",
        overflow: "scroll",
        backgroundColor: "rgb(255, 255, 255)",
        scrollbarWidth: "none",
        height: "73vh",
      }}
    >
      <div style={{ display: "grid", gap: "24px", padding: "24px" }}>
        {contactList.map((item, index) => {
          if (token == item.id) return;
          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <div>
                  <img
                    style={{ width: "2.25rem" }}
                    src="https://ui.shadcn.com/avatars/03.png"
                  />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    {item.username}
                  </p>
                  <p style={{ color: "#888" }}>Student</p>
                </div>
              </div>
              <div>
                <Button
                  loading={buttonsLoading[index] || confirmLoading}
                  onClick={async () =>
                    await sendNotifications({token:item.id, data,index,buttonsLoading,setButtonsLoading})
                  }
                >
                  Send
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
