import React, { ReactNode, useState } from "react";

import * as auth from "auth-provide";
import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorCallback, FullPageLoading } from "components/lib";

export interface AuthForm {
  username: string;
  password: string;
}

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  //const [user, setUser] = useState<User | null>(null);

  const {
    data: user,
    error,
    isIdle,
    isLoading,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();

  const login = (form: AuthForm) => {
    return auth.login(form).then((user) => setUser(user));
  };

  const register = (form: AuthForm) => {
    return auth.register(form).then((user) => setUser(user));
  };

  const logout = () => {
    return auth.logout().then(() => setUser(null));
  };

  useMount(() => {
    //bootstrapUser().then(setUser);
    run(bootstrapUser());
  });

  if (isIdle || isLoading) {
    return <FullPageLoading></FullPageLoading>;
  }

  if (isError) {
    return <FullPageErrorCallback error={error}></FullPageErrorCallback>;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    ></AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
