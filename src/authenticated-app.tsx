import React from "react";

import { useAuth } from "context/auth-context";
import ProjectListIndex from "screens/project-list";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
//import { Navigate, Route, Routes } from 'react-router'
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useRoutes,
  RouteObject,
  Outlet,
} from "react-router-dom";
import ProjectScreen from "screens/project";
import KanbanScreen from "screens/kanban";
import EpicScreen from "screens/epic";
import routes from "routes";
import { resetRoute } from "utils";

// const routes: RouteObject[] = [
//   {
//     path: "/projects",
//     element: <ProjectListIndex></ProjectListIndex>,
//   },
// ];

export const AuthenticatedApp = () => {
  const routesElement = useRoutes(routes);
  return (
    <div>
      <PageHeader></PageHeader>
      <Main>
        {/* <ProjectListIndex></ProjectListIndex> */}
        {/* <Routes>
            <Route path="/projects" element={<ProjectListIndex />}></Route>
          <Route path="/projects/:projectId/*" element={<ProjectScreen />}></Route>
          <Route path="/kanban" element={<KanbanScreen />}></Route>
            <Route path="/epic" element={<EpicScreen />}></Route>
      
          <Route path="/" element={ <Navigate to="/projects"></Navigate>}></Route>
          </Routes> */}

        {routesElement}
      </Main>
    </div>
  );
};

const PageHeader = () => {
  const { logout, user } = useAuth();
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type="link" onClick={resetRoute}>
          <SoftwareLogo width="18rem" color="rgb(38,132,255)" />
        </Button>
        <h2>Logo</h2>
        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="logout">
                <Button type="link" onClick={logout}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type="link" onClick={(e) => e.preventDefault()}>
            hi,{user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const HeaderItem = styled.h3`
  margin-right: 3rem;
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
  grid-area: main;
`;
