import React from "react";
import "./Navbar.css";
import Navitem from "./Navitem";

import { useRef } from "react";

const Navbar = (props) => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <Navitem></Navitem>
      </ul>
    </nav>
  );
};

export default Navbar;
