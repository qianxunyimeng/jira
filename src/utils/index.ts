import { log } from "console";
import { useEffect, useRef, useState } from "react";

export const isFalseValue = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) => {
  return value === undefined || value === null || value === "";
};

export const cleanEmptyObject = (obj: { [key: string]: unknown }) => {
  const result = { ...obj };
  Object.keys(result).forEach((key: string) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useDebounce = <T>(value: T, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    //每次在value变化以后，设置一个新的定时器
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounceValue;
};

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);

  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.slice(index, 1);
      setValue(copy);
    },
  };
};

// hook + 闭bao
// export const useDocumentTitle = (title: string,keepOnUnmount:boolean = true) => {

//   const oldTitle = document.title
//   console.log("渲染时的oldtitle: ",oldTitle);

//   useEffect(() => {
//     document.title = title
//   }, [title])

//   useEffect(() => {
//     //组件卸载时调用
//     return () => {
//       if (!keepOnUnmount) {
//         console.log("卸载时的oldtitle: ", oldTitle);
//         document.title = oldTitle
//       }
//     }
//   },[])
// }

export const useDocumentTitle = (
  title: string,
  keepOUnmount: boolean = true
) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOUnmount, oldTitle]);
};

export const resetRoute = () => {
  window.location.href = window.location.origin;
};
