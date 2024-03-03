import { SmileOutlined } from "@ant-design/icons";
import axios from "axios";
import { Buffer } from "buffer";
const notifications = {
  loginSuccesful: {
    message: "login succesful",
    description: "taking you to the home page",
    placement: "topLeft",
  },
  signupSuccesful: {
    message: "signup succesful",
    description: "taking you to the home page",
    placement: "topLeft",
  },
  wrongCredentials: {
    message: "wrong credentials",
    description: "you entered the wrong email or password",
    placement: "topLeft",
  },
  error: {
    message: "Error",
    description: "unexpected error occured try checking your internet",
    placement: "topLeft",
  },
};

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

const openNotification = ({ message, description, placement, api }) => {
  api.open({
    message,
    description,
    placement,
    icon: (
      <SmileOutlined
        style={{
          color: "#108ee9",
        }}
      />
    ),
  });
};

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
      // window.window.location.reload();
    } catch (error) {
      openNotification({ ...notifications.error, api });
    }
    setLoading(false);
  };

  return { signup, login };
};
