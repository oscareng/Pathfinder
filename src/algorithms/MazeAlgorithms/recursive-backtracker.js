export function recursiveBackTrackerMaze(grid, startNode, finishNode) {
  const stack = [startNode];
  const visitedNodesInOrder = [];
  startNode.isVisitedMaze = true;

  while (stack.length) {
    const current = stack.pop();

    current.isVisitedMaze = true;
    visitedNodesInOrder.push(current);

    const { next, wall } = getRandomNeighbor(current, grid) || {
      next: false,
      wall: false,
    };

    if (next && wall) {
      stack.push(current);
      next.isVisitedMaze = true;
      next.isWall = false;
      wall.isWall = false;

      stack.push(next);
    }
  }
  //createSpaceAroundStart(grid, startNode);
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

  const newNeighbors = neighbors.slice();
  let neighborIdx = newNeighbors.length - 1;

  while (neighborIdx >= 0) {
    let currentNeighbor = newNeighbors[neighborIdx];

    if (currentNeighbor.isVisitedMaze === true) {
      newNeighbors.splice(neighborIdx, 1);
      wallToNeighbor.splice(neighborIdx, 1);
    }

    neighborIdx -= 1;
  }

  if (newNeighbors.length > 0) {
    let randomVal = Math.floor(Math.random() * (newNeighbors.length - 0) + 0);

    return { next: newNeighbors[randomVal], wall: wallToNeighbor[randomVal] };
  }
}

// function createSpaceAroundStart(grid, startNode) {
//   const spaces = [];
//   const walls = [];
//   const numRows = grid.length;
//   const numCols = grid[0].length;
//   const { col, row } = startNode;

//   //spaces around node
//   if (row > 0) spaces.push(grid[row - 1][col]);
//   if (row > 0 && row % 2 === 1 && col < grid[0].length - 1)
//     spaces.push(grid[row - 1][col + 1]);
//   if (row > 0 && row % 2 === 0 && col > 0) spaces.push(grid[row - 1][col - 1]);
//   if (row < grid.length - 1) spaces.push(grid[row + 1][col]);
//   if (row < grid.length - 1 && row % 2 === 1 && col < grid[0].length - 1)
//     spaces.push(grid[row + 1][col + 1]);
//   if (row < grid.length - 1 && row % 2 === 0 && col > 0)
//     spaces.push(grid[row + 1][col - 1]);
//   if (col > 0) spaces.push(grid[row][col - 1]);
//   if (col < grid[0].length - 1) spaces.push(grid[row][col + 1]);

//   //walls around nodes
//   if (row > 2 && col > 1) walls.push(grid[row - 2][col - 1]);
//   if (row > 2 && col < numCols - 2) walls.push([row - 2][col + 1]);
//   if (row < numRows - 3 && col < numCols - 2)
//     walls.push(grid[row + 2][col + 1]);
//   if (row < numRows - 3 && col > 1) walls.push(grid[row + 2][col - 1]);
//   if (row > 0 && col > 2) walls.push(grid[row][col - 2]);
//   if (row < numRows - 1 && col < numCols - 3) walls.push(grid[row][col + 2]);

//   for (const node of spaces) {
//     node.isWall = false;
//   }
//   for (const node of walls) {
//     node.isWall = false;
//   }
// }
