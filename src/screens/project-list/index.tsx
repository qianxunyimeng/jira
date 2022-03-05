import React, { useState, useEffect } from "react";
import * as qs from "qs";
import { cleanEmptyObject, useDebounce, useMount } from "utils";
import List from "./list";
import SearchPanel from "./search-panel";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

//const apiUrl = process.env.REACT_APP_API_URL;

export default function ProjectListIndex() {
  const [users, setUsers] = useState([]);

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 200);
  const [list, setList] = useState([]);
  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanEmptyObject(debounceParam) }).then(setList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParam]);

  useMount(() => {
    client("users").then((res) => setUsers(res));
    // fetch(`${apiUrl}/users`).then(async (response) => {
    //   if (response.ok) {
    //     setUsers(await response.json());
    //   }
    // });
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users}
      ></SearchPanel>
      <List list={list} users={users}></List>
    </Container>
  );
}

const Container = styled.div`
  padding: 3.2rem;
`;
