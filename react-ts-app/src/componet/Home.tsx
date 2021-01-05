import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div>
      <div>
        <Navbar />
        <p>
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
