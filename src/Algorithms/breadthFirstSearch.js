export function breadthFirstSearch(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const queue = [startNode];
  startNode.isVisited = true;

  while (queue.length > 0) {
    const current = queue.shift();

    if (current.isWall) continue;
    if (current.distance === Infinity) return visitedNodesInOrder;

    current.isVisited = true;
    visitedNodesInOrder.push(current);

    if (current === finishNode) return visitedNodesInOrder;

    const unvisitedNeighbors = getUnvisitedNeighbors(current, grid);
    for (const neighbor of unvisitedNeighbors) {
      if (neighbor.isVisited) continue;
      neighbor.isVisited = true;
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
  if (row > 0 && row % 2 === 1 && col < grid[0].length - 1) {
    grid[row - 1][col + 1].diagonal = true;
    neighbors.push(grid[row - 1][col + 1]);
  }
  if (row > 0 && row % 2 === 0 && col > 0) {
    grid[row - 1][col - 1].diagonal = true;
    neighbors.push(grid[row - 1][col - 1]);
  }
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (row < grid.length - 1 && row % 2 === 1 && col < grid[0].length - 1) {
    grid[row + 1][col + 1].diagonal = true;
    neighbors.push(grid[row + 1][col + 1]);
  }
  if (row < grid.length - 1 && row % 2 === 0 && col > 0) {
    grid[row + 1][col - 1].diagonal = true;
    neighbors.push(grid[row + 1][col - 1]);
  }
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}
