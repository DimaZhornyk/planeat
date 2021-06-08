import React from "react";
import { Form, Input, Button } from "antd";
import GoogleLogin from "react-google-login";
import axios from "axios";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function LoginForm() {
  const onFinish = () => {};
  const onFinishFailed = () => {};

  const responseGoogle = async (response) => {
    console.log(response);

    const res = axios
      .post(
        "http://localhost:5002/user/sign_in_google",
        {
          token: response.tokenId,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        fetchFav();
      })
      .catch((error) => {});
    //window.location = "/user/profile"
    //TODO process reponse to handle session
  };

  const fetchFav = async () => {
    await axios
      .get("http://localhost:5002/favorites", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
      });
  };

  const onSubmitLogin = async (email, password) => {
    console.log(email, password);
  };

  return (
    <Form
      style={{ margin: "15px auto" }}
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Email"
        name="username"
        rules={[
          {
            required: true,
            type: "email",
            message: "Введіть корректну пошту!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Введіть коректний пароль!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" onClick={onSubmitLogin}>
          Submit
        </Button>
      </Form.Item>

      <Form.Item {...tailLayout} label="або" name="hint"></Form.Item>

      <Form.Item {...tailLayout}>
        <GoogleLogin
          clientId={
            "469925953534-0r004nl79hgimfjabvbghrhjkkl8bi2b.apps.googleusercontent.com"
          }
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
