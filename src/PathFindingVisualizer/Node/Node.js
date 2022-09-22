import React from "react";
import { useSelector } from "react-redux";
import "./Node.css";

const Node = ({
  row,
  col,
  isStart,
  isFinish,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  distance,
  isWeight,
}) => {
  const nodes = useSelector((state) => state.grid.grid);

  let extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? `node-wall`
    : isWeight
    ? `node-weight`
    : ``;

  return (
    <div className="node-container">
      <div className="node-container-transparent">
        <div
          id={`node-${row}-${col}`}
          className={`node ${extraClassName}`}
          onMouseDown={() => onMouseDown(row, col)}
          onMouseEnter={() => onMouseEnter(row, col)}
          onMouseUp={() => onMouseUp()}
        >
          {/* {nodes[row][col].distance === Infinity ? "" : nodes[row][col].distance} */}
        </div>
      </div>
    </div>
  );
};

export default Node;
