import React, { useState } from "react";

import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { useRoutes } from "react-router-dom";
import routes from "routes";
import { resetRoute } from "utils";
import ProjectModal from "screens/project-list/project-modal";
import ProjectPopver from "components/project-popover";

export const AuthenticatedApp = () => {
  const routesElement = useRoutes(routes);
  //const [projectModalOpen,setProjectModalOpen] = useState(false)
  return (
    <Container>
      <PageHeader></PageHeader>
      <Main>{routesElement}</Main>
      <ProjectModal></ProjectModal>
    </Container>
  );
};

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type="link" onClick={resetRoute} style={{ padding: 0 }}>
          <SoftwareLogo width="18rem" color="rgb(38,132,255)" />
        </Button>
        <ProjectPopver></ProjectPopver>
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User></User>
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();

  return (
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
  );
};

const HeaderItem = styled.h3`
  margin-right: 3rem;
`;

// temporal dead zone(暂时性死区)
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
  display: flex;
  width: 100vw;
  overflow: hidden;
`;
