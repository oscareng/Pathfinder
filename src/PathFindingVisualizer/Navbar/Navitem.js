import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Navbar.css";
import { toggleMenu, toggleSelectorMenu } from "../redux/navBarReducer";
import DropdownMenu from "./DropdownMenu";

function Navitem(props) {
  const openSettings = useSelector((state) => state.menu.SettingsMenuStatus);
  const dispatch = useDispatch();
  const btnFunction = props.function;

  let extraClassName = openSettings ? "icon-button-active" : "";

  if (props.dropdown === true) {
    return (
      <li className="nav-item">
        <a
          href="#"
          className={`icon-button ${extraClassName}`}
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
        className="icon-button"
        onClick={() => {
          btnFunction();
        }}
      >
        {props.icon}
      </a>
    </li>
  );
}
export default Navitem;
