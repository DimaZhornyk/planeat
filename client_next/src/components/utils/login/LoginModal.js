import React from "react";
import { Modal, Form, Input, Button } from "antd";
import GoogleLogin from "react-google-login";
import Password from "antd/lib/input/Password";
//require("dotenv").config();

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function LoginModal({ isLoginVisible }) {
  const onFinish = () => {};
  const onFinishFailed = () => {};

  const responseGoogle = async (response) => {
    console.log(response);
    const res = await fetch("http://localhost:5500/user/sign_in_google", {
      method: "POST",
      body: JSON.stringify({
        token: response.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        fetchFav();
      })
      .catch((error) => {});
    //window.location = "/user/profile"
    //TODO process reponse to handle session
  };

  const fetchFav = async () => {
    await fetch("http://localhost:5500/favorites", {
      method: "GET",
    })
      .then((fav) => {
        console.log(fav);
      })
      .catch((err) => console.log(err));
  };

  const onSubmitLogin = async (email, password) => {
    console.log(email, password);
  };

  return (
    <Modal visible={isLoginVisible} footer={null} style={{ margin: "0 auto" }}>
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
    </Modal>
  );
}

export default LoginModal;
