import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Node from "./Node/Node.js";
import { setGrid, setStartOrFinish } from "./redux/gridReducer";
import "./PathFindingVisualizer.css";
import Navbar from "./Navbar/Navbar.js";
import useVisualizeAlgo from "./hooks/useVisualizeAlgo.js";
import useVisualizeGraph from "./hooks/useGraph.js";
import Modal from "./Modal/Modal.js";
import {
  toggleMenu,
  toggleSelectorMenu,
  toggleHelpSetAlgo,
} from "./redux/navBarReducer.js";
const PathFindingVisualizer = () => {
  const dispatch = useDispatch();
  const activeAnimation = useSelector((state) => state.menu.animation);

  const { nodes, startNode, endNode } = useVisualizeAlgo();

  const {
    getNewGridWithWallToggled,
    getNewGridWithWeightToggled,
    getNewGridWithNewStartOrFinishChanged,
    hex,
  } = useVisualizeGraph();

  const [click, setClick] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    dispatch(setGrid());
  }, []);

  function handleMouseDown(row, col) {
    if (hex === "wall") {
      const newGrid = getNewGridWithWallToggled(nodes, row, col);
      dispatch(setGrid(newGrid));
    } else if (hex === "weight") {
      const newGrid = getNewGridWithWeightToggled(nodes, row, col);
      dispatch(setGrid(newGrid));
    } else if (hex === "start") {
      const newGrid = getNewGridWithNewStartOrFinishChanged(
        nodes,
        row,
        col,
        startNode,
        hex
      );
      dispatch(setStartOrFinish(row, col, hex));
      dispatch(setGrid(newGrid));
    } else if (hex === "finish") {
      const newGrid = getNewGridWithNewStartOrFinishChanged(
        nodes,
        row,
        col,
        endNode,
        hex
      );
      dispatch(setStartOrFinish(row, col, hex));
      dispatch(setGrid(newGrid));
    }
    setClick(true);
  }

  function handleMouseUp() {
    setClick(false);
  }

  function handleMouseEnter(row, col) {
    if (click === false) return;
    if (hex === "wall") {
      const newGrid = getNewGridWithWallToggled(nodes, row, col);
      dispatch(setGrid(newGrid));
    } else if (hex === "weight") {
      const newGrid = getNewGridWithWeightToggled(nodes, row, col);
      dispatch(setGrid(newGrid));
    }
  }

  function handleToggleModal(bool) {
    setModalActive(bool);
  }

  return nodes !== undefined ? (
    <>
      {modalActive ? <Modal onToggleModal={handleToggleModal} /> : ""}
      <Navbar className="navbar" onToggleModal={handleToggleModal}></Navbar>
      <div
        className="main"
        onClick={() => {
          dispatch(toggleMenu(false));
          dispatch(toggleSelectorMenu(false));
        }}
      >
        <div className="background-logo">PATHFINDER</div>
        <div className="error-message-hidden">
          Select a Pathfinding Algorithm!
        </div>
        <div className="grid">
          {nodes.map((row, rowIdx) => {
            return (
              <div className="row" key={rowIdx}>
                {row.map((node, colIdx) => {
                  const {
                    col,
                    row,
                    isStart,
                    isFinish,
                    isWall,
                    key,
                    id,
                    distance,
                    isWeight,
                  } = node;
                  return (
                    <Node
                      isWeight={isWeight}
                      distance={distance}
                      id={id}
                      row={row}
                      col={col}
                      key={key}
                      isStart={isStart}
                      isFinish={isFinish}
                      isWall={isWall}
                      onMouseDown={(row, col) =>
                        !activeAnimation && handleMouseDown(row, col)
                      }
                      onMouseUp={handleMouseUp}
                      onMouseEnter={(row, col) =>
                        !activeAnimation && handleMouseEnter(row, col)
                      }
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  ) : (
    <div className="loading">loading</div>
  );
};

export default PathFindingVisualizer;
