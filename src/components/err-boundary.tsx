import { type } from "os";
import React, { ReactNode } from "react";

type Fallbackrender = (props: { error: Error | null }) => React.ReactElement;
// export class ErrorBoundary extends React.Component<{children: ReactNode,fallbackRender: Fallbackrender}>{

// }

//自定义异常边界组件
//https://github.com/bvaughn/react-error-boundary
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: Fallbackrender }>,
  { error: Error | null }
> {
  state = {
    error: null,
  };

  //当子组件抛出异常，这里会接收并调用
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
