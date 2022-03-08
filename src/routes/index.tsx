// @ts-nocheck
import { Spin } from "antd";
import React, { Suspense } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import ProjectScreen from "screens/project";

// 一个动态导入
// 为什么不写成lazyLoad(path: string)
// https://webpack.js.org/api/module-methods/#dynamic-expressions-in-import
function lazyLoad(Comp: React.LazyExoticComponent<any>): React.ReactNode {
  return (
    <Suspense
      fallback={
        <Spin
          size="large"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      }
    >
      <Comp />
    </Suspense>
  );
}

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/projects"></Navigate>,
  },
  {
    path: "/projects",
    element: lazyLoad(React.lazy(() => import("screens/project-list/index"))),
  },
  {
    path: "/projects/:projectId/*",
    element: <ProjectScreen></ProjectScreen>,
    children: [
      {
        //path: "kanban",
        index: true,
        element: lazyLoad(React.lazy(() => import("screens/kanban"))),
      },
      {
        path: "kanban",
        element: lazyLoad(React.lazy(() => import("screens/kanban"))),
      },
      {
        path: "epic",
        element: lazyLoad(React.lazy(() => import("screens/epic"))),
      },
    ],
  },
];

export default routes;
