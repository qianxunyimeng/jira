import React from "react";
import { useUsers } from "utils/user";
import { IdSelect } from "./id-select";

//React.ComponentProps<类型>的作用就是将指定类型的props都提取出来
export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers();
  return <IdSelect options={users || []} {...props}></IdSelect>;
};
