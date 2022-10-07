import React from "react";
import "../Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleMenu,
  toggleSelectorMenu,
  setActiveMenu,
} from "../../redux/navBarReducer";
import DropdownMenu from "./DropdownMenu";
import NodeIcon from "../NodeIcon";
const Selector = (props) => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.menu.SelectorMenuStatus);
  const activeHex = useSelector((state) => state.menu.hex);

  return (
    <li className="nav-selector">
      <a
        href="#"
        className="nav-selector-button"
        onClick={() => {
          dispatch(setActiveMenu("main"));
          dispatch(toggleSelectorMenu(!open));
          dispatch(toggleMenu(false));
        }}
      >
        <span className="nav-selector-text-left">Now Placing:</span>
        <span className="nav-selector-icon-right">
          {activeHex === "wall" ? (
            <NodeIcon extraClassName="node-wall-icon" />
          ) : activeHex === "weight" ? (
            <NodeIcon extraClassName="node-weight-icon" />
          ) : activeHex === "start" ? (
            <NodeIcon extraClassName="node-start-icon" />
          ) : activeHex === "finish" ? (
            <NodeIcon extraClassName="node-finish-icon" />
          ) : (
            ""
          )}
        </span>
      </a>
      {open ? (
        <DropdownMenu
          wallIcon={<NodeIcon extraClassName="node-wall-icon" />}
          startIcon={<NodeIcon extraClassName="node-start-icon" />}
          finishIcon={<NodeIcon extraClassName="node-finish-icon" />}
          weightIcon={<NodeIcon extraClassName="node-weight-icon" />}
          menuType="selector"
        />
      ) : (
        ""
      )}
    </li>
  );
};

export default Selector;
