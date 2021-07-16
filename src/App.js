import logo from './logo.svg';
import React from "react";
import './App.css';
import Login from "./pages/Login";
import { BrowserRouter, Route } from "react-router-dom";
function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Route path="/login" exact component={Login}/>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
