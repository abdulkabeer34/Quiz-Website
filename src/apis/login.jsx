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

const fetchData = async () => {
  try {
    const { data } = await axios.get("http://127.0.0.3:3003/users");
    return data;
  } catch (error) {
    return false;
  }
};

export const verifyData = () => {
  const login = async (info, setLoading, api) => {
    setLoading(true);
    let LoggedIn = false;
    try {
      const data = await fetchData();

      data.map(({ username, password, id }) => {
        if (username == info.username && password == info.password) {
          LoggedIn = true;
          localStorage.setItem("token", id);
          console.log(id);
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

    setLoading(false);
  };

  const signup = async (info, setLoading, api) => {
    setLoading(true);
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
    setLoading(false);
  };

  return { signup, login };
};
