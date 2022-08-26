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
}) => {
  const nodes = useSelector((state) => state.grid);

  let extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? `node-wall`
    : ``;

  return (
    <div className="node-container">
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      >
        {nodes[row][col].distance === Infinity ? "" : nodes[row][col].distance}
      </div>
    </div>
  );
};

export default Node;
