import { useMemo } from "react";
import { useProject } from "utils/project";
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

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryparam([
    "projectCreate",
  ]);

  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryparam([
    "editingProjectId",
  ]);

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );

  const open = () => {
    return setProjectCreate({ projectCreate: true });
  };
  const close = () => {
    return setProjectCreate({ projectCreate: undefined });
  };

  const startEdit = (id: number) => {
    return setEditingProjectId({ editingProjectId: id });
  };

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProject),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};
