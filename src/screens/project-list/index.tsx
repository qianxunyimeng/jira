import React, { useState, useEffect } from "react";
import { useDebounce, useDocumentTitle } from "utils";
import List, { Project } from "./list";
import SearchPanel from "./search-panel";
//import { useHttp } from "utils/http";
import styled from "@emotion/styled";
//import { useAsync } from "utils/use-async";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectsSearchParams } from "./util";

//const apiUrl = process.env.REACT_APP_API_URL;

export default function ProjectListIndex() {
  useDocumentTitle("项目列表", false);
  const [param, setParam] = useProjectsSearchParams();
  const debounceParam = useDebounce(param, 200);
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
      <List
        dataSource={list || []}
        users={users || []}
        loading={isLoading}
      ></List>
    </Container>
  );
}

ProjectListIndex.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
