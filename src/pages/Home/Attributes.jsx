import axios, { Axios } from "axios";

const Categories = [
  "General Knowledge",
  "Books",
  "Films",
  "Music",
  "Musicals & Theatres",
  "Television",
  "Video Games",
  "Board Games",
  "Science & Nature",
  "Computer",
  "Mathematics",
  "Mythology",
  "Sports",
  "Geography",
  "History",
  "Politics",
  "Arts",
  "Celebrities",
  "Animals",
  "Vehicles",
  "Comics",
  "Gadgets",
  "Japanese Anime & Manga",
  "Cartoon & Animations",
];
const Difficulty = ["Easy", "Medium", "Hard"];

export const CategoriesDataSet = Categories.map((item, index) => ({
  value: index + 9,
  label: item,
}));
export const DifficultyDataSet = Difficulty.map((item) => ({
  value: item.toLocaleLowerCase(),
  label: item,
}));
export const TypeDataSet = [
  { value: "multiple", label: "Multiple Choice" },
  { value: "boolean", label: "True/False" },
];

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
    return data;
  } catch (error) {
    return false;
  }
  setLoading(false);
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
