import React from "react";

import logo from "../assets/mountain.svg";

const Hero = () => (
  <div className="text-center hero my-5">
    <img className="mb-3 app-logo" src={logo} alt="mountain logo" width="140"/>
        <h1 className="mb-4">Participate in a Lottery to Climb K2 in 2025!</h1>

    <p className="lead">
            1. Log In
            <br></br>
            2. Enter all relevant information
            <br></br>
            3.Wait
            <br></br>
            4. Climb K2!

    </p>
    <p className="lead">
        Registration Closes Nov 1st
    </p>
  </div>
);

export default Hero;
