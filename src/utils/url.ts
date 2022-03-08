import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanEmptyObject } from "utils";

/**
 * 返回页面URL中，指定键的参数值
 */
export const useUrlQueryparam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    useMemo(() => {
      return keys.reduce((prev, key) => {
        return { ...prev, [key]: searchParams.get(key) || "" };
      }, {} as { [key in K]: string });
    }, [searchParams]),

    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanEmptyObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParam(o);
    },
  ] as const;
};
