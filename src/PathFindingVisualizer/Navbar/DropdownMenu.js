import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { CSSTransition } from "react-transition-group";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toggleMenu } from "../redux/navBarReducer";
import { useDispatch } from "react-redux";
import { setAlgorithim } from "../redux/navBarReducer";

function DropdownMenu(props) {
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  // useEffect(() => {
  //   const closeDropDown = (e) => {
  //     console.log(e);
  //     if (
  //       e.target !== props.navItemRef.current &&
  //       e.target !== props.iconRef.current &&
  //       e.target !== props.iconBtnRef.current &&
  //       e.target !== dropdownRef.current
  //     ) {
  //       dispatch(toggleMenu(false));
  //     }
  //   };
  //   document.body.addEventListener("click", closeDropDown);

  //   return () => document.body.removeEventListener("click", closeDropDown);
  // }, []);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => {
          props.goToMenu && setActiveMenu(props.goToMenu);
          props.algo && dispatch(setAlgorithim(props.algo));
        }}
      >
        {props.leftIcon ? (
          <span
            className="icon-button"
            onClick={() => setActiveMenu(props.goToMenu)}
          >
            {props.leftIcon}
          </span>
        ) : (
          ""
        )}
        {props.children}
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="algorithms">
            Pathfinding Algorithm
          </DropdownItem>
          <DropdownItem>Maze Generator</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "algorithms"}
        unmountOnExit
        timeout={500}
        classNames="menu-algorithm"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem
            goToMenu="main"
            leftIcon={<ArrowBackIcon />}
          ></DropdownItem>
          <DropdownItem algo="astar" goToMenu="main">
            A* Search
          </DropdownItem>
          <DropdownItem algo="djikstra" goToMenu="main">
            Dijkstra's
          </DropdownItem>
          <DropdownItem algo="breadthFirstSearch" goToMenu="main">
            Breadth First Search
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default DropdownMenu;
