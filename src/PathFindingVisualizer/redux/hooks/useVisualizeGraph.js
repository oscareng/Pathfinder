export default function useVisualizeGraph() {
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

  function clearBoard() {
    const matches = document.querySelectorAll(
      "div.node-wall, div.node-shortest-path, div.node-visited"
    );
    matches.forEach((node) => {
      if (node.id === "node-10-15") {
        node.classList.add("node-start");
      } else if (node.id === "node-10-35") {
        node.classList.add("node-finish");
      }
      node.classList.remove("node-wall", "node-shortest-path", "node-visited");
    });
  }

  return { getNewGridWithWallToggled, getNewGridWithWeightToggled, clearBoard };
}
