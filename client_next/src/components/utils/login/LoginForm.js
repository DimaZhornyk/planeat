import React, { useState } from "react";
import { Tabs, Form, Input, Button } from "antd";
const { TabPane } = Tabs;
import GoogleLogin from "react-google-login";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function LoginForm({ onSignIn, onSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");

  const onFinish = () => {};
  const onFinishFailed = () => {};

  const responseGoogle = (response) => {
    console.log(response);
    onSignIn("", "", response.tokenId);
  };

  const onSubmitSignIn = () => {
    onSignIn(email, password);
  };

  const onSubmitSignUp = () => {
    onSignUp(login, email, password);
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
      <Tabs defaultActiveKey="1">
        <TabPane tab="Login" key="1">
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
            <Input onChange={(e) => setEmail(e.target.value)} value={email} />
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
            <Input.Password
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" onClick={onSubmitSignIn}>
              Submit
            </Button>
          </Form.Item>
          <Form.Item {...tailLayout} label="або" name="hint">
            {" "}
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
        </TabPane>
        <TabPane tab="Sign up" key="2">
          <Form.Item
            label="Login"
            name="login"
            rules={[
              {
                required: true,
                message: "Введіть корректный логін!",
              },
            ]}
          >
            <Input onChange={(e) => setLogin(e.target.value)} value={login} />
          </Form.Item>
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
            <Input onChange={(e) => setEmail(e.target.value)} value={email} />
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
            <Input.Password
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" onClick={onSubmitSignUp}>
              Submit
            </Button>
          </Form.Item>
        </TabPane>
      </Tabs>
    </Form>
  );
}

export default LoginForm;
