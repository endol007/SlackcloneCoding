import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import Workspace from "./pages/Workspace";
import Login from "./pages/Login";
import SignUp from "./pages/SiginUp";
import { history } from "./redux/configureStore";
import { ConnectedRouter } from "connected-react-router";
import axios from "axios";

axios.defaults.baseURL = "http://3.35.214.41/";
axios.defaults.withCredentials = true;

function App(props) {
  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/workspace" component={Workspace} />
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
