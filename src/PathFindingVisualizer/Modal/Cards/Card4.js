import React from "react";
import selectorIMG from "../Card-Images/selectorIMG.png";
const Card4 = (props) => {
  return (
    <>
      <h1>Placing additional hexes</h1>
      <h3>
        {" "}
        You may also change the position of the start/finish hexes, as well as
        place weights by changing the hex type in the "Now Placing" tab.
      </h3>
      <h6 className="mini-text">
        *Weight hexes take 8x as long to traverse through
      </h6>
      <p>
        <img src={selectorIMG} />
      </p>
    </>
  );
};

export default Card4;
