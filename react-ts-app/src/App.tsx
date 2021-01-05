import React from "react";
import "./App.css";
import Login from "./componet/Login";
import Home from "./componet/Home";
import { BrowserRouter, Route } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
    </div>
  </BrowserRouter>
);
export default App;
