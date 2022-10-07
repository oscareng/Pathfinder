import React from "react";
import mazePNG from "../Card-Images/mazePNG.png";
import LazyLoad from "react-lazy-load";
const Card1 = (props) => {
  return (
    <>
      <h1>Welcome to Pathfinder!</h1>
      <h3>
        {" "}
        This application aims to create fun and colorful visualizations of
        pathfinding and maze generating algorithms.
      </h3>
      <p>
        The following pages provide a quick walkthrough of the application.
        Alternatively, click exit to take a look for yourself!
        <br />
        <br />
        <img src={mazePNG} height="250" width="650"></img>
      </p>{" "}
    </>
  );
};

export default Card1;
