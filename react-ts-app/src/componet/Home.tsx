import classes from "*.module.css";
import { Grid, Button, Paper } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Scroll from "./Scroll";

///
import ScrollCompornent from "./ScrollComponent";
///

const Home = () => {
  return (
    <div>
      <div>     
        <Navbar />
        <Scroll/>
        <p>
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
