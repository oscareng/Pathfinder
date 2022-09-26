import React from "react";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleMenu,
  toggleSelectorMenu,
  setActiveMenu,
} from "../redux/navBarReducer";
import DropdownMenu from "./DropdownMenu";

const Selector = (props) => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.menu.SelectorMenuStatus);
  let activeHex = useSelector((state) => state.menu.hex);

  function NodeIcon(props) {
    let extraClassName = props.extraClassName;
    return (
      <div className="node-container">
        <div className={`selector-icon node ${extraClassName}`}></div>
      </div>
    );
  }

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
            <NodeIcon extraClassName="node-weight" />
          ) : activeHex === "start" ? (
            <NodeIcon extraClassName="node-start" />
          ) : activeHex === "finish" ? (
            <NodeIcon extraClassName="node-finish" />
          ) : (
            ""
          )}
        </span>
      </a>
      {open ? (
        <DropdownMenu
          wallIcon={<NodeIcon extraClassName="node-wall-icon" />}
          startIcon={<NodeIcon extraClassName="node-start" />}
          finishIcon={<NodeIcon extraClassName="node-finish" />}
          weightIcon={<NodeIcon extraClassName="node-weight" />}
          menuType="selector"
        />
      ) : (
        ""
      )}
    </li>
  );
};

export default Selector;
