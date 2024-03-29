import axios from "axios";
import { flattenObjectValues, setPastQuizHistory } from "./QuizHistory";
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
    const date = new Date();
    console.log(results);
    const dataId = Buffer.from(`${date}`, "utf-8").toString("base64");
    const newDataSet = createNewDataSet(results);

    const flattenFormData = flattenObjectValues(formData);

    const data = {
      quiz: newDataSet,
      basicInfo: {
        ...flattenFormData,
        submited: "not started",
        expirationTime: 5,
        startingDate: "null",
        submittedTime: "null",
        websiteLeaved: "null",
      },
      dataId,
    };

    if (results.length == 0) return false;


    await setPastQuizHistory({ data, userId });

    // setLoading(false);
    return { quizData: data, dataId };
  } catch (error) {
    // setLoading(false);
    console.log("cannot get the information");
  }
  finally{
    setLoading(false);
  }
};
