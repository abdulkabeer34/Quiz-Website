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
} from "./StyledComponents";
import { verifyData } from "../../Apis/login";
import { useFormik } from "formik";
import { signupSchema } from "../../Constants";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [isLogin, setIsLogin] = useState(true);
  const [form] = Form.useForm();

  const registerUser = () => {
    setIsLogin(!isLogin);
    form.resetFields();
  };

  const handleSubmitForm = async (data) => {
    setLoading(true);
    const { login, signup } = verifyData();

    try {
      if (isLogin) await login(data,api);
      else await signup(data,api);
    } catch (error) {
      api.error({
        message: 'Error',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const {values,handleChange,handleSubmit,handleReset,handleBlur,errors,touched} = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      await handleSubmitForm(values);
    }
  });

  return (
    <>
      {contextHolder}
      <ConfigProvider theme={AntdLoginTheme}>
        <LoginMain className="login-main">
          <Left className="left">
            <img
              src={require("../../Assets/Images/illustration.svg").default}
              alt="Illustration"
            />
          </Left>
          <Right className="right">
            <AntdForm className="center" onFinish={handleSubmit}>
              <div className="image">
                <img src={require("../../Assets/Images/pngwing.com (5).png")} alt="Logo" />
              </div>
              <div className="heading">
                <h1>Welcome</h1>
                <p>Please {isLogin ? "Login" : "Signup"} to continue</p>
              </div>
              <div className="form-item">
                <p>Username</p>
                <AntdInput
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="false"
                  placeholder="Enter the username"
                />
                {touched.username && errors.username ? (
                  <div className="error">{errors.username}</div>
                ) : null}
              </div>
              <div className="password">
                <p>Password</p>
                <AntdPasswordInput
                  autoComplete = "false"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter the password"
                />
                {touched.password && errors.password ? (
                  <div className="error">{errors.password}</div>
                ) : null}
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
                    Don't have an account?
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
