import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Navbar.css";
import { toggleMenu, toggleSelectorMenu } from "../redux/navBarReducer";
import DropdownMenu from "./DropdownMenus/DropdownMenu";

function Navitem(props) {
  const openSettings = useSelector((state) => state.menu.SettingsMenuStatus);
  const dispatch = useDispatch();
  const btnFunction = props.function;
  const animationActive = useSelector((state) => state.menu.animation);
  let extraClassName = openSettings ? "icon-button-active" : "";

  if (props.dropdown === true) {
    return (
      <li className="nav-item">
        <a
          href="#"
          className={`icon-button ${extraClassName} `}
          onClick={() => {
            dispatch(toggleMenu(!openSettings));
            dispatch(toggleSelectorMenu(false));
          }}
        >
          {props.icon}
        </a>
        {openSettings ? <DropdownMenu menuType="settings" /> : ""}
      </li>
    );
  }
  return (
    <li className="nav-item">
      <a
        href="#"
        className={`icon-button `}
        onClick={() => {
          !animationActive && btnFunction();
        }}
      >
        {props.icon}
      </a>
    </li>
  );
}
export default Navitem;
