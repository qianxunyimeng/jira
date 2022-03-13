import { Button, Drawer } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  projectListActions,
  selectprojectModalOpen,
} from "./project-list.slice";

export default function ProjectModal() {
  const dispatch = useDispatch();
  const projectModalOpen = useSelector(selectprojectModalOpen);
  return (
    <Drawer
      width={"100%"}
      visible={projectModalOpen}
      onClose={() => dispatch(projectListActions.closeProjectModal())}
    >
      <h1>projectModal</h1>
      <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>
        关闭
      </Button>
    </Drawer>
  );
}
