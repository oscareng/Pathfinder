import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import "../Navbar.css";
import { CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";
import DropdownItem from "./DropDownItem.js";
import { setAlgorithim, setHex } from "../../redux/navBarReducer";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import useVisualizeAlgo from "../../hooks/useVisualizeAlgo";
import useVisualizeGraph from "../../hooks/useGraph";
import { toggleMenu } from "../../redux/navBarReducer";
function DropdownMenu(props) {
  const dispatch = useDispatch();
  const activeMenu = useSelector((state) => state.menu.ActiveSettingsMenu);
  const [menuHeight, setMenuHeight] = useState(null);
  const { visualizePrim, visualizeRecursiveDFSMaze } = useVisualizeAlgo();
  const dropdownRef = useRef(null);
  const animationActive = useSelector((state) => state.menu.animation);
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
            <DropdownItem
              rightIcon={<ArrowForwardIosIcon className="svg-icon-settings" />}
              goToMenu="mazes"
            >
              Maze Generator
            </DropdownItem>
            <DropdownItem
              rightIcon={<ArrowForwardIosIcon className="svg-icon-settings" />}
              goToMenu="algorithms"
            >
              Pathfinding Algorithm
            </DropdownItem>
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
              leftIcon={<ArrowForwardIosIcon className="svg-icon-settings2" />}
            >
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
          </div>
        </CSSTransition>
        <CSSTransition
          in={activeMenu === "mazes"}
          unmountOnExit
          timeout={500}
          classNames="menu-algorithm"
          onEnter={calcHeight}
        >
          <div>
            <DropdownItem
              goToMenu="main"
              leftIcon={<ArrowForwardIosIcon className="svg-icon-settings2" />}
            >
              {" "}
              Algorithms & Mazes
            </DropdownItem>
            <DropdownItem
              goToMenu="main"
              maze="DFS"
              dropDownFunction={() => {
                dispatch(toggleMenu(false));
                !animationActive && visualizeRecursiveDFSMaze();
              }}
            >
              Randomized DFS Maze
            </DropdownItem>
            <DropdownItem
              goToMenu="main"
              maze="prim"
              dropDownFunction={() => {
                dispatch(toggleMenu(false));
                !animationActive && visualizePrim();
              }}
            >
              Randomized Prim Maze
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
