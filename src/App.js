import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Workspace from "./pages/Workspace"
import Login from "./pages/Login";
import SignUp from "./pages/SiginUp";

function App(props) {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Route path="/login" exact component={Login}/>
        <Route path="/signup" exact component={SignUp}/>
        <Route path="/workspace" component={Workspace} />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
