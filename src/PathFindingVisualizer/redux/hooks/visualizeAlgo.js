export default function visualizeAlgo() {
  function getNewGridWithWallToggled(grid, row, col) {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = { ...node, isWall: !node.isWall };
    newGrid[row][col] = newNode;
    return newGrid;
  }
  function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== undefined) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }
  function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  function animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
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

  return {
    getNewGridWithWallToggled,
    animateDijkstra,
    animateShortestPath,
    getNodesInShortestPathOrder,
    clearBoard,
  };
}
