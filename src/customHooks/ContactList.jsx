import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { sendNotifications } from "../apis/notificationApis";

export const ContactList = ({ questions }) => {
  const [contactList, setContactList] = useState([]);
  const token = useSelector((e) => e.quizStore.userToken);

  useEffect(() => {
    const getLogins = async () => {
      const { data } = await axios.get("http://127.0.0.3:3003/users");
      setContactList(data);
    };
    getLogins();
  }, []);

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
          console.log(token, item.id);
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
                  onClick={async () =>
                    await sendNotifications(item.id, questions)
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
