import { useSelector } from "react-redux";

export default function useVisualizeGraph() {
  const startRow = useSelector((state) => state.grid.startRow);
  const startCol = useSelector((state) => state.grid.startCol);
  const finishRow = useSelector((state) => state.grid.finishRow);
  const finishCol = useSelector((state) => state.grid.finishCol);

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
      "div.node-wall, div.node-shortest-path, div.node-visited, div.node-weight"
    );
    matches.forEach((node) => {
      if (node.id === "node-10-15") {
        node.classList.add("node-start");
      } else if (node.id === "node-10-35") {
        node.classList.add("node-finish");
      }
      node.classList.remove(
        "node-wall",
        "node-shortest-path",
        "node-visited",
        "node-weight"
      );
    });
  }

  function createGridHelper() {
    const nodes = [];
    for (let row = 0; row <= 18; row++) {
      const currentRow = [];
      for (let col = 0; col <= 38; col++) {
        const currentNode = {
          id: `node-${row}-${col}`,
          col,
          row,
          isStart: row === startRow && col === startCol,
          isFinish: row === finishRow && col === finishCol,
          isWall: false,
          isVisited: false,
          distance: Infinity,
          distanceFromStart: Infinity,
          estimatedDistanceToEnd: Infinity,
          isWeighted: false,
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
    startRow,
    startCol,
    finishCol,
    finishRow,
    createGridHelper,
  };
}
