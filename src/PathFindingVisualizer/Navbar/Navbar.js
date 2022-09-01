import React from "react";
import "./Navbar.css";
import Navitem from "./Navitem";
import Playbutton from "./PlayButton";
import FunctionsIcon from "@mui/icons-material/Functions";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import useVisualizeAlgo from "../redux/hooks/visualizeAlgo";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
const Navbar = (props) => {
  const { sortAlgorithms, clearBoard } = useVisualizeAlgo();
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <Navitem
          function={sortAlgorithms}
          icon={<PlayArrowIcon />}
          dropdown={false}
        ></Navitem>
        <Navitem icon={<FunctionsIcon />} dropdown={true}></Navitem>
        <Navitem
          function={clearBoard}
          icon={<RestartAltIcon />}
          dropdown={false}
        ></Navitem>
      </ul>
    </nav>
  );
};

export default Navbar;
