import axios from "axios";
import { Buffer } from "buffer";
import { notifications } from "../Constants";
import { openNotification } from "../Utils";

const SetUpUserQuizPastHistory = async (token) => {
  try {
    await axios.post("http://127.0.0.3:3003/quizPastHistory/", {
      id: token,
      data: [],
    });
    return true;
  } catch (error) {
    return false;
  }
};


const setUpNotifications  = async (token)=>{
  try {
    await axios.post("http://127.0.0.3:3003/notifications/", {
      id: token,
      data: [],
    });
    return true;
  } catch (error) {
    return false;
  }
}

export const fetchData = async () => {
  try {
    const { data } = await axios.get("http://127.0.0.3:3003/users");
    return data;
  } catch (error) {
    return false;
  }
};

export const verifyData = () => {
  const login = async (info, api) => {
    let LoggedIn = false;
    try {
      const data = await fetchData();

      data.map(({ username, password, id }) => {
        if (username == info.username && password == info.password) {
          LoggedIn = true;
          localStorage.setItem("token", id);
        }
      });

      if (LoggedIn) {
        openNotification({ ...notifications.loginSuccesful, api });

        window.location.reload();
      } else {
        openNotification({ ...notifications.wrongCredentials, api });
      }
    } catch (error) {
      openNotification({ ...notifications.error, api });
    }

  };

  const signup = async (info, api) => {
    try {
      const token = Buffer.from(info.username, "utf-8").toString("base64");
      const userData = { id: token, ...info };

      const response = await axios.post(
        "http://127.0.0.3:3003/users",
        userData
      );

      openNotification({ ...notifications.signupSuccesful, api });
      localStorage.setItem("token", token);
      await SetUpUserQuizPastHistory(token);
      await setUpNotifications(token);
      window.location.reload();
    } catch (error) {
      openNotification({ ...notifications.error, api });
    }
  };

  return { signup, login };
};


export const getLogins = async ()=>{
  const { data } = await axios.get("http://127.0.0.3:3003/users");
  return data;
}
