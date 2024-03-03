import axios from "axios";
import { setPastQuizHistory } from "./QuizHistory";
import { Buffer } from "buffer";
import { createNewDataSet } from "../utils";

const apiRequest = async (url, params) => {
  try {
    const { data } = await axios.get(url, { params });
    if (data.results) return data;
    else throw new Error("Sorry You Cannot take the quiz right now");
  } catch (error) {
    console.log(error);
    throw new Error("You Cannot take the quiz right now");
  }
};

export const HandleSubmit = async (formData, setLoading, userId) => {
  setLoading(true);
  const keys = Object.keys(formData);
  let params = new Object();
  const url = "https://opentdb.com/api.php";

  keys.map((key) => {
    const value = formData[key];
    if (Array.isArray(value)) {
      const [subitem] = value;
      if (subitem !== "any" && subitem) {
        params[key] = subitem;
      }
    } else if (value !== "any" && value) {
      params[key] = value;
    }
  });

  try {
    const { results } = await apiRequest(url, params);
    const quizHistoryUrl = "http://127.0.0.3:3003/users";
    const date = new Date();
    const dataId = Buffer.from(`${date}`, "utf-8").toString("base64");
    const newDataSet = createNewDataSet(results);

    await setPastQuizHistory(
      newDataSet,
      quizHistoryUrl,
      userId,
      formData,
      dataId
    );

    setLoading(false);
    return { quizData: results, dataId };
  } catch (error) {
    setLoading(false);
    console.log("cannot get the information");
  }
};
