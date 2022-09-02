import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { CSSTransition } from "react-transition-group";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import DropdownItem from "./DropDownItem.js";
import { setAlgorithim, setHex } from "../redux/navBarReducer";
function DropdownMenu(props) {
  const activeMenu = useSelector((state) => state.menu.ActiveSettingsMenu);
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  if (props.menuType === "settings") {
    return (
      <div
        className="dropdown"
        style={{ height: menuHeight }}
        ref={dropdownRef}
      >
        <CSSTransition
          in={activeMenu === "main"}
          unmountOnExit
          timeout={500}
          classNames="menu-primary"
          onEnter={calcHeight}
        >
          <div className="menu">
            <DropdownItem rightIcon=">" goToMenu="algorithms">
              Pathfinding Algorithm
            </DropdownItem>
            <DropdownItem rightIcon=">">Maze Generator</DropdownItem>
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
            <DropdownItem goToMenu="main" leftIcon={<ArrowBackIcon />}>
              {" "}
              Algorithms & Mazes
            </DropdownItem>
            <DropdownItem
              dropDownFunction={setAlgorithim}
              algo="astar"
              goToMenu="main"
            >
              A* Search
            </DropdownItem>
            <DropdownItem
              dropDownFunction={setAlgorithim}
              algo="dijkstra"
              goToMenu="main"
            >
              Dijkstra's
            </DropdownItem>
            <DropdownItem
              dropDownFunction={setAlgorithim}
              algo="breadthFirstSearch"
              goToMenu="main"
            >
              Breadth First Search
            </DropdownItem>
          </div>
        </CSSTransition>
      </div>
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
          <DropdownItem
            hex="wall"
            dropDownFunction={setHex}
            rightIcon={props.wallIcon}
          >
            Walls
          </DropdownItem>
          <DropdownItem
            hex="weight"
            dropDownFunction={setHex}
            rightIcon={props.weightIcon}
          >
            Weights
          </DropdownItem>
          <DropdownItem
            hex="start"
            dropDownFunction={setHex}
            rightIcon={props.startIcon}
          >
            Start
          </DropdownItem>
          <DropdownItem
            hex="finish"
            dropDownFunction={setHex}
            rightIcon={props.finishIcon}
          >
            Finish
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default DropdownMenu;
