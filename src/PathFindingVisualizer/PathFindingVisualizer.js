import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Node from "./Node/Node.js";
import { setGrid, resetGrid } from "./redux/gridReducer";
import "./PathFindingVisualizer.css";
import Navbar from "./Navbar/Navbar.js";
import useVisualizeAlgo from "./redux/hooks/visualizeAlgo.js";
const PathFindingVisualizer = () => {
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.grid);
  const {
    getNewGridWithWallToggled,
    clearBoard,
    getNodesInShortestPathOrder,
    sortAlgorithms,
  } = useVisualizeAlgo();
  const [click, setClick] = useState(false);

  useEffect(() => {
    dispatch(setGrid());
  }, []);

  function handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(nodes, row, col);
    dispatch(setGrid(newGrid));
    setClick(true);
  }

  function handleMouseUp() {
    setClick(false);
  }

  function handleMouseEnter(row, col) {
    if (click === false) return;
    const newGrid = getNewGridWithWallToggled(nodes, row, col);
    dispatch(setGrid(newGrid));
  }

  return nodes !== undefined ? (
    <>
      <Navbar sortAlgorithms={sortAlgorithms}></Navbar>
      <div className="main">
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
                  } = node;
                  return (
                    <Node
                      distance={distance}
                      id={id}
                      row={row}
                      col={col}
                      key={key}
                      isStart={isStart}
                      isFinish={isFinish}
                      isWall={isWall}
                      onMouseDown={(row, col) => handleMouseDown(row, col)}
                      onMouseUp={handleMouseUp}
                      onMouseEnter={(row, col) => handleMouseEnter(row, col)}
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
