import React, { useState } from "react";
import "./Home.scss";
import { Button, ConfigProvider, Form, InputNumber, message } from "antd";
import { AntdCascader, CustomModalAntd, FormItem } from "./StyledComponents";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setData } from "../../Store/QuizStore";
import {
  CategoriesDataSet,
  DifficultyDataSet,
  TypeDataSet,
} from "../../Constants"
import { useHandleSubmitQuizQuery } from "../../CustomHooks/Query/handleSubmitQuiz";

export const Home = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const {mutation} = useHandleSubmitQuizQuery()

  const warning = ({ content }) => {
    messageApi.open({
      type: "warning",
      content,
    });
  };

  const startQuiz = async (formData) => {
    setLoading(true)
    const props = await  mutation.mutateAsync({formData,userId: token});
    setLoading(false)

    if (!props) {
      warning({
        content:
          "interval server error , try selecting different options instead",
      });
      return;
    }
    const { quizData, dataId } = props;
    dispatch(setData(quizData));
    navigate(`/quiz-area/${dataId}/0`);
  };

  return (
    
    <div className="home-main">
      {contextHolder}
      <ConfigProvider theme={{ token: { colorPrimary: "black" } }}>
        <div className="center">
          <h1>My Quiz App</h1>
          <p>
            Embark on a journey of discovery through captivating quizzes
            tailored to your interests.
          </p>
          <button
            className="button-50"
            role="button"
            onClick={() => setOpen(true)}
          >
            Take a Quiz
          </button>
        </div>
        <CustomModalAntd
          centered
          footer={false}
          open={open}
          onCancel={() => !loading && setOpen(false)}
          width={500}
        >
          <h1>Enter the Quiz data</h1>
          <Form
            onFinish={(e) => startQuiz(e)}
            initialValues={{
              amount: 3,
              category: "any",
              difficulty: "any",
              type: "any",
            }}
          >
            <div className="form-items">
              <FormItem className="form-item" width="50%">
                <p>Number of Questions:</p>
                <Form.Item name="amount">
                  <InputNumber min={1} max={100} />
                </Form.Item>
              </FormItem>
              <FormItem width="40%">
                <p>Select Category:</p>
                <Form.Item name="category">
                  <AntdCascader options={CategoriesDataSet} />
                </Form.Item>
              </FormItem>

              <FormItem width="50%">
                <p>Select Difficulty:</p>
                <Form.Item name="difficulty">
                  <AntdCascader options={DifficultyDataSet} />
                </Form.Item>
              </FormItem>
              <FormItem width="40%">
                <p>Select Type:</p>
                <Form.Item name="type">
                  <AntdCascader options={TypeDataSet} />
                </Form.Item>
              </FormItem>
            </div>
            <Button loading={loading} className="submit-btn" htmlType="submit">
              Start The Quiz
            </Button>
          </Form>
        </CustomModalAntd>
      </ConfigProvider>
    </div>
  );
};
