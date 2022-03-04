import React, { useState, useEffect } from "react";
import * as qs from "qs";
import { cleanEmptyObject, useDebounce, useMount } from "utils";
import List from "./list";
import SearchPanel from "./search-panel";
import { useHttp } from "utils/http";

const apiUrl = process.env.REACT_APP_API_URL;

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
    <div>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users}
      ></SearchPanel>
      <List list={list} users={users}></List>
    </div>
  );
}
