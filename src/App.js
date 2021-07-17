import "./App.css";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./pages/Login";
import Workspace from "./pages/Workspace";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Route path="/login" exact component={Login} />
        <Route path="/workspace" component={Workspace} />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
