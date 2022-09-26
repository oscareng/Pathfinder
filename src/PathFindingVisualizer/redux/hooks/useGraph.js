import { useDispatch } from "react-redux";
import { setGrid, setStartOrFinish } from "../gridReducer";
import { setAlgorithim, setMaze } from "../navBarReducer";
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
      oldNode = { ...oldPosition, isStart: false };
      newNode = { ...newPosition, isStart: true };
    } else if (hex === "finish") {
      oldNode = { ...oldPosition, isFinish: false };
      newNode = { ...newPosition, isFinish: true };
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
    dispatch(setMaze("none"));
    dispatch(setAlgorithim("none"));

    const start = document.getElementById("node-9-10");
    const finish = document.getElementById("node-9-28");

    start.classList.add("node-start");
    finish.classList.add("node-finish");
  }

  return {
    getNewGridWithWallToggled,
    getNewGridWithWeightToggled,
    getNewGridWithNewStartOrFinishChanged,
    clearBoard,
    getNewGridWithAllWallsToggled,
    hex,
  };
}
