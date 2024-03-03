import axios from "axios";

export const flattenObjectValues = (data) => {
  const key = Object.keys(data);
  const newObject = {};
  key.map((item) => {
    if (Array.isArray(data[item])) {
      if (data[item].length == 1) {
        newObject[item] = data[item][0];
      }
    } else newObject[item] = data[item];
  });
  return newObject;
};

export const setPastQuizHistory = async (
  data,
  url,
  userId,
  formData,
  dataId
) => {
  try {
    formData = flattenObjectValues(formData);

    const { data: pastData } = await getPastQuizHistory(userId);
    console.log(data);
    data = {
      quiz: data,
      basicInfo: {
        ...formData,
        submited: "not started",
        expirationTime: 5,
        startingDate: "null",
        submittedTime: "null",
      },
      dataId,
    };
    const respnose = await axios.patch(
      `http://127.0.0.3:3003/quizPastHistory/${userId}`,
      { data: [...(pastData ?? []), data] }
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getPastQuizHistory = async () => {
  try {
    const id = localStorage.getItem("token");
    const { data:{data} } = await axios.get(
      ` http://127.0.0.3:3003/quizPastHistory/${id}`
    );

    return { data, id };
  } catch (error) {
    return false;
  }
};

export const updatePastQuizHistory = async ({
  token,
  dataId,
  quiz,
  submited,
  startingDate,
  expirationTime,
  submittedTime,
}) => {
  const { data } = await getPastQuizHistory();
  const newData = data.map((item) => {
    if (item.dataId !== dataId) return item;

    return {
      ...item,
      quiz: quiz ?? item.quiz,
      basicInfo: {
        ...item.basicInfo,
        submited: submited ?? item.basicInfo.submited,
        startingDate: startingDate ?? item.basicInfo.startingDate,
        expirationTime: expirationTime ?? item.basicInfo.expirationTime,
        submittedTime: submittedTime ?? item.basicInfo.submittedTime,
      },
    };
  });

  await axios.patch(`http://127.0.0.3:3003/quizPastHistory/${token}`, {
    data: newData,
  });
};
