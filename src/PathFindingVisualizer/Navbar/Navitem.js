import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Navbar.css";
import { toggleMenu } from "../redux/navBarReducer";
import DropdownMenu from "./DropdownMenu";
import FunctionsIcon from "@mui/icons-material/Functions";

function Navitem(props) {
  const open = useSelector((state) => state.menu.status);
  const dispatch = useDispatch();
  // const iconRef = useRef(null);
  // const iconBtnRef = useRef(null);
  // const navItemRef = useRef(null);

  return (
    <li className="nav-item">
      <a
        href="#"
        className="icon-button"
        onClick={() => dispatch(toggleMenu(!open))}
      >
        <FunctionsIcon />
      </a>

      {open ? (
        <DropdownMenu
        // iconBtnRef={iconBtnRef}
        // navItemRef={navItemRef}
        // iconRef={iconRef}
        />
      ) : (
        ""
      )}
    </li>
  );
}
export default Navitem;
