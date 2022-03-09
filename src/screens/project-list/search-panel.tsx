/* @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { Form, Input, Select } from "antd";
import { UserSelect } from "components/user-select";
import React, { useEffect, useState } from "react";
import { Project } from "./list";

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

//Pick 的作用就是提取 指定的属性
interface SearchPanelprops {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
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
        <UserSelect
          defaultOptionName="负责人"
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        ></UserSelect>
      </Form.Item>
    </Form>
  );
}
