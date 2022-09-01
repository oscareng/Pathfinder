import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Navbar.css";
import { toggleMenu } from "../redux/navBarReducer";
import DropdownMenu from "./DropdownMenu";

function Navitem(props) {
  const open = useSelector((state) => state.menu.status);
  const dispatch = useDispatch();
  const btnFunction = props.function;

  if (props.dropdown === true) {
    return (
      <li className="nav-item">
        <a
          href="#"
          className="icon-button"
          onClick={() => {
            dispatch(toggleMenu(!open));
          }}
        >
          {props.icon}
        </a>
        {open ? <DropdownMenu /> : ""}
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
