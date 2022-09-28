import React from "react";
import "./Navbar.css";
import Navitem from "./Navitem";
import SettingsIcon from "@mui/icons-material/Settings";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import HelpIcon from "@mui/icons-material/Help";
import useVisualizeAlgo from "../redux/hooks/visualizeAlgo";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import useVisualizeGraph from "../redux/hooks/useGraph";
import Selector from "./Selector.js";
import NodeIcon from "./NodeIcon";

const Navbar = (props) => {
  const { sortAlgorithms } = useVisualizeAlgo();
  const { clearBoard } = useVisualizeGraph();

  return (
    <nav className="navbar">
      <div className="logo">
        <div className="logo-nodes">
          <NodeIcon extraClassName="logo-node logo-node-top" />

          <div className="logo-nodes-bottom">
            <NodeIcon extraClassName="logo-node" />
            <NodeIcon extraClassName="logo-node" />
          </div>
        </div>
        Pathfinder
        <HelpIcon className="help-button" />
      </div>

      <ul className="navbar-nav">
        <Selector></Selector>
        <Navitem
          function={sortAlgorithms}
          icon={<PlayArrowIcon />}
          dropdown={false}
        ></Navitem>
        <Navitem icon={<SettingsIcon />} dropdown={true}></Navitem>
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
