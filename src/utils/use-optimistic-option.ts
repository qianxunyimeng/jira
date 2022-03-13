import { QueryKey, useQueryClient } from "react-query";

export const useConfig = (
  querykey: QueryKey,
  callback: (target: any, old?: any[]) => any[]
) => {
  const queryClient = useQueryClient();

  return {
    onSuccess: () => queryClient.invalidateQueries(querykey),
    //乐观更新
    async onMutate(target: any) {
      const previousItems = queryClient.getQueryData(querykey);
      queryClient.setQueryData(querykey, (old?: any[]) => {
        return callback(target, old);
      });
      return { previousItems };
    },
    onError(error: any, newItem: any, context: any) {
      //操作异常时，要回滚数据
      queryClient.setQueryData(querykey, context.previousItems);
    },
  };
};
