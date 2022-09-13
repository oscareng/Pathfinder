export function recursiveBackTrackerMaze(grid, startNode, finishNode) {
  const stack = [startNode];
  const visitedNodesInOrder = [];
  startNode.isVisitedMaze = true;

  while (stack.length) {
    const current = stack.pop();
    current.isVisitedMaze = true;
    visitedNodesInOrder.push(current);
    const { next, wall } = getRandomNeighbor(current, grid);
    if (next) {
      next.isVisitedMaze = true;
      wall.isWall = false;
      stack.push(next);
    }
  }
  return visitedNodesInOrder;
}

function getRandomNeighbor(node, grid) {
  const neighbors = [];
  const wallToNeighbor = [];
  const numRows = grid.length;
  const numCols = grid[0].length;
  const { col, row } = node;

  if (row > 2 && col > 1) {
    neighbors.push(grid[row - 2][col - 1]);
    if (row % 2 === 1) {
      wallToNeighbor.push(grid[row - 1][col]);
    } else if (row % 2 === 0) {
      wallToNeighbor.push(grid[row - 1][col - 1]);
    }
  }
  if (row > 2 && col < numCols - 2) {
    neighbors.push(grid[row - 2][col + 1]);
    if (row % 2 === 1) {
      wallToNeighbor.push(grid[row - 1][col + 1]);
    } else if (row % 2 === 0) {
      wallToNeighbor.push(grid[row - 1][col]);
    }
  }
  if (row < numRows - 3 && col < numCols - 2) {
    neighbors.push(grid[row + 2][col + 1]);
    if (row % 2 === 1) {
      wallToNeighbor.push(grid[row + 1][col + 1]);
    } else if (row % 2 === 0) {
      wallToNeighbor.push(grid[row + 1][col]);
    }
  }
  if (row < numRows - 3 && col > 1) {
    neighbors.push(grid[row + 2][col - 1]);
    if (row % 2 === 1) {
      wallToNeighbor.push(grid[row + 1][col]);
    } else if (row % 2 === 0) {
      wallToNeighbor.push(grid[row + 1][col - 1]);
    }
  }
  if (row > 0 && col > 2) {
    neighbors.push(grid[row][col - 2]);
    wallToNeighbor.push(grid[row][col - 1]);
  }
  if (row < numRows - 1 && col < numCols - 3) {
    neighbors.push(grid[row][col + 2]);
    wallToNeighbor.push(grid[row][col + 1]);
  }

  //   const newNeighbors = neighbors.filter((neighbor) => !neighbor.isVisitedMaze);

  for (let i = 0; i < neighbors.length; i++) {
    let currentNeighbor = neighbors[i];
    if (currentNeighbor.isVisitedMaze === true) {
      neighbors.splice(i, 1);
      wallToNeighbor.splice(i, 1);
    }
  }
  if (neighbors.length > 0) {
    let randomVal = Math.floor(Math.random() * (neighbors.length - 0) + 0);
    return { next: neighbors[randomVal], wall: wallToNeighbor[randomVal] };
  }
}
