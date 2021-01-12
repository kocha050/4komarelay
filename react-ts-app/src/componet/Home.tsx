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
<<<<<<< HEAD
        <div>
          <Grid container>
            <Grid item xs={3}>
              <ScrollCompornent />
            </Grid>
            <Grid item xs={3}>
              <ScrollCompornent />
            </Grid>
            <Grid item xs={3}>
              <ScrollCompornent />
            </Grid>
            <Grid item xs={3}>
              <ScrollCompornent />
            </Grid>
          </Grid>
        </div>
=======
        <Scroll/>
        <p>
          <Link to="/login">Login</Link>
        </p>
>>>>>>> db7b2f2517c492e983ad6b9494219ba9e3ae32c2
      </div>
    </div>
  );
};

export default Home;
