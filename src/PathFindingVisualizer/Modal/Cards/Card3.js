import React from "react";
import settingsIMG from "../Card-Images/settingsIMG.png";
const Card3 = (props) => {
  return (
    <>
      <h1>How to start visualizing</h1>
      <h3>
        {" "}
        Click the settings icon in the navbar and select "Maze Generator", then
        choose a maze generating algorithm.
        <br />
        You may also add/remove walls by simply clicking on the hexes!
      </h3>
      <br />
      <p>
        <img src={settingsIMG} width="240" height="240" />
      </p>
    </>
  );
};

export default Card3;
