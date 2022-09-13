import { dijkstra } from "../../../algorithms/dijkstra";
import { breadthFirstSearch } from "../../../algorithms/breadthFirstSearch.js";
import { aStar } from "../../../algorithms/astar.js";
import { useDispatch } from "react-redux";
import { setGrid } from "../gridReducer";
import { useSelector } from "react-redux";
import { recursiveBackTrackerMaze } from "../../../algorithms/MazeAlgorithms/recursive-backtracker";
import useVisualizeGraph from "./useGraph";

export default function useVisualizeAlgo() {
  const { getNewGridWithAllWallsToggled } = useVisualizeGraph();
  const key = useSelector((state) => state.menu.algo);
  const nodes = useSelector((state) => state.grid.grid);

  const dispatch = useDispatch();

  const { row: startRow, col: startCol } = useSelector(
    (state) => state.grid.start
  );
  const { row: endRow, col: endCol } = useSelector(
    (state) => state.grid.finish
  );

  function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== undefined) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }

  // function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
  //   for (let i = 0; i <= visitedNodesInOrder.length; i++) {
  //     if (i === visitedNodesInOrder.length) {
  //       setTimeout(() => {
  //         animateShortestPath(nodesInShortestPathOrder);
  //       }, 10 * i);
  //       return;
  //     }
  //     setTimeout(() => {
  //       const node = visitedNodesInOrder[i];
  //       document.getElementById(`node-${node.row}-${node.col}`).className =
  //         "node node-visited";
  //     }, 10 * i);
  //   }
  // }

  function animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
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
      }, 1000 * i);
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

  function visualizeDjikstra() {
    const grid = nodes;
    const startNode = grid[startRow][startCol];
    const finishNode = grid[endRow][endCol];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    //set time out later
    const newGrid = grid.slice();
    dispatch(setGrid(newGrid));
  }

  function visualizeAStar() {
    const grid = nodes;
    const startNode = grid[startRow][startCol];
    const finishNode = grid[endRow][endCol];
    const visitedNodesInOrder = aStar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  function visualizeBreadthFirstSearch() {
    const grid = nodes;
    const startNode = grid[startRow][startCol];
    const finishNode = grid[endRow][endCol];
    const visitedNodesInOrder = breadthFirstSearch(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  function visualizeRecursiveDFSMaze() {
    const grid = getNewGridWithAllWallsToggled(nodes);
    const startNode = grid[startRow][startCol];
    const finishNode = grid[endRow][endCol];
    const visitedNodesInOrder = recursiveBackTrackerMaze(
      grid,
      startNode,
      finishNode
    );
    dispatch(setGrid(grid));
    animateAlgorithm(visitedNodesInOrder, null);
  }

  function sortAlgorithms() {
    if (key === "astar") {
      visualizeAStar();
    } else if (key === "dijkstra") {
      visualizeDjikstra();
    } else if (key === "breadthFirstSearch") {
      visualizeBreadthFirstSearch();
    } else {
      console.log(`no algorithm has been set!`);
    }
  }

  return {
    animateShortestPath,
    getNodesInShortestPathOrder,
    animateAlgorithm,
    visualizeDjikstra,
    visualizeAStar,
    visualizeBreadthFirstSearch,
    sortAlgorithms,
    visualizeRecursiveDFSMaze,
  };
}
