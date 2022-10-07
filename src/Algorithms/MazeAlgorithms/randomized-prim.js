export function randomizedPrim(grid, startNode, finishNode) {
  startNode.isVisitedMaze = true;
  const neighborsAndWalls = [];

  getNeighborsAndWalls(startNode, grid).forEach((neighbor) =>
    neighborsAndWalls.push(neighbor)
  );

  while (neighborsAndWalls.length > 0) {
    const randomInt = Math.floor(Math.random() * neighborsAndWalls.length);
    const { neighbor, wall } = neighborsAndWalls[randomInt] || {
      neighbor: false,
      wall: false,
    };
    if (wall && neighbor && !neighbor.isVisitedMaze) {
      neighbor.isVisitedMaze = true;
      wall.isWall = false;
      neighbor.isWall = false;

      const checkNeighbors = getNeighborsAndWalls(neighbor, grid);

      if (checkNeighbors.length > 0) {
        checkNeighbors.forEach((neighbor) => {
          if (!neighbor.neighbor.isVisitedMaze)
            neighborsAndWalls.push(neighbor);
        });
      }
    }

    neighborsAndWalls.splice(randomInt, 1);
  }

  return grid;
}

function getNeighborsAndWalls(node, grid) {
  const neighborsAndWalls = [];

  const numRows = grid.length;
  const numCols = grid[0].length;
  const { col, row } = node;

  if (row > 2 && col > 1) {
    if (row % 2 === 1) {
      neighborsAndWalls.push({
        neighbor: grid[row - 2][col - 1],
        wall: grid[row - 1][col],
      });
    } else if (row % 2 === 0) {
      neighborsAndWalls.push({
        neighbor: grid[row - 2][col - 1],
        wall: grid[row - 1][col - 1],
      });
    }
  }

  if (row > 2 && col < numCols - 2) {
    if (row % 2 === 1) {
      neighborsAndWalls.push({
        neighbor: grid[row - 2][col + 1],
        wall: grid[row - 1][col + 1],
      });
    } else if (row % 2 === 0) {
      neighborsAndWalls.push({
        neighbor: grid[row - 2][col + 1],
        wall: grid[row - 1][col],
      });
    }
  }

  if (row < numRows - 3 && col < numCols - 2) {
    if (row % 2 === 1) {
      neighborsAndWalls.push({
        neighbor: grid[row + 2][col + 1],
        wall: grid[row + 1][col + 1],
      });
    } else if (row % 2 === 0) {
      neighborsAndWalls.push({
        neighbor: grid[row + 2][col + 1],
        wall: grid[row + 1][col],
      });
    }
  }

  if (row < numRows - 3 && col > 1) {
    if (row % 2 === 1) {
      neighborsAndWalls.push({
        neighbor: grid[row + 2][col - 1],
        wall: grid[row + 1][col],
      });
    } else if (row % 2 === 0) {
      neighborsAndWalls.push({
        neighbor: grid[row + 2][col - 1],
        wall: grid[row + 1][col - 1],
      });
    }
  }

  if (row > 0 && col > 2) {
    neighborsAndWalls.push({
      neighbor: grid[row][col - 2],
      wall: grid[row][col - 1],
    });
  }
  if (row < numRows - 1 && col < numCols - 3) {
    neighborsAndWalls.push({
      neighbor: grid[row][col + 2],
      wall: grid[row][col + 1],
    });
  }

  const newNeighbors = neighborsAndWalls.filter(
    (neighbor) => !neighbor.neighbor.isVisitedMaze
  );
  if (newNeighbors.length > 0) return newNeighbors;
  return [];
}
