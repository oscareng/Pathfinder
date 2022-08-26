export function breadthFirstSearch(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const queue = [startNode];

  while (queue.length > 0) {
    const current = queue.shift();

    if (current.isWall) continue;
    if (current.isVisited) continue;
    if (current.distance === Infinity) return visitedNodesInOrder;

    current.isVisited = true;
    visitedNodesInOrder.push(current);

    if (current === finishNode) return visitedNodesInOrder;

    const unvisitedNeighbors = getUnvisitedNeighbors(current, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = current.distance + 1;
      neighbor.previousNode = current;
      queue.push(neighbor);
    }
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}
