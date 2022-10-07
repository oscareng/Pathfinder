import React from "react";
import algorithmIMG from "../Card-Images/algorithmIMG.png";
const Card5 = (props) => {
  return (
    <>
      <h1>Selecting a pathfinding algorithm</h1>
      <h3>
        {" "}
        Navigate back to the settings menu and select "Pathfinding Algorithm".
        Select an algorithm and press the play button. Once the animation has
        finished, select the refresh button in the navbar to restart.
      </h3>
      <br />
      <p>
        <img src={algorithmIMG} width="240" height="245" />
      </p>
    </>
  );
};

export default Card5;
