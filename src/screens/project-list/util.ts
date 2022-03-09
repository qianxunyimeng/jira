import { useMemo } from "react";
import { useUrlQueryparam } from "utils/url";

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryparam(["name", "personId"]);
  //将personId 从string转为number
  return [
    useMemo(() => {
      return {
        ...param,
        personId: Number(param.personId) || undefined,
      };
    }, [param]),
    setParam,
  ] as const;
};
