import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ProjectListIndex from "screens/project-list";
import LoginScreen from "screens/login";

function App() {
  return (
    <div className="App">
      {/* <ProjectListIndex></ProjectListIndex> */}
      <LoginScreen></LoginScreen>
    </div>
  );
}

export default App;
