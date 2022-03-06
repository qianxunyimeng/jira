import React, { FormEvent } from "react";
import { Button, Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";

const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement)
  //     .value;
  //   const password = (event.currentTarget.elements[1] as HTMLInputElement)
  //     .value;
  //   register({ username, password });
  // };
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("两次输入的密码不一致"));
      return;
    }
    try {
      await run(register(values));
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
      <Form.Item
        name="cpassword"
        rules={[{ required: true, message: "确认密码" }]}
      >
        <Input type="password" id={"cpassword"} placeholder="确认密码" />
      </Form.Item>
      <Form.Item>
        <LongButton type="primary" htmlType="submit" loading={isLoading}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export default RegisterScreen;
