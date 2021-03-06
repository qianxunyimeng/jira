import { Button, Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import React, { FormEvent, useState } from "react";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";

//const apiUrl = process.env.REACT_APP_API_URL;

const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { login, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    //event.preventDefault();
    //const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
    //const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
    try {
      //await login(values);
      await run(login(values));
    } catch (error: any) {
      onError(error);
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type="text" id={"username"} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="password" id={"password"} placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <LongButton type="primary" loading={isLoading} htmlType="submit">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export default LoginScreen;
