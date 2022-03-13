import { ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { Provider } from "react-redux";
import { AuthProvider } from "./auth-context";
import { store } from "store";

export const AppProvides = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
};
