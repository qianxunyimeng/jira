/* @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelprops {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelprops["param"]) => void;
}

export default function searchPanel({
  param,
  setParam,
  users,
}: SearchPanelprops) {
  return (
    <Form layout={"inline"} css={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input
          placeholder="项目名"
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        ></Input>
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value="">负责人</Select.Option>
          {users.map((user) => (
            <Select.Option value={String(user.id)} key={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
}
