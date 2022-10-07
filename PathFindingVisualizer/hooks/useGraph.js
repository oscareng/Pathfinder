import { useDispatch } from "react-redux";
import { setGrid, setStartOrFinish } from "../redux/gridReducer";
import { setAlgorithim } from "../redux/navBarReducer";
import { useSelector } from "react-redux";
export default function useVisualizeGraph() {
  const dispatch = useDispatch();
  const hex = useSelector((state) => state.menu.hex);

  function getNewGridWithWallToggled(grid, row, col) {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = { ...node, isWall: !node.isWall };
    newGrid[row][col] = newNode;
    return newGrid;
  }

  function getNewGridWithWeightToggled(grid, row, col) {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = { ...node, isWeight: !node.isWeight };
    newGrid[row][col] = newNode;
    return newGrid;
  }

  function getNewGridWithAllWallsToggled(grid) {
    const newGrid = grid.slice();
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[i].length; j++) {
        let node = newGrid[i][j];
        if (!node.isStart && !node.isFinish) node.isWall = true;
      }
    }
    return newGrid;
  }

  function getNewGridWithNewStartOrFinishChanged(
    grid,
    newRow,
    newCol,
    node,
    hex
  ) {
    const newGrid = grid.slice();

    const oldRow = node.row;
    const oldCol = node.col;

    const oldPosition = newGrid[oldRow][oldCol];
    const newPosition = newGrid[newRow][newCol];

    let oldNode, newNode;

    if (hex === "start") {
      oldNode = { ...oldPosition, isStart: false, isWall: false };
      newNode = { ...newPosition, isStart: true, isWall: false };
    } else if (hex === "finish") {
      oldNode = { ...oldPosition, isFinish: false, isWall: false };
      newNode = { ...newPosition, isFinish: true, isWall: false };
    }

    newGrid[oldRow][oldCol] = oldNode;
    newGrid[newRow][newCol] = newNode;
    return newGrid;
  }

  function clearBoard() {
    const matches = document.querySelectorAll(
      "div.node-wall, div.node-shortest-path, div.node-visited, div.node-weight, div.node-start, div.node-finish div.node-visited-wall"
    );
    matches.forEach((node) => {
      node.classList.remove(
        "node-wall",
        "node-visited-wall",
        "node-shortest-path",
        "node-visited",
        "node-weight",
        "node-start",
        "node-finish"
      );
    });

    dispatch(setGrid());
    dispatch(setStartOrFinish(9, 10, "start"));
    dispatch(setStartOrFinish(9, 28, "finish"));

    const start = document.getElementById("node-9-10");
    const finish = document.getElementById("node-9-28");

    start.classList.add("node-start");
    finish.classList.add("node-finish");
  }

  function createGridHelper() {
    const START_NODE_ROW = 9;
    const START_NODE_COL = 10;
    const FINISH_NODE_ROW = 9;
    const FINISH_NODE_COL = 28;
    const nodes = [];
    for (let row = 0; row <= 18; row++) {
      const currentRow = [];
      for (let col = 0; col <= 38; col++) {
        const currentNode = {
          id: `node-${row}-${col}`,
          col,
          row,
          isStart: row === START_NODE_ROW && col === START_NODE_COL,
          isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
          isWall: false,
          isVisited: false,
          distance: Infinity,
          distanceFromStart: Infinity,
          estimatedDistanceToEnd: Infinity,
          isWeighted: false,
          isVisitedMaze: false,
        };

        currentRow.push(currentNode);
      }
      nodes.push(currentRow);
    }
    return nodes;
  }

  return {
    getNewGridWithWallToggled,
    getNewGridWithWeightToggled,
    getNewGridWithNewStartOrFinishChanged,
    clearBoard,
    getNewGridWithAllWallsToggled,
    hex,
    createGridHelper,
  };
}
