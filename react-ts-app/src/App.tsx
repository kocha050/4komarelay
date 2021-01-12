import React from "react";
import "./App.css";
import Login from "./componet/Login";
import Home from "./componet/Home";
<<<<<<< HEAD
import Post from "./componet/Post";
=======
import Registration from "./componet/Registration";

>>>>>>> db7b2f2517c492e983ad6b9494219ba9e3ae32c2
import { BrowserRouter, Route } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
<<<<<<< HEAD
      <Route path="/post" component={Post}/>
=======
      <Route path="/Registration" component={Registration} />
>>>>>>> db7b2f2517c492e983ad6b9494219ba9e3ae32c2
    </div>
  </BrowserRouter>
);
export default App;
