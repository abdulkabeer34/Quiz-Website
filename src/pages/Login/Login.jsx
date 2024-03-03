import React, { useState } from "react";
import "./Login.scss";
import { Checkbox, ConfigProvider, Form, notification } from "antd";
import {
  LoginMain,
  Left,
  Right,
  AntdInput,
  AntdPasswordInput,
  AntdForm,
  AntdButton,
  AntdLoginTheme,
} from "../../styledComponents/styledComponent";
import { verifyData } from "../../apis/login";
import { InputPasswordRules, InputUsernameRules } from "./attributes";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [isLogin, setIsLogin] = useState(true);
  const [form] = Form.useForm();

  const registerUser = () => {
    setIsLogin(!isLogin);
    form.resetFields();
  };

  const handleSubmit = async (data, setLoading, api) => {
    const { login, signup } = verifyData();

    if (isLogin) await login(data, setLoading, api);
    else await signup(data, setLoading, api);
  };

  return (
    <>
      {contextHolder}
      <ConfigProvider theme={AntdLoginTheme}>
        <LoginMain className="login-main">
          <Left className="left">
            <img
              src={require("../../assets/Images/illustration.svg").default}
            />
          </Left>
          <Right className="right">
            <AntdForm
              form={form}
              className="center"
              onFinish={(data) => {
                handleSubmit(data, setLoading, api);
              }}
            >
              <div className="image">
                <img src={require("../../assets/Images/pngwing.com (5).png")} />
              </div>
              <div className="heading">
                <h1>Welcome</h1>
                <p>Plz {isLogin ? "Login" : "Signup"} To Continue</p>
              </div>
              <div className="form-item">
                <p>Username</p>
                <Form.Item name="username" rules={InputUsernameRules}>
                  <AntdInput placeholder="Enter the username" />
                </Form.Item>
              </div>
              <div className="password">
                <p>Password</p>

                <Form.Item name="password" rules={InputPasswordRules}>
                  <AntdPasswordInput placeholder="Enter the password" />
                </Form.Item>
              </div>
              <AntdButton loading={loading} htmlType="submit">
                {isLogin ? "Login" : "Signup"}
              </AntdButton>
              <div className="form-bottom-1">
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  className="remember-me"
                >
                  <Checkbox>Remember Me</Checkbox>
                </Form.Item>
                <p>Forget Password?</p>
              </div>
              <div className="sign-login">
                {isLogin ? (
                  <>
                    Didnt have an account?
                    <span onClick={registerUser}>Signup</span>
                  </>
                ) : (
                  <>
                    Already have an account?
                    <span onClick={registerUser}>Login</span>
                  </>
                )}
              </div>
            </AntdForm>
          </Right>
        </LoginMain>
      </ConfigProvider>
    </>
  );
};
