import axios from "axios";

export const HandleSubmit = async (formData, setLoading) => {
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
    const data = await apiRequest(url, params);
    setLoading(false);
    return data;
  } catch (error) {
    setLoading(false);
    return false;
  }
};

const apiRequest = async (url, params) => {
  try {
    const { data } = await axios.get(url, { params });
    if (data.results) return data;
    else throw new Error("Sorry You Cannot take the quiz right now");
  } catch (error) {
    throw new Error("You Cannot take the quiz right now");
  }
};
