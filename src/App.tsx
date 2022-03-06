import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthticatedApp } from "unauthenticated-app";
import { ErrorBoundary } from "components/err-boundary";
import { FullPageErrorCallback } from "components/lib";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorCallback}>
        {user ? <AuthenticatedApp /> : <UnauthticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
