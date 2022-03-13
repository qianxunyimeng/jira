import { useMemo, useState } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanEmptyObject, subset } from "utils";

/**
 * 返回页面URL中，指定键的参数值
 */
export const useUrlQueryparam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParam = useSetUrlSearchparam();
  const [stateKeys] = useState(keys);
  return [
    useMemo(
      () =>
        subset(Object.fromEntries(searchParams), stateKeys) as {
          [key in K]: string;
        },
      [searchParams, stateKeys]
    ),

    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParam(params);
    },
  ] as const;
};

export const useSetUrlSearchparam = () => {
  const [searchParams, setSearchParam] = useSearchParams();

  return (params: { [key in string]: unknown }) => {
    const o = cleanEmptyObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParam(o);
  };
};
