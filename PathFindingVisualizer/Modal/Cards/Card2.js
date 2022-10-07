import React from "react";
import NodeIcon from "../../Navbar/NodeIcon";

const Card2 = (props) => {
  return (
    <>
      <h1>What is a pathfinding algorithm and how is it visualized?</h1>
      <h3>
        Simply put, a pathfinding algorithm is a way to find the shortest
        distance between two nodes. This project has adapted this process to fit
        a hexagonal graph and visualizes it through changes in each hex's color.
      </h3>

      <div className="node-key-container">
        <p align="left">
          {" "}
          <NodeIcon extraClassName="node-next" />
          &nbsp; Next
          <br />
          <NodeIcon extraClassName="node-visited-icon" />
          &nbsp; Visited
          <br />
          <NodeIcon extraClassName="node-shortest-path-icon" />
          &nbsp; Shortest Path
        </p>
      </div>
    </>
  );
};

export default Card2;
