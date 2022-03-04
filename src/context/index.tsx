import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";

export const AppProvides = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
