import { useCallback, useReducer, useState } from "react";

export const useUndo = <T>(initalPresent: T) => {
  //历史记录
  //const [past, setPast] = useState<T[]>([])
  //当前值
  //const [present, setPresent] = useState(initalPresent);
  // 未来值
  //const [future, setFuture] = useState<T[]>([])

  const [state, setState] = useState<{
    past: T[];
    present: T;
    future: T[];
  }>({
    past: [],
    present: initalPresent,
    future: [],
  });

  //能否撤销上一步操作
  const canUndo = state.past.length !== 0;
  //能否重做
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      if (past.length === 0) return currentState;
      //上一步操作的结果
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
      //setPast(newPast);
      //setPresent(previous);
      //setFuture([present, ...future]);
    });
  }, []);

  const redo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState;

      if (future.length === 0) return currentState;

      const next = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
      //setPast([...past, present]);
      //setPresent(next);
      //setFuture(newFuture);
    });
  }, []);

  const set = useCallback((newPresent: T) => {
    setState((currentState) => {
      const { past, present, future } = currentState;

      if (newPresent === present) return currentState;
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
      //setPast([...past, present]);
      //setPresent(newPresent);
      //setFuture([]);
    });
  }, []);

  const reset = useCallback((newPresent: T) => {
    setState(() => {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
      //setPast([]);
      //setPresent(newPresent);
      //setFuture([]);
    });
  }, []);

  return [state, { set, reset, undo, redo, canUndo, canRedo }] as const;
};

const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";

type State<T> = {
  past: T[];
  present: T;
  future: T[];
};

type Action<T> = {
  data?: T;
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
};

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, future } = state;
  const { data: newPresent, type } = action;

  switch (type) {
    case UNDO:
      if (past.length === 0) return state;
      //上一步操作的结果
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    case REDO:
      if (future.length === 0) return state;

      const next = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    case SET:
      if (newPresent === present) return state;
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    case RESET:
      return {
        past: [],
        present: newPresent,
        future: [],
      };

    default:
      return state;
  }
};

export const useUndoPro = <T>(initalPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initalPresent,
    future: [],
  } as State<T>);

  //能否撤销上一步操作
  const canUndo = state.past.length !== 0;
  //能否重做
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {
    dispatch({ type: UNDO });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: REDO });
  }, []);

  const set = useCallback((newPresent: T) => {
    dispatch({ type: SET, data: newPresent });
  }, []);

  const reset = useCallback((newPresent: T) => {
    dispatch({ type: RESET, data: newPresent });
  }, []);

  return [state, { set, reset, undo, redo, canUndo, canRedo }] as const;
};
