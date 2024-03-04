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