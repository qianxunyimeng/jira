import React, { useState, useEffect } from "react";
import * as qs from "qs";
import {
  cleanEmptyObject,
  useDebounce,
  useDocumentTitle,
  useMount,
} from "utils";
import List, { Project } from "./list";
import SearchPanel from "./search-panel";
//import { useHttp } from "utils/http";
import styled from "@emotion/styled";
//import { useAsync } from "utils/use-async";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { Outlet } from "react-router";
import { useUrlQueryparam } from "utils/url";

//const apiUrl = process.env.REACT_APP_API_URL;

export default function ProjectListIndex() {
  //const [users, setUsers] = useState([]);
  useDocumentTitle("项目列表", false);
  //const [keys] = useState<('name'|'personId')[]>(['name','personId'])
  const [param, setParam] = useUrlQueryparam(["name", "personId"]);
  const debounceParam = useDebounce(param, 200);
  //const [list, setList] = useState([]);
  //const client = useHttp();
  //const { run,isLoading,error,data: list } = useAsync<Project[]>();
  const { isLoading, error, data: list } = useProjects(debounceParam);
  const { data: users } = useUsers();
  // useEffect(() => {
  //   run(client("projects", { data: cleanEmptyObject(debounceParam) }))
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debounceParam]);

  // useMount(() => {
  //   client("users").then((res) => setUsers(res));
  //   // fetch(`${apiUrl}/users`).then(async (response) => {
  //   //   if (response.ok) {
  //   //     setUsers(await response.json());
  //   //   }
  //   // });
  // });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users || []}
      ></SearchPanel>
      <List dataSource={list || []} users={users || []}></List>
    </Container>
  );
}

ProjectListIndex.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
