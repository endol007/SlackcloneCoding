import logo from './logo.svg';
import React from "react";
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/SiginUp";
function App(props) {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Route path="/login" exact component={Login}/>
        <Route path="/signup" exact component={SignUp}/>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
