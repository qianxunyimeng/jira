import { useCallback, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "screens/project-list/list";
import { useProjectsSearchParams } from "screens/project-list/util";
import { cleanEmptyObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

// export const useProjects = (param?: Partial<Project>) => {
//   const client = useHttp();
//   const { run, ...result } = useAsync<Project[]>();

//   const fetchProjects = useCallback(
//     () => client("projects", { data: cleanEmptyObject(param || {}) }),
//     [client, param]
//   );

//   useEffect(() => {
//     run(fetchProjects(), {
//       retry: fetchProjects,
//     });
//   }, [param, run, fetchProjects]);
//   return result;
// };

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  // key: projects, 当param变化时自动重新请求接口
  return useQuery<Project[], Error>(["projects", param], () => {
    return client("projects", { data: param });
  });
};

// export const useEditProject = () => {
//   const { run, ...asyncResult } = useAsync();
//   const client = useHttp();
//   const mutate = (params: Partial<Project>) => {
//     return run(
//       client(`projects/${params.id}`, {
//         data: params,
//         method: "PATCH",
//       })
//     );
//   };

//   return {
//     mutate,
//     ...asyncResult,
//   };
// };

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  const [searchParams] = useProjectsSearchParams();
  const querykey = ["projects", searchParams];

  return useMutation(
    (params: Partial<Project>) => {
      console.log(params);
      return client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries(querykey),
      //乐观更新
      async onMutate(target) {
        const previousItems = queryClient.getQueryData(querykey);
        queryClient.setQueryData(querykey, (old?: Project[]) => {
          return (
            old?.map((project) =>
              project.id === target.id ? { ...project, ...target } : project
            ) || []
          );
        });
        return { previousItems };
      },
      onError(error, newItem, context) {
        //操作异常时，要回滚数据
        queryClient.setQueryData(
          querykey,
          (context as { previousItems: Project[] }).previousItems
        );
      },
    }
  );
};

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };

  return {
    mutate,
    ...asyncResult,
  };
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery(
    ["project", { id }],
    () => {
      return client(`projects/${id}`);
    },
    {
      enabled: !!id, //当id有值当时候，才获取数据
    }
  );
};
