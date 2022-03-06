import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitalState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(
  initalState?: State<D>,
  initConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, initConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitalState,
    ...initalState,
  });

  const setData = (data: D) => {
    setState({
      data,
      stat: "success",
      error: null,
    });
  };

  const setError = (error: Error) => {
    setState({
      error,
      stat: "error",
      data: null,
    });
  };

  // run用来出发异步请求
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型的数据 !!!");
    }
    setState({ ...state, stat: "loading" });

    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((err) => {
        setError(err);
        if (config.throwOnError) return Promise.reject(err);
        return err;
      });
  };

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
