import React from "react";
import { Link, Routes, Route, Outlet } from "react-router-dom";
import EpicScreen from "screens/epic";
import KanbanScreen from "screens/kanban";

export default function ProjectScreen() {
  return (
    <div>
      <Link to="kanban">看板</Link>
      <Link to="epic">任务组</Link>
      <Outlet></Outlet>
    </div>
  );
}
